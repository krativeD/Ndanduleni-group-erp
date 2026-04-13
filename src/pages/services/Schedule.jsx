import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import ServiceSchedule from '../../components/services/ServiceSchedule';
import JobCard from '../../components/services/JobCard';
import JobForm from '../../components/services/JobForm';
import Button from '../../components/common/Button';
import { useScheduledJobs } from '../../hooks/useServices';
import Loader from '../../components/common/Loader';
import styles from './ServicesStyles.module.css';

const Schedule = () => {
  const { jobs, loading, error, updateJobStatus, addJob, deleteJob } = useScheduledJobs();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleStatusChange = (jobId, newStatus) => {
    updateJobStatus(jobId, newStatus);
    setSelectedJob(null);
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setShowForm(true);
    setSelectedJob(null);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      deleteJob(jobId);
      setSelectedJob(null);
    }
  };

  const handleSubmitJob = (data) => {
    if (editingJob) {
      updateJobStatus(editingJob.id, data.status || editingJob.status);
    } else {
      addJob({
        ...data,
        date: data.date || new Date().toISOString().split('T')[0],
        time: data.time || '09:00',
        duration: data.duration || '2 hours',
        status: 'scheduled',
        priority: data.priority || 'medium'
      });
    }
    setShowForm(false);
    setEditingJob(null);
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Service Schedule</h1>
          {!showForm && !selectedJob && (
            <Button variant="primary" onClick={handleAddJob}>+ New Job</Button>
          )}
        </div>

        {showForm ? (
          <JobForm 
            job={editingJob}
            onSubmit={handleSubmitJob}
            onCancel={() => {
              setShowForm(false);
              setEditingJob(null);
            }}
          />
        ) : selectedJob ? (
          <JobCard 
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onStatusChange={handleStatusChange}
            onEdit={() => handleEditJob(selectedJob)}
            onDelete={() => handleDeleteJob(selectedJob.id)}
          />
        ) : (
          <ServiceSchedule 
            jobs={jobs} 
            onJobClick={handleJobClick}
            onAddJob={handleAddJob}
          />
        )}
      </div>
    </Layout>
  );
};

export default Schedule;
