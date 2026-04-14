import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import StockOverview from '../../components/inventory/StockOverview';
import LowStockAlerts from '../../components/inventory/LowStockAlerts';
import { useStockItems } from '../../hooks/useInventory';
import Loader from '../../components/common/Loader';
import styles from './InventoryStyles.module.css';

const Stock = () => {
  const { items, loading, error } = useStockItems();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    console.log('Selected item:', item);
  };

  const handleOrder = (item) => {
    console.log('Order item:', item);
  };

  const handleAddItem = () => {
    console.log('Add new item');
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Stock Management</h1>
        </div>

        <div className={styles.stockGrid}>
          <div className={styles.mainSection}>
            <StockOverview 
              items={items} 
              onItemClick={handleItemClick}
              onAddItem={handleAddItem}
            />
          </div>
          <div className={styles.sideSection}>
            <LowStockAlerts items={items} onOrder={handleOrder} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stock;
