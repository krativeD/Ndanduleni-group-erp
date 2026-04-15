import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = profile?.role?.toLowerCase() || 'staff';

  const navItems = {
    ceo: [
      { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
      { name: 'HR Module', path: '/hr/employees', icon: '👥' },
      { name: 'CRM Module', path: '/crm/contacts', icon: '🤝' },
      { name: 'Services', path: '/services/schedule', icon: '🧹' },
      { name: 'Inventory', path: '/inventory/stock', icon: '📦' },
      { name: 'Manufacturing', path: '/manufacturing/products', icon: '🏭' },
      { name: 'Sales', path: '/sales', icon: '🛒' },
      { name: 'Finance', path: '/finance', icon: '💰' },
      { name: 'Procurement', path: '/procurement', icon: '📋' },
      { name: 'Reports', path: '/reports', icon: '📊' },
      { name: 'Documents', path: '/documents', icon: '📁' },
      { name: 'Users', path: '/users', icon: '👤' },
      { name: 'Settings', path: '/settings', icon: '⚙️' },
      { name: 'Profile', path: '/profile', icon: '👤' }
    ],
    admin: [
      { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
      { name: 'HR Module', path: '/hr/employees', icon: '👥' },
      { name: 'CRM Module', path: '/crm/contacts', icon: '🤝' },
      { name: 'Services', path: '/services/schedule', icon: '🧹' },
      { name: 'Inventory', path: '/inventory/stock', icon: '📦' },
      { name: 'Sales', path: '/sales', icon: '🛒' },
      { name: 'Finance', path: '/finance', icon: '💰' },
      { name: 'Procurement', path: '/procurement', icon: '📋' },
      { name: 'Reports', path: '/reports', icon: '📊' },
      { name: 'Profile', path: '/profile', icon: '👤' }
    ],
    staff: [
      { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
      { name: 'My Attendance', path: '/hr/attendance', icon: '📍' },
      { name: 'My Tasks', path: '/crm/activities', icon: '📋' },
      { name: 'Services', path: '/services/jobs', icon: '🧹' },
      { name: 'Inventory', path: '/inventory/stock', icon: '📦' },
      { name: 'Sales', path: '/sales/orders', icon: '🛒' },
      { name: 'Profile', path: '/profile', icon: '👤' }
    ]
  };

  // THIS LINE IS CRITICAL - It uses navItems
  const items = navItems[role] || navItems.staff;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.layout}>
      {/* Hamburger Menu Button */}
      <button className={styles.menuToggle} onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <img src="/logo.png" alt="Ndanduleni group" height="40" />
          <span>NDANDULENI GROUP</span>
        </div>
        
        <nav className={styles.sidebarNav}>
          {items.map((item, index) => (
            <button
              key={index}
              className={`${styles.navItem} ${location.pathname === item.path || location.pathname.startsWith(item.path + '/') ? styles.navItemActive : ''}`}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{profile?.full_name || user?.email}</span>
            <span className={styles.userRole}>{role.toUpperCase()}</span>
          </div>
          <button onClick={signOut} className={styles.signOutBtn}>
            🚪 Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
