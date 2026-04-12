import React from 'react';
import Card from '../common/Card';
import styles from './AuthCard.module.css';

const AuthCard = ({ title, children }) => {
  return (
    <div className={styles.authContainer}>
      <Card className={styles.authCard}>
        <div className={styles.logoWrapper}>
          <img src="/logo.png" alt="Ndanduleni" className={styles.logo} />
          <h1>Ndanduleni ERP</h1>
        </div>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </Card>
    </div>
  );
};

export default AuthCard;
