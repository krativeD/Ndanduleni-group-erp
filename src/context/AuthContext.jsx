import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Loader from '../components/common/Loader';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async (userId) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Profile fetch error:', error);
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating...');
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: userId, 
              email: supabase.auth.user()?.email,
              full_name: supabase.auth.user()?.user_metadata?.full_name,
              role: 'staff'
            }])
            .select()
            .single();
          
          if (insertError) throw insertError;
          setProfile(newProfile);
          return;
        }
        throw error;
      }
      
      console.log('Profile loaded:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let timeoutId;

    // Set a timeout to prevent infinite loading (5 seconds max)
    timeoutId = setTimeout(() => {
      if (mounted && loading) {
        console.warn('Auth loading timeout - forcing load complete');
        setLoading(false);
      }
    }, 5000);

    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        console.log('Initial session:', session ? 'exists' : 'none');
        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            fetchProfile(session.user.id);
          } else {
            setLoading(false);
          }
        }
      })
      .catch((err) => {
        console.error('getSession error:', err);
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      if (mounted) {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async ({ email, password, fullName, role = 'staff' }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });
    return { data, error };
  };

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    user,
    profile,
    signUp,
    signIn,
    signOut,
    isCEO: profile?.role === 'ceo',
    isAdmin: profile?.role === 'admin' || profile?.role === 'ceo',
    isStaff: profile?.role === 'staff',
  };

  // Show loading spinner
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: '#f3f4f8'
      }}>
        <Loader />
      </div>
    );
  }

  // Show error if something went wrong
  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: '#f3f4f8',
        flexDirection: 'column',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2>Something went wrong</h2>
        <p style={{ color: '#ef4444', marginBottom: '20px' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            background: '#6366f1',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
