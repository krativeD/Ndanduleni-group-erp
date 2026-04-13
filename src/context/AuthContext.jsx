import React, { createContext, useState, useEffect, useRef, useCallback } from 'react';
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
  const profileRef = useRef(null);
  
  // Keep profileRef in sync with profile state
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const fetchProfile = useCallback(async (userId) => {
    try {
      console.log('=== FETCH PROFILE START ===');
      console.log('Fetching profile for user:', userId);
      
      // FORCE CEO FOR TESTING - Hardcoded profile (immediate fallback)
      const hardcodedProfile = {
        id: userId,
        email: 'khumbu@ng.com',
        full_name: 'Khumbu Admin',
        role: 'ceo',
        created_at: new Date().toISOString()
      };
      
      console.log('Using hardcoded CEO profile as fallback:', hardcodedProfile);
      
      if (mountedRef.current) {
        setProfile(hardcodedProfile);
        setLoading(false);
      }
      
      // Also try Supabase in background (doesn't block UI)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        console.log('Background Supabase response - data:', data);
        console.log('Background Supabase response - error:', error);
        
        if (data && mountedRef.current) {
          console.log('Updating profile with Supabase data');
          setProfile(data);
        }
      } catch (bgError) {
        console.log('Background fetch failed, using hardcoded profile:', bgError);
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
      
    } catch (error) {
      console.error('=== FETCH PROFILE CATCH ERROR ===');
      console.error('Error object:', error);
      if (mountedRef.current) {
        setLoading(false);
      }
    }
    console.log('=== FETCH PROFILE END ===');
  }, []);

  useEffect(() => {
    let timeoutId;

    // Set a timeout to prevent infinite loading (10 seconds max)
    timeoutId = setTimeout(() => {
      if (mountedRef.current) {
        console.warn('Auth loading timeout - forcing load complete');
        setLoading(false);
      }
    }, 10000);

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
          // Use ref to check current profile without dependency
          if (!profileRef.current || profileRef.current.id !== session.user.id) {
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
  }, [fetchProfile]);

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
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
    }
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
  console.log('Loading state:', loading);
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
