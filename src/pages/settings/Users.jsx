import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import styles from './SettingsStyles.module.css';

const Users = () => {
  return (
    <Card className={styles.placeholderCard}>
      <h3>User Management</h3>
      <p>User management is handled in the main Users section.</p>
      <Button variant="primary" onClick={() => window.location.href = '/users'}>
        Go to User Management
      </Button>
    </Card>
  );
};

export default Users;
