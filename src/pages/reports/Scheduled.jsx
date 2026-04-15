import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useScheduledReports } from '../../hooks/useReports';
import Loader from '../../components/common/Loader';
import styles from './ReportsStyles.module.css';

const Scheduled = () => {
  const { reports, loading, addScheduledReport, deleteScheduledReport } = useScheduledReports();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'Sales', frequency: 'Weekly', recipients: '' });

  const handleAdd = () => setShowForm(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    addScheduledReport(formData);
    setFormData({ name: '', type: 'Sales', frequency: 'Weekly', recipients: '' });
    setShowForm(false);
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.scheduledPage}>
      <div className={styles.header}>
        <h2>Scheduled Reports</h2>
        <Button variant="primary" onClick={handleAdd}>+ Schedule Report</Button>
      </div>

      {showForm && (
        <Card className={styles.formCard}>
          <h3>New Scheduled Report</h3>
          <form onSubmit={handleSubmit}>
            <Input label="Report Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <select className={styles.select} value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
              <option>Sales</option><option>Financial</option><option>Inventory</option><option>HR</option><option>Services</option>
            </select>
            <select className={styles.select} value={formData.frequency} onChange={(e) => setFormData({...formData, frequency: e.target.value})}>
              <option>Daily</option><option>Weekly</option><option>Monthly</option><option>Quarterly</option>
            </select>
            <Input label="Recipients (email)" type="email" value={formData.recipients} onChange={(e) => setFormData({...formData, recipients: e.target.value})} required />
            <div className={styles.formActions}>
              <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" variant="primary">Schedule</Button>
            </div>
          </form>
        </Card>
      )}

      <Card className={styles.listCard}>
        <table className={styles.table}>
          <thead><tr><th>Name</th><th>Type</th><th>Frequency</th><th>Recipients</th><th>Last Sent</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td><td>{r.type}</td><td>{r.frequency}</td><td>{r.recipients}</td><td>{r.lastSent}</td>
                <td><span className={styles.statusActive}>{r.status}</span></td>
                <td><button className={styles.deleteBtn} onClick={() => deleteScheduledReport(r.id)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Scheduled;
