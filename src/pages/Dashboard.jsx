import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import CEODashboard from '../components/dashboard/CEODashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import StaffDashboard from '../components/dashboard/StaffDashboard';

const Dashboard = () => {
  const { profile } = useAuth();
  const role = profile?.role || 'staff';
  // Convert to lowercase for consistent comparison
  const normalizedRole = role.toLowerCase();

  const getDashboard = () => {
    switch (normalizedRole) {
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
      {/* Role indicator - helpful for debugging */}
      <div style={{
        marginBottom: '16px',
        padding: '8px 16px',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-inset)',
        display: 'inline-block',
        fontSize: '0.875rem'
      }}>
        Current Role: <strong style={{ color: 'var(--accent)' }}>{role.toUpperCase()}</strong>
        {normalizedRole === 'staff' && (
          <span style={{ marginLeft: '12px', color: 'var(--text-secondary)' }}>
            (Limited access. Contact admin to upgrade role.)
          </span>
        )}
      </div>
      {getDashboard()}
    </Layout>
  );
};

export default Dashboard;
