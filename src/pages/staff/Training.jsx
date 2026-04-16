import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useTraining, useJobAssignments } from '../../hooks/useStaff';
import Loader from '../../components/common/Loader';
import styles from './StaffStyles.module.css';

const Training = () => {
  const { training, loading, addTraining } = useTraining();
  const { jobs } = useJobAssignments();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ employee: '', course: '', provider: '', startDate: '', endDate: '', cost: '', status: 'planned' });

  const formatCurrency = (amount) => `R ${amount?.toLocaleString('en-ZA') || '0'}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    addTraining({ ...formData, cost: parseFloat(formData.cost) || 0 });
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    const badges = { 'planned': styles.statusPlanned, 'enrolled': styles.statusEnrolled, 'in-progress': styles.statusProgress, 'completed': styles.statusCompleted };
    return badges[status] || styles.statusPlanned;
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.trainingContainer}>
      <div className={styles.header}>
        <h3>Training Records</h3>
        <Button variant="primary" size="small" onClick={() => setShowForm(true)}>+ Add Training</Button>
      </div>

      {showForm && (
        <div className={styles.modalOverlay}>
          <Card className={styles.formCard}>
            <h4>Add Training Course</h4>
            <form onSubmit={handleSubmit}>
              <select value={formData.employee} onChange={(e) => setFormData({...formData, employee: e.target.value})} className={styles.select} required>
                <option value="">Select Employee</option>
                {jobs.map(j => <option key={j.id} value={j.employee}>{j.employee}</option>)}
              </select>
              <Input label="Course Name" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} required />
              <Input label="Provider" value={formData.provider} onChange={(e) => setFormData({...formData, provider: e.target.value})} required />
              <Input label="Start Date" type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
              <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
              <Input label="Cost (R)" type="number" value={formData.cost} onChange={(e) => setFormData({...formData, cost: e.target.value})} />
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className={styles.select}>
                <option value="planned">Planned</option><option value="enrolled">Enrolled</option><option value="in-progress">In Progress</option><option value="completed">Completed</option>
              </select>
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Add Training</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead><tr><th>Employee</th><th>Course</th><th>Provider</th><th>Start</th><th>End</th><th>Cost</th><th>Certificate</th><th>Status</th></tr></thead>
          <tbody>
            {training.map(t => (
              <tr key={t.id}>
                <td>{t.employee}</td><td>{t.course}</td><td>{t.provider}</td><td>{t.startDate}</td><td>{t.endDate}</td><td>{formatCurrency(t.cost)}</td><td>{t.certificate}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(t.status)}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Training;
