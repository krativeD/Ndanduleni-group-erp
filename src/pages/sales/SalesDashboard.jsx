import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './SalesStyles.module.css';

const SalesDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const subModules = [
    { 
      name: 'Orders', 
      path: '/sales/orders', 
      icon: '📋', 
      description: 'Manage customer orders and track fulfillment',
      color: '#6366f1'
    },
    { 
      name: 'Quotations', 
      path: '/sales/quotations', 
      icon: '📄', 
      description: 'Create and send quotes to clients',
      color: '#f59e0b'
    },
    { 
      name: 'Invoices', 
      path: '/sales/invoices', 
      icon: '🧾', 
      description: 'Generate and manage invoices',
      color: '#10b981'
    },
    { 
      name: 'Services', 
      path: '/sales/description', 
      icon: '📝', 
      description: 'Manage service catalog and pricing',
      color: '#8b5cf6'
    }
  ];

  const currentModule = subModules.find(m => location.pathname === m.path || location.pathname.startsWith(m.path + '/'));

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Sales & Orders</h1>
            <p className={styles.pageDescription}>Manage your sales pipeline, quotations, invoices, and service catalog</p>
          </div>
        </div>

        {/* Module Cards Overview */}
        <div className={styles.moduleOverview}>
          {subModules.map((module, index) => (
            <Card 
              key={index} 
              className={`${styles.moduleCard} ${location.pathname === module.path || location.pathname.startsWith(module.path + '/') ? styles.moduleCardActive : ''}`}
              onClick={() => navigate(module.path)}
            >
              <div className={styles.moduleIcon} style={{ background: module.color }}>
                {module.icon}
              </div>
              <div className={styles.moduleContent}>
                <h3>{module.name}</h3>
                <p>{module.description}</p>
              </div>
              <span className={styles.moduleArrow}>→</span>
            </Card>
          ))}
        </div>

        {/* Current Section Header */}
        {currentModule && (
          <div className={styles.currentSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>{currentModule.icon}</span>
              <h2>{currentModule.name}</h2>
            </div>
          </div>
        )}

        {/* Sub-navigation Tabs */}
        <Card className={styles.subNavCard}>
          <div className={styles.subNav}>
            {subModules.map((module, index) => (
              <button
                key={index}
                className={`${styles.subNavItem} ${location.pathname === module.path || location.pathname.startsWith(module.path + '/') ? styles.subNavActive : ''}`}
                onClick={() => navigate(module.path)}
              >
                <span className={styles.subNavIcon}>{module.icon}</span>
                <span className={styles.subNavLabel}>{module.name}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Content Area */}
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default SalesDashboard;
