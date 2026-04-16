import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { useGeneralSettings } from '../../hooks/useSettings';
import styles from './GeneralSettings.module.css';

const GeneralSettings = () => {
  const { settings, loading, updateSettings } = useGeneralSettings();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

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
    <Card className={styles.settingsCard}>
      <h3>General Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Language</label>
            <select name="language" value={formData.language} onChange={handleChange} className={styles.select}>
              <option>English</option><option>Afrikaans</option><option>Zulu</option><option>Xhosa</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Timezone</label>
            <select name="timezone" value={formData.timezone} onChange={handleChange} className={styles.select}>
              <option>Africa/Johannesburg</option><option>UTC</option><option>Europe/London</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Date Format</label>
            <select name="dateFormat" value={formData.dateFormat} onChange={handleChange} className={styles.select}>
              <option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Time Format</label>
            <select name="timeFormat" value={formData.timeFormat} onChange={handleChange} className={styles.select}>
              <option>24h</option><option>12h</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Week Starts On</label>
            <select name="weekStartsOn" value={formData.weekStartsOn} onChange={handleChange} className={styles.select}>
              <option>Monday</option><option>Sunday</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Fiscal Year Start</label>
            <select name="fiscalYearStart" value={formData.fiscalYearStart} onChange={handleChange} className={styles.select}>
              <option>January</option><option>April</option><option>July</option><option>October</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Default Currency</label>
            <select name="defaultCurrency" value={formData.defaultCurrency} onChange={handleChange} className={styles.select}>
              <option>ZAR</option><option>USD</option><option>EUR</option><option>GBP</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Tax Rate (%)</label>
            <input type="number" name="taxRate" value={formData.taxRate} onChange={handleChange} className={styles.input} step="0.5" />
          </div>
          <div className={styles.formGroup}>
            <label>Session Timeout (minutes)</label>
            <input type="number" name="sessionTimeout" value={formData.sessionTimeout} onChange={handleChange} className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label>Items Per Page</label>
            <select name="itemsPerPage" value={formData.itemsPerPage} onChange={handleChange} className={styles.select}>
              <option>10</option><option>25</option><option>50</option><option>100</option>
            </select>
          </div>
        </div>
        <div className={styles.formActions}>
          <Button type="submit" variant="primary" loading={saving}>Save Settings</Button>
        </div>
      </form>
    </Card>
  );
};

export default GeneralSettings;
