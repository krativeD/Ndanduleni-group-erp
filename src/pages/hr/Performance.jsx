import React from 'react';
import Layout from '../../components/common/Layout';
import PerformanceReview from '../../components/hr/PerformanceReview';
import styles from './HRStyles.module.css';

const Performance = () => {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Performance</h1>
        </div>

        <PerformanceReview />
      </div>
    </Layout>
  );
};

export default Performance;
