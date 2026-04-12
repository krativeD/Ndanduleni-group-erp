import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import CEODashboard from '../components/dashboard/CEODashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import StaffDashboard from '../components/dashboard/StaffDashboard';

const Dashboard = () => {
  const { profile } = useAuth();
  const role = profile?.role || 'staff';

  const getDashboard = () => {
    switch (role) {
      case 'ceo':
        return <CEODashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <StaffDashboard />;
    }
  };

  return (
    <Layout>
      {getDashboard()}
    </Layout>
  );
};

export default Dashboard;
