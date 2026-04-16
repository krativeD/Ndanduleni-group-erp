import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useJobAssignments } from '../../hooks/useStaff';
import Loader from '../../components/common/Loader';
import styles from './StaffStyles.module.css';

const Jobs = () => {
  const { jobs, loading, updateJob, assignJob } = useJobAssignments();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ employee: '', jobTitle: '', department: '', supervisor: '', currentProject: '', workload: 50 });
  const [editingJob, setEditingJob] = useState(null);

  const getStatusBadge = (status) => {
    return status === 'active' ? styles.statusActive : styles.statusLeave;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingJob) {
      updateJob(editingJob.id, { ...formData, workload: parseInt(formData.workload) });
    } else {
      assignJob({ ...formData, startDate: new Date().toISOString().split('T')[0], status: 'active', workload: parseInt(formData.workload) });
    }
    setShowForm(false);
    setEditingJob(null);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData(job);
    setShowForm(true);
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.jobsContainer}>
      <div className={styles.header}>
        <h3>Job Assignments</h3>
        <Button variant="primary" size="small" onClick={() => { setEditingJob(null); setFormData({ employee: '', jobTitle: '', department: '', supervisor: '', currentProject: '', workload: 50 }); setShowForm(true); }}>+ Assign Job</Button>
      </div>

      {showForm && (
        <div className={styles.modalOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingJob ? 'Edit Assignment' : 'New Job Assignment'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Employee" value={formData.employee} onChange={(e) => setFormData({...formData, employee: e.target.value})} required />
              <Input label="Job Title" value={formData.jobTitle} onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} required />
              <Input label="Department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required />
              <Input label="Supervisor" value={formData.supervisor} onChange={(e) => setFormData({...formData, supervisor: e.target.value})} required />
              <Input label="Current Project" value={formData.currentProject} onChange={(e) => setFormData({...formData, currentProject: e.target.value})} />
              <Input label="Workload (%)" type="number" min="0" max="100" value={formData.workload} onChange={(e) => setFormData({...formData, workload: e.target.value})} />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingJob ? 'Update' : 'Assign'}</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead><tr><th>Employee</th><th>Job Title</th><th>Department</th><th>Supervisor</th><th>Current Project</th><th>Workload</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.id}>
                <td>{j.employee}</td><td>{j.jobTitle}</td><td>{j.department}</td><td>{j.supervisor}</td><td>{j.currentProject || '—'}</td>
                <td><div className={styles.progressBar}><div style={{ width: `${j.workload}%` }} /></div>{j.workload}%</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(j.status)}`}>{j.status}</span></td>
                <td><button className={styles.actionBtn} onClick={() => handleEdit(j)}>✏️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Jobs;
