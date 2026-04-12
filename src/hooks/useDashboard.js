import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useDashboard = (role) => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalRevenue: 0,
    activeProjects: 0,
    pendingOrders: 0,
    attendanceRate: 0,
    monthlyGrowth: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch stats based on role
        if (role === 'ceo') {
          // CEO sees all data
          const { data: employees } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });
          
          setStats(prev => ({
            ...prev,
            totalEmployees: employees?.count || 24,
            totalRevenue: 284500,
            activeProjects: 18,
            pendingOrders: 12,
            attendanceRate: 94,
            monthlyGrowth: 12.5
          }));
        } else if (role === 'admin') {
          // Admin sees departmental data
          setStats(prev => ({
            ...prev,
            totalEmployees: 18,
            totalRevenue: 156800,
            activeProjects: 12,
            pendingOrders: 8,
            attendanceRate: 91,
            monthlyGrowth: 8.3
          }));
        } else {
          // Staff sees personal data
          setStats(prev => ({
            ...prev,
            totalEmployees: 1,
            totalRevenue: 12400,
            activeProjects: 3,
            pendingOrders: 2,
            attendanceRate: 100,
            monthlyGrowth: 5.2
          }));
        }

        // Mock recent activity (in production, fetch from activities table)
        setRecentActivity([
          { id: 1, type: 'attendance', user: 'John Doe', action: 'Clocked in', time: '2 hours ago' },
          { id: 2, type: 'order', user: 'Sarah Smith', action: 'Completed order #1234', time: '4 hours ago' },
          { id: 3, type: 'project', user: 'Mike Johnson', action: 'Updated project status', time: '5 hours ago' },
          { id: 4, type: 'leave', user: 'Emily Brown', action: 'Submitted leave request', time: 'Yesterday' },
          { id: 5, type: 'payment', user: 'David Wilson', action: 'Processed payment', time: 'Yesterday' }
        ]);

      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [role]);

  return { stats, recentActivity, loading, error };
};
