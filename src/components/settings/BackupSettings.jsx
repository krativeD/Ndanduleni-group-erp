import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { useBackupSettings } from '../../hooks/useSettings';
import styles from './BackupSettings.module.css';

const BackupSettings = () => {
  const { settings, loading, updateSettings, runBackup } = useBackupSettings();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [backupRunning, setBackupRunning] = useState(false);

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

  const handleRunBackup = async () => {
    setBackupRunning(true);
    await runBackup();
    setBackupRunning(false);
  };

  if (loading || !formData) return <Loader />;

  return (
    <Card className={styles.backupCard}>
      <h3>Backup Settings</h3>

      <div className={styles.backupStatus}>
        <div className={styles.statusItem}>
          <span>Last Backup</span>
          <strong>{formData.lastBackup || 'Never'}</strong>
        </div>
        <div className={styles.statusItem}>
          <span>Next Scheduled Backup</span>
          <strong>{formData.nextBackup || 'Not scheduled'}</strong>
        </div>
        <Button variant="primary" onClick={handleRunBackup} loading={backupRunning}>🔄 Run Backup Now</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Auto Backup</label>
            <select name="autoBackup" value={formData.autoBackup} onChange={handleChange} className={styles.select}>
              <option value={true}>Enabled</option><option value={false}>Disabled</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Backup Frequency</label>
            <select name="backupFrequency" value={formData.backupFrequency} onChange={handleChange} className={styles.select}>
              <option value="hourly">Hourly</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Backup Time</label>
            <input type="time" name="backupTime" value={formData.backupTime} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Retention Period (days)</label>
            <input type="number" name="backupRetention" value={formData.backupRetention} onChange={handleChange} className={styles.input} min="7" max="365" />
          </div>
          <div className={styles.formGroup}>
            <label>Backup Location</label>
            <select name="backupLocation" value={formData.backupLocation} onChange={handleChange} className={styles.select}>
              <option value="local">Local Storage</option><option value="cloud">Cloud Storage</option><option value="both">Both</option>
            </select>
          </div>
        </div>

        <label className={styles.checkbox}>
          <input type="checkbox" name="includeAttachments" checked={formData.includeAttachments} onChange={handleChange} />
          <span>Include document attachments in backup</span>
        </label>

        <div className={styles.formActions}>
          <Button type="submit" variant="primary" loading={saving}>Save Backup Settings</Button>
        </div>
      </form>
    </Card>
  );
};

export default BackupSettings;
