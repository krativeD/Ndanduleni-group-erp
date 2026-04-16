import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useJobAssignments } from '../../hooks/useStaff';
import Loader from '../../components/common/Loader';
import styles from './StaffStyles.module.css';

const Directory = () => {
  const { jobs, loading } = useJobAssignments();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const departments = [...new Set(jobs.map(j => j.department))];

  const filteredStaff = jobs.filter(j => {
    const matchesSearch = j.employee.toLowerCase().includes(searchTerm.toLowerCase()) || j.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDepartment === 'all' || j.department === filterDepartment;
    return matchesSearch && matchesDept;
  });

  if (loading) return <Loader />;

  return (
    <div className={styles.directoryContainer}>
      <div className={styles.header}>
        <h3>Staff Directory</h3>
      </div>

      <div className={styles.filters}>
        <Input type="search" placeholder="Search by name or title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select className={styles.filterSelect} value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
          <option value="all">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className={styles.staffGrid}>
        {filteredStaff.map(s => (
          <Card key={s.id} className={styles.staffCard}>
            <div className={styles.avatar}>{s.employee.charAt(0)}</div>
            <h4>{s.employee}</h4>
            <p className={styles.jobTitle}>{s.jobTitle}</p>
            <p className={styles.department}>{s.department}</p>
            <p className={styles.supervisor}>Supervisor: {s.supervisor}</p>
            <p className={styles.project}>Project: {s.currentProject || 'Unassigned'}</p>
            <div className={styles.workloadBar}><div style={{ width: `${s.workload}%` }} /></div>
            <span className={`${styles.statusBadge} ${s.status === 'active' ? styles.statusActive : styles.statusLeave}`}>{s.status}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Directory;
