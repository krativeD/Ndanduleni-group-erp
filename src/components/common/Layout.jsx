import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  const { user, signOut } = useAuth();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className="container flex justify-between items-center">
          <div className={styles.logo}>
            <img src="/logo.png" alt="Ndanduleni" height="40" />
            <span>Ndanduleni ERP</span>
          </div>
          {user && (
            <nav className={styles.nav}>
              <span className={styles.userEmail}>{user.email}</span>
              <button onClick={signOut} className="btn">Sign Out</button>
            </nav>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
