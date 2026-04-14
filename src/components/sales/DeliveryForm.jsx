import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './OrderForm.module.css';

const DeliveryForm = ({ delivery, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    order: delivery?.order || '',
    customer: delivery?.customer || '',
    address: delivery?.address || '',
    scheduled: delivery?.scheduled || '',
    driver: delivery?.driver || ''
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
      <h3>{delivery ? 'Edit Delivery' : 'Schedule Delivery'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Order #" name="order" value={formData.order} onChange={handleChange} required />
        <Input label="Customer" name="customer" value={formData.customer} onChange={handleChange} required />
        <Input label="Address" name="address" value={formData.address} onChange={handleChange} required />
        <Input label="Scheduled Date" name="scheduled" type="date" value={formData.scheduled} onChange={handleChange} required />
        <Input label="Driver" name="driver" value={formData.driver} onChange={handleChange} required />

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="primary" loading={loading}>{delivery ? 'Update' : 'Schedule'} Delivery</Button>
        </div>
      </form>
    </Card>
  );
};

export default DeliveryForm;
