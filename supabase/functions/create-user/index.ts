import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
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

    const { email, password } = await req.json()
    console.log('Creating new user:', email)

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

    // Create the auth user first
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

    // Generate a unique username
    const generateUniqueUsername = async () => {
      const baseUsername = email.split('@')[0].toLowerCase()
      let counter = 0
      const maxAttempts = 10 // Prevent infinite loops
      
      while (counter < maxAttempts) {
        const timestamp = Date.now().toString().slice(-6)
        const username = counter === 0 ? baseUsername : `${baseUsername}${timestamp}`
        
        // Check if username exists
        const { data: existingUser, error: checkError } = await supabaseClient
          .from('candidates')
          .select('username')
          .eq('username', username)
          .maybeSingle()

        if (checkError) {
          console.error('Error checking username:', checkError)
          throw checkError
        }

        if (!existingUser) {
          return username
        }

        counter++
      }

      throw new Error('Could not generate unique username after multiple attempts')
    }

    try {
      const username = await generateUniqueUsername()
      console.log('Generated unique username:', username)

      const { error: insertError } = await supabaseClient
        .from('candidates')
        .insert([
          {
            id: userData.user.id,
            name: email.split('@')[0], // Use part before @ as name
            username: username,
            email: email,
          }
        ])

      if (insertError) {
        console.error('Error inserting into candidates:', insertError)
        // Clean up: delete the auth user if candidate creation fails
        await supabaseClient.auth.admin.deleteUser(userData.user.id)
        throw insertError
      }

      return new Response(
        JSON.stringify({ 
          message: 'User created successfully', 
          user: userData.user,
          username: username 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    } catch (error) {
      console.error('Error in user creation process:', error)
      // Clean up: delete the auth user if anything fails
      if (userData?.user?.id) {
        await supabaseClient.auth.admin.deleteUser(userData.user.id)
      }
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create user record',
          details: error.message 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }
  } catch (error) {
    console.error('Server error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})