import React from 'react';
import Card from '../common/Card';
import styles from './QuickActions.module.css';

const QuickActions = ({ role }) => {
  const getActions = () => {
    if (role === 'ceo') {
      return [
        { icon: '👥', label: 'Manage Users', path: '/users' },
        { icon: '📊', label: 'View Reports', path: '/reports' },
        { icon: '⚙️', label: 'Settings', path: '/settings' },
        { icon: '📋', label: 'Audit Log', path: '/audit' }
      ];
    } else if (role === 'admin') {
      return [
        { icon: '👤', label: 'Employees', path: '/hr/employees' },
        { icon: '📅', label: 'Attendance', path: '/hr/attendance' },
        { icon: '🏖️', label: 'Leave', path: '/hr/leave' },
        { icon: '📋', label: 'Tasks', path: '/tasks' }
      ];
    } else {
      return [
        { icon: '📍', label: 'Clock In', path: '/attendance' },
        { icon: '🏖️', label: 'Request Leave', path: '/leave/request' },
        { icon: '📋', label: 'My Tasks', path: '/my-tasks' },
        { icon: '👤', label: 'Profile', path: '/profile' }
      ];
    }
  };

  const actions = getActions();

  return (
    <Card className={styles.quickActionsCard}>
      <h3>Quick Actions</h3>
      <div className={styles.actionsGrid}>
        {actions.map((action, index) => (
          <button key={index} className={styles.actionButton}>
            <span className={styles.actionIcon}>{action.icon}</span>
            <span className={styles.actionLabel}>{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
