import React from 'react';
import Layout from '../../components/common/Layout';
import EquipmentTracker from '../../components/services/EquipmentTracker';
import { useEquipment } from '../../hooks/useServices';
import Loader from '../../components/common/Loader';
import styles from './ServicesStyles.module.css';

const Equipment = () => {
  const { equipment, loading, error } = useEquipment();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Equipment Management</h1>
        </div>
        <EquipmentTracker equipment={equipment} />
      </div>
    </Layout>
  );
};

export default Equipment;
