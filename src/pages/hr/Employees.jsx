import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import EmployeeTable from '../../components/hr/EmployeeTable';
import EmployeeForm from '../../components/hr/EmployeeForm';
import Button from '../../components/common/Button';
import { useEmployees } from '../../hooks/useHR';
import Loader from '../../components/common/Loader';
import styles from './HRStyles.module.css';

const Employees = () => {
  const { employees, loading, error, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
    }
  };

  const handleSubmit = async (data) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, data);
    } else {
      addEmployee(data);
    }
    setShowForm(false);
    setEditingEmployee(null);
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Employees</h1>
          {!showForm && (
            <Button variant="primary" onClick={handleAdd}>+ Add Employee</Button>
          )}
        </div>

        {showForm ? (
          <EmployeeForm 
            employee={editingEmployee}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingEmployee(null);
            }}
          />
        ) : (
          <EmployeeTable 
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </Layout>
  );
};

export default Employees;
