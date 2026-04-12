import React from 'react';
import Layout from '../../components/common/Layout';
import RecruitmentPipeline from '../../components/hr/RecruitmentPipeline';
import styles from './HRStyles.module.css';

const Recruitment = () => {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Recruitment</h1>
        </div>

        <RecruitmentPipeline />
      </div>
    </Layout>
  );
};

export default Recruitment;
