import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAttendance, useJobAssignments } from '../../hooks/useStaff';
import Loader from '../../components/common/Loader';
import styles from './StaffStyles.module.css';

const Attendance = () => {
  const { attendance, loading, recordAttendance } = useAttendance();
  const { jobs } = useJobAssignments();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ employee: '', date: new Date().toISOString().split('T')[0], clockIn: '', clockOut: '', status: 'present' });
  const [filterEmployee, setFilterEmployee] = useState('all');

  const filteredAttendance = attendance.filter(a => filterEmployee === 'all' || a.employee === filterEmployee);

  const getStatusBadge = (status) => {
    const badges = { 'present': styles.statusPresent, 'absent': styles.statusAbsent, 'late': styles.statusLate };
    return badges[status] || styles.statusPresent;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    recordAttendance(formData);
    setShowForm(false);
    setFormData({ employee: '', date: new Date().toISOString().split('T')[0], clockIn: '', clockOut: '', status: 'present' });
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.attendanceContainer}>
      <div className={styles.header}>
        <h3>Attendance Records</h3>
        <Button variant="primary" size="small" onClick={() => setShowForm(true)}>+ Record Attendance</Button>
      </div>

      {showForm && (
        <div className={styles.modalOverlay}>
          <Card className={styles.formCard}>
            <h4>Record Attendance</h4>
            <form onSubmit={handleSubmit}>
              <select value={formData.employee} onChange={(e) => setFormData({...formData, employee: e.target.value})} className={styles.select} required>
                <option value="">Select Employee</option>
                {jobs.map(j => <option key={j.id} value={j.employee}>{j.employee}</option>)}
              </select>
              <Input label="Date" type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
              <Input label="Clock In" type="time" value={formData.clockIn} onChange={(e) => setFormData({...formData, clockIn: e.target.value})} />
              <Input label="Clock Out" type="time" value={formData.clockOut} onChange={(e) => setFormData({...formData, clockOut: e.target.value})} />
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className={styles.select}>
                <option value="present">Present</option><option value="absent">Absent</option><option value="late">Late</option>
              </select>
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Record</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <select className={styles.filterSelect} value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)}>
          <option value="all">All Employees</option>
          {jobs.map(j => <option key={j.id} value={j.employee}>{j.employee}</option>)}
        </select>
      </div>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead><tr><th>Employee</th><th>Date</th><th>Clock In</th><th>Clock Out</th><th>Hours</th><th>Overtime</th><th>Status</th></tr></thead>
          <tbody>
            {filteredAttendance.map(a => (
              <tr key={a.id}>
                <td>{a.employee}</td><td>{a.date}</td><td>{a.clockIn || '—'}</td><td>{a.clockOut || '—'}</td><td>{a.hours}</td><td>{a.overtime}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(a.status)}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Attendance;
