import { useState, useEffect } from 'react';
import { supabase } from '../db/supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  is_admin?: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        setUser({
          ...session.user,
          is_admin: profile?.is_admin || false,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('users')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();

        setUser({
          ...session.user,
          is_admin: profile?.is_admin || false,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  return { user, loading, login, logout };
}