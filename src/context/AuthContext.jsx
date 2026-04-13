import React, { createContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import Loader from '../components/common/Loader';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use refs to avoid dependency issues
  const mountedRef = useRef(true);
  const loadingRef = useRef(loading);
  
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const fetchProfile = async (userId) => {
    try {
      console.log('=== FETCH PROFILE START ===');
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      console.log('Supabase response - data:', data);
      console.log('Supabase response - error:', error);
      
      if (error) {
        console.error('Profile fetch error:', error);
        console.log('Error code:', error.code);
        console.log('Error message:', error.message);
        console.log('Error details:', error.details);
        console.log('Error hint:', error.hint);
        
        // If profile doesn't exist, create one
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating...');
          // Get current user data
          const { data: userData, error: userError } = await supabase.auth.getUser();
          console.log('User data from auth:', userData);
          console.log('User error:', userError);
          
          const userEmail = userData?.user?.email;
          const userFullName = userData?.user?.user_metadata?.full_name;
          
          console.log('Creating profile with:', { id: userId, email: userEmail, full_name: userFullName });
          
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: userId, 
              email: userEmail,
              full_name: userFullName,
              role: 'ceo'  // Default to CEO for now
            }])
            .select()
            .single();
          
          console.log('Insert result - newProfile:', newProfile);
          console.log('Insert error:', insertError);
          
          if (insertError) {
            console.error('Insert error details:', insertError);
            throw insertError;
          }
          
          if (mountedRef.current) {
            console.log('Setting profile to newly created:', newProfile);
            setProfile(newProfile);
          }
          return;
        }
        throw error;
      }
      
      console.log('Profile loaded successfully:', data);
      console.log('=== DEBUG: Raw role from DB ===', data?.role);
      
      if (mountedRef.current) {
        setProfile(data);
      }
    } catch (error) {
      console.error('=== FETCH PROFILE CATCH ERROR ===');
      console.error('Error object:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      if (mountedRef.current) {
        setError(error.message);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
      console.log('=== FETCH PROFILE END ===');
    }
  };

  useEffect(() => {
    let timeoutId;

    // Set a timeout to prevent infinite loading (15 seconds max)
    timeoutId = setTimeout(() => {
      if (mountedRef.current && loadingRef.current) {
        console.warn('Auth loading timeout - forcing load complete');
        setLoading(false);
      }
    }, 15000);

    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        console.log('Initial session:', session ? 'exists' : 'none');
        if (mountedRef.current) {
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
        if (mountedRef.current) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      if (mountedRef.current) {
        setUser(session?.user ?? null);
        if (session?.user) {
          // Only fetch profile if we don't already have it for this user
          if (!profile || profile.id !== session.user.id) {
            await fetchProfile(session.user.id);
          } else {
            console.log('Profile already loaded for this user, skipping fetch');
            setLoading(false);
          }
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    });

    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId);
      subscription?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Convert role to lowercase for consistent comparison
  const normalizedRole = profile?.role?.toLowerCase();
  
  // DEBUG: Log the role detection
  console.log('=== AUTH CONTEXT ROLE DETECTION ===');
  console.log('Profile:', profile);
  console.log('Raw role from DB:', profile?.role);
  console.log('Normalized role:', normalizedRole);
  console.log('isCEO:', normalizedRole === 'ceo');
  console.log('isAdmin:', normalizedRole === 'admin' || normalizedRole === 'ceo');
  console.log('===================================');

  const value = {
    user,
    profile,
    signUp,
    signIn,
    signOut,
    isCEO: normalizedRole === 'ceo',
    isAdmin: normalizedRole === 'admin' || normalizedRole === 'ceo',
    isStaff: normalizedRole === 'staff' || !normalizedRole,
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
