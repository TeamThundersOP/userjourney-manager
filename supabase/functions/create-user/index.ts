import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    // Get the request body
    const { email, password } = await req.json()

    console.log('Checking if user exists:', email)

    // First check if user exists in auth.users
    const { data: existingAuthUser } = await supabaseClient.auth.admin.listUsers()
    const userExists = existingAuthUser.users.some(user => user.email === email)

    if (userExists) {
      console.log('User already exists in auth.users:', email)
      return new Response(
        JSON.stringify({ 
          error: 'A user with this email address has already been registered',
          code: 'user_exists'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    console.log('Creating new user:', email)

    // Create the user
    const { data: userData, error: createError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (createError) {
      console.error('Error creating user:', createError)
      return new Response(
        JSON.stringify({ error: createError.message }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Generate a unique username by adding a random suffix if needed
    const baseUsername = email.split('@')[0]
    let username = baseUsername
    let attempts = 0
    const maxAttempts = 5

    while (attempts < maxAttempts) {
      const { data: existingUser, error: checkError } = await supabaseClient
        .from('candidates')
        .select('username')
        .eq('username', username)
        .single()

      if (checkError && checkError.code === 'PGRST116') {
        // Username is available (no matching record found)
        break
      }

      // If username exists, append random string
      username = `${baseUsername}_${Math.random().toString(36).substring(2, 7)}`
      attempts++
    }

    if (attempts >= maxAttempts) {
      // If we couldn't generate a unique username after max attempts
      await supabaseClient.auth.admin.deleteUser(userData.user.id)
      return new Response(
        JSON.stringify({ error: 'Failed to generate unique username' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Insert the user into the candidates table with the unique username
    const { error: insertError } = await supabaseClient
      .from('candidates')
      .insert([
        {
          name: email,
          username: username,
          email: email,
        },
      ])

    if (insertError) {
      console.error('Error inserting into candidates:', insertError)
      // If insertion fails, delete the created auth user
      await supabaseClient.auth.admin.deleteUser(userData.user.id)
      return new Response(
        JSON.stringify({ error: 'Failed to create candidate record' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    return new Response(
      JSON.stringify({ message: 'User created successfully', user: userData.user }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})