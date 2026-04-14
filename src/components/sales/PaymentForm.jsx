import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './OrderForm.module.css';

const PaymentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    invoice: '',
    customer: '',
    amount: 0,
    method: 'EFT'
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
      <h3>Record Payment</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Invoice #" name="invoice" value={formData.invoice} onChange={handleChange} required />
        <Input label="Customer" name="customer" value={formData.customer} onChange={handleChange} required />
        <Input label="Amount (R)" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Payment Method</label>
          <select name="method" value={formData.method} onChange={handleChange} className={styles.select}>
            <option value="EFT">EFT</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="primary" loading={loading}>Record Payment</Button>
        </div>
      </form>
    </Card>
  );
};

export default PaymentForm;
