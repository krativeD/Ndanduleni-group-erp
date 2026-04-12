useEffect(() => {
  let mounted = true;

  // Get initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (mounted) {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    }
  });

  // Listen for auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
    subscription?.unsubscribe();
  };
}, []);
