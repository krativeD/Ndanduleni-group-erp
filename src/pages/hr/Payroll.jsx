import React from 'react';
import Layout from '../../components/common/Layout';
import PayrollSummary from '../../components/hr/PayrollSummary';
import styles from './HRStyles.module.css';

const Payroll = () => {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Payroll</h1>
        </div>

        <PayrollSummary />
      </div>
    </Layout>
  );
};

export default Payroll;
