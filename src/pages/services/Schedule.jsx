import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import ServiceSchedule from '../../components/services/ServiceSchedule';
import JobCard from '../../components/services/JobCard';
import { useScheduledJobs } from '../../hooks/useServices';
import Loader from '../../components/common/Loader';
import styles from './ServicesStyles.module.css';

const Schedule = () => {
  const { jobs, loading, error, updateJobStatus } = useScheduledJobs();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleStatusChange = (jobId, newStatus) => {
    updateJobStatus(jobId, newStatus);
    setSelectedJob(null);
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Service Schedule</h1>
        </div>

        {selectedJob ? (
          <JobCard 
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <ServiceSchedule jobs={jobs} onJobClick={handleJobClick} />
        )}
      </div>
    </Layout>
  );
};

export default Schedule;
