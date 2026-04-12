import React from 'react';
import { useAuth } from '../hooks/useAuth';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, profile } = useAuth();

  return (
    <Layout>
      <div className={styles.dashboard}>
        <h1>Dashboard</h1>
        <p className={styles.welcome}>Welcome back, {profile?.full_name || user?.email}!</p>
        
        <div className={styles.grid}>
          <Card>
            <h3>Role: {profile?.role?.toUpperCase()}</h3>
            <p>This is the Module 1 placeholder dashboard.</p>
            <p>Full dashboards will be built in Module 2.</p>
          </Card>
          
          {profile?.role === 'ceo' && (
            <Card>
              <h3>Global Admin Controls</h3>
              <p>You have full system access.</p>
              <a href="/users" className="btn btn-primary">Manage Users</a>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
