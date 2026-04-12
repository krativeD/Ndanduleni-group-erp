import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, profile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', user.id);
      
      if (error) throw error;
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.profilePage}>
        <h1>My Profile</h1>
        
        <Card className={styles.profileCard}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {message && <div className={styles.message}>{message}</div>}
            
            <Input
              label="Email"
              type="email"
              value={user?.email || ''}
              disabled
            />
            
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
            
            <Input
              label="Role"
              type="text"
              value={profile?.role?.toUpperCase() || ''}
              disabled
            />
            
            <Button type="submit" variant="primary" loading={loading}>
              Save Changes
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
