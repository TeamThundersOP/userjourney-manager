import { AuthError, AuthApiError } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

export const getErrorMessage = (error: AuthError) => {
  if (error instanceof AuthApiError) {
    switch (error.status) {
      case 400:
        return 'Invalid email or password. Please check your credentials and try again.';
      case 422:
        return 'Invalid email format. Please enter a valid email address.';
      default:
        return error.message;
    }
  }
  return 'An unexpected error occurred. Please try again.';
};

export const signUpUser = async (email: string, password: string) => {
  const { data: existingUser, error: fetchError } = await supabase
    .from('candidates')
    .select('id')
    .eq('email', email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  }

  if (!existingUser) {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (authData.user) {
      const { error: insertError } = await supabase
        .from('candidates')
        .insert({
          id: authData.user.id,
          email: email,
          name: email.split('@')[0],
          username: email.split('@')[0],
        });

      if (insertError) throw insertError;
    }
  }
};

export const signInUser = async (email: string, password: string) => {
  const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) throw signInError;

  return authData;
};