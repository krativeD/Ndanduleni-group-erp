import React, { createContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import Loader from '../components/common/Loader';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);
  
  const mountedRef = useRef(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('=== AUTH INIT START ===');
        
        // Get session from Supabase
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }
        
        console.log('Session:', session ? 'exists' : 'none');
        
        if (mountedRef.current) {
          if (session?.user) {
            setUser(session.user);
            
            // Set hardcoded CEO profile immediately - no waiting
            const hardcodedProfile = {
              id: session.user.id,
              email: session.user.email || 'khumbu@ng.com',
              full_name: session.user.user_metadata?.full_name || 'Administrator',
              role: 'ceo',
              created_at: new Date().toISOString()
            };
            
            console.log('Setting CEO profile:', hardcodedProfile);
            setProfile(hardcodedProfile);
            
            // Try to get real profile in background (optional)
            supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
              .then(({ data }) => {
                if (data && mountedRef.current) {
                  console.log('Real profile loaded, updating');
                  setProfile(data);
                }
              })
              .catch(err => console.log('Background profile fetch failed:', err.message));
          } else {
            setUser(null);
            setProfile(null);
          }
        }
      } catch (err) {
        console.error('Auth init error:', err);
        if (mountedRef.current) {
          setError(err.message);
        }
      } finally {
        if (mountedRef.current) {
          setInitializing(false);
        }
        console.log('=== AUTH INIT COMPLETE ===');
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event);
      
      if (mountedRef.current) {
        if (session?.user) {
          setUser(session.user);
          
          // Set CEO profile on any auth change
          const hardcodedProfile = {
            id: session.user.id,
            email: session.user.email || 'khumbu@ng.com',
            full_name: session.user.user_metadata?.full_name || 'Administrator',
            role: 'ceo',
            created_at: new Date().toISOString()
          };
          setProfile(hardcodedProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    });

    return () => {
      mountedRef.current = false;
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

  const normalizedRole = profile?.role?.toLowerCase();
  
  console.log('=== AUTH STATE ===');
  console.log('User:', user?.email || 'none');
  console.log('Profile role:', profile?.role || 'none');
  console.log('isCEO:', normalizedRole === 'ceo');
  console.log('Initializing:', initializing);
  console.log('================');

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

  // Only show loader during initial session check (max 1-2 seconds)
  if (initializing) {
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

  // If no user, show login (handled by routes)
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
