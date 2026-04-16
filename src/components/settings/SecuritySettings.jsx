import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { useSecuritySettings } from '../../hooks/useSettings';
import styles from './SecuritySettings.module.css';

const SecuritySettings = () => {
  const { settings, loading, updateSettings } = useSecuritySettings();
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
    <Card className={styles.securityCard}>
      <h3>Security Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label>Password Minimum Length</label>
            <input type="number" name="passwordMinLength" value={formData.passwordMinLength} onChange={handleChange} className={styles.input} min="6" max="20" />
          </div>
          <div className={styles.formGroup}>
            <label>Password Expiry (days)</label>
            <input type="number" name="passwordExpiryDays" value={formData.passwordExpiryDays} onChange={handleChange} className={styles.input} min="0" max="365" />
          </div>
          <div className={styles.formGroup}>
            <label>Max Login Attempts</label>
            <input type="number" name="loginAttempts" value={formData.loginAttempts} onChange={handleChange} className={styles.input} min="3" max="10" />
          </div>
          <div className={styles.formGroup}>
            <label>Lockout Duration (minutes)</label>
            <input type="number" name="lockoutDuration" value={formData.lockoutDuration} onChange={handleChange} className={styles.input} min="5" max="60" />
          </div>
          <div className={styles.formGroup}>
            <label>Session Timeout (minutes)</label>
            <input type="number" name="sessionTimeout" value={formData.sessionTimeout} onChange={handleChange} className={styles.input} min="5" max="120" />
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkbox}>
            <input type="checkbox" name="passwordRequireUppercase" checked={formData.passwordRequireUppercase} onChange={handleChange} />
            <span>Require uppercase letter</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" name="passwordRequireNumber" checked={formData.passwordRequireNumber} onChange={handleChange} />
            <span>Require number</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" name="passwordRequireSpecial" checked={formData.passwordRequireSpecial} onChange={handleChange} />
            <span>Require special character</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" name="mfaEnabled" checked={formData.mfaEnabled} onChange={handleChange} />
            <span>Enable Two-Factor Authentication (2FA)</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" name="mfaRequiredForAdmins" checked={formData.mfaRequiredForAdmins} onChange={handleChange} />
            <span>Require 2FA for Admins</span>
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" name="auditLogEnabled" checked={formData.auditLogEnabled} onChange={handleChange} />
            <span>Enable Audit Logging</span>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>IP Whitelist (comma separated)</label>
          <input type="text" name="ipWhitelist" value={formData.ipWhitelist} onChange={handleChange} className={styles.input} placeholder="192.168.1.1, 10.0.0.1" />
        </div>

        <div className={styles.formActions}>
          <Button type="submit" variant="primary" loading={saving}>Save Security Settings</Button>
        </div>
      </form>
    </Card>
  );
};

export default SecuritySettings;
