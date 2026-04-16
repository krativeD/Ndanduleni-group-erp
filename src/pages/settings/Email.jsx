import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useEmailSettings } from '../../hooks/useSettings';
import styles from './SettingsStyles.module.css';

const Email = () => {
  const { settings, loading, updateSettings, testEmail } = useEmailSettings();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings(formData);
    setSaving(false);
  };

  if (loading || !formData) return <Loader />;

  return (
    <Card className={styles.emailCard}>
      <h3>Email Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <Input label="SMTP Host" name="smtpHost" value={formData.smtpHost} onChange={handleChange} required />
          <Input label="SMTP Port" name="smtpPort" type="number" value={formData.smtpPort} onChange={handleChange} required />
          <Input label="SMTP Username" name="smtpUser" value={formData.smtpUser} onChange={handleChange} required />
          <Input label="SMTP Password" name="smtpPassword" type="password" value={formData.smtpPassword || ''} onChange={handleChange} placeholder="••••••••" />
          <Input label="From Email" name="fromEmail" type="email" value={formData.fromEmail} onChange={handleChange} required />
          <Input label="From Name" name="fromName" value={formData.fromName} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Email Signature</label>
          <textarea name="emailSignature" value={formData.emailSignature} onChange={handleChange} className={styles.textarea} rows="3" />
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox" name="enabled" checked={formData.enabled} onChange={handleChange} />
          <span>Enable Email Sending</span>
        </label>
        <div className={styles.testSection}>
          <Input label="Test Email Address" value={testEmailAddress} onChange={(e) => setTestEmailAddress(e.target.value)} placeholder="test@example.com" />
          <Button type="button" variant="default" onClick={() => testEmail(testEmailAddress)} disabled={!testEmailAddress}>Send Test Email</Button>
        </div>
        <div className={styles.formActions}>
          <Button type="submit" variant="primary" loading={saving}>Save Email Settings</Button>
        </div>
      </form>
    </Card>
  );
};

export default Email;
