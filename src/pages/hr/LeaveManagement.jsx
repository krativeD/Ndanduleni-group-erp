import React from 'react';
import Layout from '../../components/common/Layout';
import LeaveRequestCard from '../../components/hr/LeaveRequestCard';
import { useLeaveRequests } from '../../hooks/useHR';
import Loader from '../../components/common/Loader';
import styles from './HRStyles.module.css';

const LeaveManagement = () => {
  const { requests, loading, error } = useLeaveRequests();

  const handleApprove = (id) => {
    console.log('Approve leave:', id);
  };

  const handleReject = (id) => {
    console.log('Reject leave:', id);
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Leave Management</h1>
        </div>

        <LeaveRequestCard 
          requests={requests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </Layout>
  );
};

export default LeaveManagement;
