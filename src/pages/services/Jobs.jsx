import React from 'react';
import Layout from '../../components/common/Layout';
import ServiceSchedule from '../../components/services/ServiceSchedule';
import { useScheduledJobs } from '../../hooks/useServices';
import Loader from '../../components/common/Loader';
import styles from './ServicesStyles.module.css';

const Jobs = () => {
  const { jobs, loading, error } = useScheduledJobs();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>All Jobs</h1>
        </div>
        <ServiceSchedule jobs={jobs} onJobClick={(job) => console.log('Job:', job)} />
      </div>
    </Layout>
  );
};

export default Jobs;
