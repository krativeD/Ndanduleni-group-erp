import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './OrderForm.module.css';

const OrderForm = ({ order, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: order?.customer || '',
    items: order?.items || 1,
    total: order?.total || 0,
    status: order?.status || 'pending',
    paymentStatus: order?.paymentStatus || 'unpaid'
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
      <h3>{order ? 'Edit Order' : 'Create New Order'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Customer"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Number of Items"
          name="items"
          type="number"
          value={formData.items}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Total Amount (R)"
          name="total"
          type="number"
          step="0.01"
          value={formData.total}
          onChange={handleChange}
          required
        />
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Payment Status</label>
          <select 
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {order ? 'Update' : 'Create'} Order
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default OrderForm;
