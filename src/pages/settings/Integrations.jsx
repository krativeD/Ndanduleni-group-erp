import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { useIntegrationSettings } from '../../hooks/useSettings';
import styles from './SettingsStyles.module.css';

const Integrations = () => {
  const { settings, loading, updateSettings, testConnection } = useIntegrationSettings();
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
    <Card className={styles.integrationCard}>
      <h3>Integration Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.section}>
          <h4>Payment Gateway</h4>
          <select name="paymentGateway" value={formData.paymentGateway} onChange={handleChange} className={styles.select}>
            <option value="stripe">Stripe</option><option value="paypal">PayPal</option><option value="payfast">PayFast</option><option value="none">None</option>
          </select>
          {formData.paymentGateway === 'stripe' && <Input label="Stripe Publishable Key" name="stripePublishableKey" value={formData.stripePublishableKey} onChange={handleChange} />}
          <Button type="button" variant="default" size="small" onClick={() => testConnection('Payment Gateway')}>Test Connection</Button>
        </div>
        <div className={styles.section}>
          <h4>SMS Provider</h4>
          <select name="smsProvider" value={formData.smsProvider} onChange={handleChange} className={styles.select}>
            <option value="twilio">Twilio</option><option value="none">None</option>
          </select>
        </div>
        <div className={styles.section}>
          <h4>Accounting Software</h4>
          <select name="accountingSoftware" value={formData.accountingSoftware} onChange={handleChange} className={styles.select}>
            <option value="none">None</option><option value="xero">Xero</option><option value="quickbooks">QuickBooks</option>
          </select>
        </div>
        <div className={styles.section}>
          <h4>Slack Integration</h4>
          <Input label="Slack Webhook URL" name="slackWebhook" value={formData.slackWebhook} onChange={handleChange} placeholder="https://hooks.slack.com/services/..." />
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox" name="apiEnabled" checked={formData.apiEnabled} onChange={handleChange} />
          <span>Enable API Access</span>
        </label>
        <div className={styles.formActions}>
          <Button type="submit" variant="primary" loading={saving}>Save Integration Settings</Button>
        </div>
      </form>
    </Card>
  );
};

export default Integrations;
