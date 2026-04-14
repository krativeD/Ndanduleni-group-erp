import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './OrderForm.module.css';

const QuotationForm = ({ quotation, onSubmit, onCancel, onConvertToInvoice }) => {
  const [formData, setFormData] = useState({
    customer: quotation?.customer || '',
    customerAddress: quotation?.customerAddress || '',
    customerEmail: quotation?.customerEmail || '',
    items: quotation?.items || 1,
    total: quotation?.total || 0,
    validUntil: quotation?.validUntil || '',
    status: quotation?.status || 'draft'
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
      <h3>{quotation ? 'Edit Quotation' : 'Create New Quotation'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Customer" name="customer" value={formData.customer} onChange={handleChange} required />
        <Input label="Customer Address" name="customerAddress" value={formData.customerAddress} onChange={handleChange} />
        <Input label="Customer Email" name="customerEmail" type="email" value={formData.customerEmail} onChange={handleChange} />
        <Input label="Number of Items" name="items" type="number" value={formData.items} onChange={handleChange} required />
        <Input label="Total Amount (R)" name="total" type="number" step="0.01" value={formData.total} onChange={handleChange} required />
        <Input label="Valid Until" name="validUntil" type="date" value={formData.validUntil} onChange={handleChange} required />
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>Cancel</Button>
          {quotation && onConvertToInvoice && (
            <Button 
              type="button" 
              variant="success" 
              onClick={onConvertToInvoice}
              style={{ background: '#10b981', color: 'white' }}
            >
              📄 Convert to Invoice
            </Button>
          )}
          <Button type="submit" variant="primary" loading={loading}>
            {quotation ? 'Update' : 'Create'} Quotation
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default QuotationForm;
