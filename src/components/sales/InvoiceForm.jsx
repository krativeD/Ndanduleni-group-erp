import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './OrderForm.module.css';

const InvoiceForm = ({ invoice, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    order: invoice?.order || '',
    customer: invoice?.customer || '',
    date: invoice?.date || new Date().toISOString().split('T')[0],
    dueDate: invoice?.dueDate || '',
    total: invoice?.total || 0,
    paid: invoice?.paid || 0,
    status: invoice?.status || 'unpaid'
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
      <h3>{invoice ? 'Edit Invoice' : 'Create New Invoice'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Order #" name="order" value={formData.order} onChange={handleChange} required />
        <Input label="Customer" name="customer" value={formData.customer} onChange={handleChange} required />
        <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
        <Input label="Due Date" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
        <Input label="Total Amount (R)" name="total" type="number" step="0.01" value={formData.total} onChange={handleChange} required />
        <Input label="Amount Paid (R)" name="paid" type="number" step="0.01" value={formData.paid} onChange={handleChange} required />
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="primary" loading={loading}>{invoice ? 'Update' : 'Create'} Invoice</Button>
        </div>
      </form>
    </Card>
  );
};

export default InvoiceForm;
