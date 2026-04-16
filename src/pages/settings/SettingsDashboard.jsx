import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './SettingsStyles.module.css';

const SettingsDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subModules = [
    { name: 'General', path: '/settings/general', icon: '⚙️' },
    { name: 'Company', path: '/settings/company', icon: '🏢' },
    { name: 'Users', path: '/settings/users', icon: '👥' },
    { name: 'Roles', path: '/settings/roles', icon: '🔑' },
    { name: 'Email', path: '/settings/email', icon: '📧' },
    { name: 'Notifications', path: '/settings/notifications', icon: '🔔' },
    { name: 'Security', path: '/settings/security', icon: '🔒' },
    { name: 'Backup', path: '/settings/backup', icon: '💾' },
    { name: 'Integrations', path: '/settings/integrations', icon: '🔌' },
    { name: 'Audit Log', path: '/settings/audit', icon: '📋' }
  ];

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Settings & Configuration</h1>
        </div>

        <Card className={styles.subNavCard}>
          <div className={styles.subNav}>
            {subModules.map((module, index) => (
              <button
                key={index}
                className={`${styles.subNavItem} ${location.pathname === module.path ? styles.subNavActive : ''}`}
                onClick={() => navigate(module.path)}
              >
                <span className={styles.subNavIcon}>{module.icon}</span>
                <span className={styles.subNavLabel}>{module.name}</span>
              </button>
            ))}
          </div>
        </Card>

        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default SettingsDashboard;
