import React from 'react';
import Layout from '../../components/common/Layout';
import StockMovement from '../../components/inventory/StockMovement';
import { useStockMovements } from '../../hooks/useInventory';
import Loader from '../../components/common/Loader';
import styles from './InventoryStyles.module.css';

const Movements = () => {
  const { movements, loading, error, addMovement } = useStockMovements();

  const handleNewMovement = () => {
    console.log('New movement');
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Stock Movements</h1>
        </div>

        <StockMovement movements={movements} onNewMovement={handleNewMovement} />
      </div>
    </Layout>
  );
};

export default Movements;
