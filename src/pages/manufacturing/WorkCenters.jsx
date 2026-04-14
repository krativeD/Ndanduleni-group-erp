import React from 'react';
import Layout from '../../components/common/Layout';
import WorkCenters from '../../components/manufacturing/WorkCenters';
import { useWorkCenters } from '../../hooks/useManufacturing';
import Loader from '../../components/common/Loader';
import styles from './ManufacturingStyles.module.css';

const WorkCentersPage = () => {
  const { workCenters, loading, error } = useWorkCenters();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Work Centers</h1></div>
        <WorkCenters workCenters={workCenters} />
      </div>
    </Layout>
  );
};

export default WorkCentersPage;
