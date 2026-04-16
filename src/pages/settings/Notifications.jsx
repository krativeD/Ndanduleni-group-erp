import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useNotificationSettings } from '../../hooks/useSettings';
import styles from './SettingsStyles.module.css';

const Notifications = () => {
  const { settings, loading, updateSettings } = useNotificationSettings();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateSettings(formData);
    setSaving(false);
  };

  if (loading || !formData) return <Loader />;

  return (
    <Card className={styles.notifyCard}>
      <h3>Notification Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkbox}><input type="checkbox" name="emailNotifications" checked={formData.emailNotifications} onChange={handleChange} /><span>Enable Email Notifications</span></label>
          <label className={styles.checkbox}><input type="checkbox" name="inAppNotifications" checked={formData.inAppNotifications} onChange={handleChange} /><span>Enable In-App Notifications</span></label>
        </div>
        <h4>Notify me when:</h4>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkbox}><input type="checkbox" name="notifyOnNewUser" checked={formData.notifyOnNewUser} onChange={handleChange} /><span>New user registers</span></label>
          <label className={styles.checkbox}><input type="checkbox" name="notifyOnOrder" checked={formData.notifyOnOrder} onChange={handleChange} /><span>New order is placed</span></label>
          <label className={styles.checkbox}><input type="checkbox" name="notifyOnInvoice" checked={formData.notifyOnInvoice} onChange={handleChange} /><span>Invoice is generated</span></label>
          <label className={styles.checkbox}><input type="checkbox" name="notifyOnPayment" checked={formData.notifyOnPayment} onChange={handleChange} /><span>Payment is received</span></label>
          <label className={styles.checkbox}><input type="checkbox" name="notifyOnLowStock" checked={formData.notifyOnLowStock} onChange={handleChange} /><span>Stock is low</span></label>
          <label className={styles.checkbox}><input type="checkbox" name="notifyOnLeaveRequest" checked={formData.notifyOnLeaveRequest} onChange={handleChange} /><span>Leave request submitted</span></label>
        </div>
        <h4>Digest Settings:</h4>
        <div className={styles.checkboxGroup}>
          <label className={styles.checkbox}><input type="checkbox" name="dailyDigest" checked={formData.dailyDigest} onChange={handleChange} /><span>Send daily digest</span></label>
          <label className={styles.checkbox}><input type="checkbox" name="weeklyReport" checked={formData.weeklyReport} onChange={handleChange} /><span>Send weekly report</span></label>
        </div>
        <div className={styles.formActions}>
          <Button type="submit" variant="primary" loading={saving}>Save Notification Settings</Button>
        </div>
      </form>
    </Card>
  );
};

export default Notifications;
