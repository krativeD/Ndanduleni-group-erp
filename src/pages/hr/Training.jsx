import React from 'react';
import Layout from '../../components/common/Layout';
import TrainingSchedule from '../../components/hr/TrainingSchedule';
import styles from './HRStyles.module.css';

const Training = () => {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Training</h1>
        </div>

        <TrainingSchedule />
      </div>
    </Layout>
  );
};

export default Training;
