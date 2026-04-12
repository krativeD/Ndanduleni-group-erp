import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './EmployeeTable.module.css';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const departments = [...new Set(employees.map(e => e.department))];
  
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      active: styles.statusActive,
      on_leave: styles.statusLeave,
      terminated: styles.statusTerminated
    };
    return badges[status] || styles.statusActive;
  };

  return (
    <Card className={styles.employeeCard}>
      <div className={styles.filters}>
        <Input
          type="search"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select 
          className={styles.filterSelect}
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select 
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="on_leave">On Leave</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>
                  <div className={styles.employeeCell}>
                    <div className={styles.avatar}>
                      {emp.full_name.charAt(0)}
                    </div>
                    <div className={styles.employeeInfo}>
                      <span className={styles.employeeName}>{emp.full_name}</span>
                      <span className={styles.employeeEmail}>{emp.email}</span>
                    </div>
                  </div>
                </td>
                <td>{emp.department}</td>
                <td>
                  <span className={styles.roleBadge}>{emp.role}</span>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusBadge(emp.status)}`}>
                    {emp.status.replace('_', ' ')}
                  </span>
                </td>
                <td>{emp.join_date}</td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={styles.actionBtn}
                      onClick={() => onEdit(emp)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button 
                      className={styles.actionBtn}
                      onClick={() => onDelete(emp.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <span>Showing {filteredEmployees.length} of {employees.length} employees</span>
      </div>
    </Card>
  );
};

export default EmployeeTable;
