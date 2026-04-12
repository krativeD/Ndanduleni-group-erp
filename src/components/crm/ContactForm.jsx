import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './ContactForm.module.css';

const ContactForm = ({ contact, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: contact?.name || '',
    type: contact?.type || 'lead',
    email: contact?.email || '',
    phone: contact?.phone || '',
    address: contact?.address || '',
    contact_person: contact?.contact_person || '',
    status: contact?.status || 'new'
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
      <h3>{contact ? 'Edit Contact' : 'Add New Contact'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.fullWidth}>
            <Input
              label="Company/Contact Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <Input
            label="Contact Person"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
            required
          />
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Type</label>
            <select 
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="client">Client</option>
              <option value="lead">Lead</option>
              <option value="partner">Partner</option>
            </select>
          </div>
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospect</option>
              <option value="new">New</option>
              <option value="negotiation">Negotiation</option>
            </select>
          </div>
          
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
            {contact ? 'Update' : 'Create'} Contact
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;
