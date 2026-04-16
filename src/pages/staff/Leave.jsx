import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useLeaveRequests, useJobAssignments } from '../../hooks/useStaff';
import Loader from '../../components/common/Loader';
import styles from './StaffStyles.module.css';

const Leave = () => {
  const { requests, loading, updateStatus, addRequest } = useLeaveRequests();
  const { jobs } = useJobAssignments();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ employee: '', type: 'Annual', startDate: '', endDate: '', reason: '' });
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredRequests = requests.filter(r => filterStatus === 'all' || r.status === filterStatus);

  const getStatusBadge = (status) => {
    const badges = { 'pending': styles.statusPending, 'approved': styles.statusApproved, 'rejected': styles.statusRejected };
    return badges[status] || styles.statusPending;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const days = Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    addRequest({ ...formData, days });
    setShowForm(false);
    setFormData({ employee: '', type: 'Annual', startDate: '', endDate: '', reason: '' });
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.leaveContainer}>
      <div className={styles.header}>
        <h3>Leave Requests</h3>
        <Button variant="primary" size="small" onClick={() => setShowForm(true)}>+ New Request</Button>
      </div>

      {showForm && (
        <div className={styles.modalOverlay}>
          <Card className={styles.formCard}>
            <h4>New Leave Request</h4>
            <form onSubmit={handleSubmit}>
              <select value={formData.employee} onChange={(e) => setFormData({...formData, employee: e.target.value})} className={styles.select} required>
                <option value="">Select Employee</option>
                {jobs.map(j => <option key={j.id} value={j.employee}>{j.employee}</option>)}
              </select>
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className={styles.select}>
                <option>Annual</option><option>Sick</option><option>Unpaid</option><option>Family</option>
              </select>
              <Input label="Start Date" type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
              <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} required />
              <Input label="Reason" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Submit Request</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option>
        </select>
      </div>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead><tr><th>Employee</th><th>Type</th><th>Start</th><th>End</th><th>Days</th><th>Reason</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filteredRequests.map(r => (
              <tr key={r.id}>
                <td>{r.employee}</td><td>{r.type}</td><td>{r.startDate}</td><td>{r.endDate}</td><td>{r.days}</td><td>{r.reason}</td><td>{r.appliedOn}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(r.status)}`}>{r.status}</span></td>
                <td>
                  {r.status === 'pending' && (
                    <div className={styles.actions}>
                      <Button size="small" variant="success" onClick={() => updateStatus(r.id, 'approved')}>Approve</Button>
                      <Button size="small" variant="danger" onClick={() => updateStatus(r.id, 'rejected')}>Reject</Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Leave;
