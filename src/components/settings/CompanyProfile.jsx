import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { useCompanyProfile } from '../../hooks/useSettings';
import styles from './CompanyProfile.module.css';

const CompanyProfile = () => {
  const { profile, loading, updateProfile } = useCompanyProfile();
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile(formData);
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(null);
  };

  if (loading) return <Loader />;
  if (!profile) return null;

  const displayData = isEditing ? formData : profile;

  return (
    <Card className={styles.profileCard}>
      <div className={styles.header}>
        <h3>Company Profile</h3>
        {!isEditing && <Button variant="primary" size="small" onClick={handleEdit}>✏️ Edit</Button>}
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.logoSection}>
            <img src={profile.logo} alt="Logo" className={styles.logo} />
            {isEditing && <Button variant="default" size="small">Change Logo</Button>}
          </div>

          <Input label="Company Name" name="name" value={displayData.name} onChange={handleChange} disabled={!isEditing} required />
          <Input label="Legal Name" name="legalName" value={displayData.legalName} onChange={handleChange} disabled={!isEditing} />
          <Input label="Registration Number" name="registrationNumber" value={displayData.registrationNumber} onChange={handleChange} disabled={!isEditing} />
          <Input label="VAT Number" name="vatNumber" value={displayData.vatNumber} onChange={handleChange} disabled={!isEditing} />
          <Input label="Phone" name="phone" value={displayData.phone} onChange={handleChange} disabled={!isEditing} />
          <Input label="Email" name="email" type="email" value={displayData.email} onChange={handleChange} disabled={!isEditing} />
          <Input label="Website" name="website" value={displayData.website} onChange={handleChange} disabled={!isEditing} />
          <div className={styles.fullWidth}>
            <Input label="Address" name="address" value={displayData.address} onChange={handleChange} disabled={!isEditing} />
          </div>
          <Input label="Industry" name="industry" value={displayData.industry} onChange={handleChange} disabled={!isEditing} />
          <Input label="Founded Year" name="foundedYear" value={displayData.foundedYear} onChange={handleChange} disabled={!isEditing} />
          <Input label="Timezone" name="timezone" value={displayData.timezone} onChange={handleChange} disabled={!isEditing} />
          <Input label="Currency" name="currency" value={displayData.currency} onChange={handleChange} disabled={!isEditing} />
        </div>

        {isEditing && (
          <div className={styles.formActions}>
            <Button type="button" variant="default" onClick={handleCancel}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>Save Changes</Button>
          </div>
        )}
      </form>
    </Card>
  );
};

export default CompanyProfile;
