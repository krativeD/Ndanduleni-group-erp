import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { usePerformance, useJobAssignments } from '../../hooks/useStaff';
import Loader from '../../components/common/Loader';
import styles from './StaffStyles.module.css';

const Performance = () => {
  const { reviews, loading, addReview, updateReview } = usePerformance();
  const { jobs } = useJobAssignments();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ employee: '', reviewPeriod: '', reviewDate: '', reviewer: '', rating: '', strengths: '', improvements: '', goals: '', status: 'scheduled' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({ ...formData, rating: parseFloat(formData.rating) || null });
    setShowForm(false);
  };

  const renderStars = (rating) => {
    if (!rating) return 'Not rated';
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.performanceContainer}>
      <div className={styles.header}>
        <h3>Performance Reviews</h3>
        <Button variant="primary" size="small" onClick={() => setShowForm(true)}>+ Schedule Review</Button>
      </div>

      {showForm && (
        <div className={styles.modalOverlay}>
          <Card className={styles.formCard}>
            <h4>Schedule Performance Review</h4>
            <form onSubmit={handleSubmit}>
              <select value={formData.employee} onChange={(e) => setFormData({...formData, employee: e.target.value})} className={styles.select} required>
                <option value="">Select Employee</option>
                {jobs.map(j => <option key={j.id} value={j.employee}>{j.employee}</option>)}
              </select>
              <Input label="Review Period" value={formData.reviewPeriod} onChange={(e) => setFormData({...formData, reviewPeriod: e.target.value})} placeholder="Q1 2026" required />
              <Input label="Review Date" type="date" value={formData.reviewDate} onChange={(e) => setFormData({...formData, reviewDate: e.target.value})} required />
              <Input label="Reviewer" value={formData.reviewer} onChange={(e) => setFormData({...formData, reviewer: e.target.value})} required />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Schedule</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead><tr><th>Employee</th><th>Period</th><th>Review Date</th><th>Reviewer</th><th>Rating</th><th>Status</th></tr></thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id}>
                <td>{r.employee}</td><td>{r.reviewPeriod}</td><td>{r.reviewDate}</td><td>{r.reviewer}</td><td>{renderStars(r.rating)}</td>
                <td><span className={styles.statusBadge}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Performance;
