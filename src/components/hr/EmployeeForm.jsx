import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './EmployeeForm.module.css';

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: employee?.full_name || '',
    email: employee?.email || '',
    department: employee?.department || '',
    role: employee?.role || 'staff',
    phone: employee?.phone || '',
    address: employee?.address || '',
    join_date: employee?.join_date || new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <Card className={styles.formCard}>
      <h3>{employee ? 'Edit Employee' : 'Add New Employee'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <Input
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={!!employee}
          />
          
          <Input
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Role</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
              <option value="ceo">CEO</option>
            </select>
          </div>
          
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          
          <Input
            label="Join Date"
            name="join_date"
            type="date"
            value={formData.join_date}
            onChange={handleChange}
            required
          />
          
          <div className={styles.fullWidth}>
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {employee ? 'Update' : 'Create'} Employee
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EmployeeForm;
