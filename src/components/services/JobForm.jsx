import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './JobForm.module.css';

const JobForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    client: job?.client || '',
    service: job?.service || '',
    area: job?.area || '',
    date: job?.date || new Date().toISOString().split('T')[0],
    time: job?.time || '09:00',
    duration: job?.duration || '2 hours',
    team: job?.team || 'Team Alpha',
    priority: job?.priority || 'medium',
    status: job?.status || 'scheduled'
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
      <h3>{job ? 'Edit Job' : 'Create New Job'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <Input
            label="Client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Service Type"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Area/Location"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Duration"
            name="duration"
            placeholder="e.g., 2 hours"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Team</label>
            <select 
              name="team"
              value={formData.team}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="Team Alpha">Team Alpha</option>
              <option value="Team Beta">Team Beta</option>
              <option value="Team Gamma">Team Gamma</option>
              <option value="Team Delta">Team Delta</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Priority</label>
            <select 
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            {job ? 'Update' : 'Create'} Job
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default JobForm;
