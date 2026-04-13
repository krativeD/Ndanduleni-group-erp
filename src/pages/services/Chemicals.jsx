import React from 'react';
import Layout from '../../components/common/Layout';
import ChemicalInventory from '../../components/services/ChemicalInventory';
import { useChemicals } from '../../hooks/useServices';
import Loader from '../../components/common/Loader';
import styles from './ServicesStyles.module.css';

const Chemicals = () => {
  const { chemicals, loading, error } = useChemicals();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Chemical Inventory</h1>
        </div>
        <ChemicalInventory chemicals={chemicals} />
      </div>
    </Layout>
  );
};

export default Chemicals;
