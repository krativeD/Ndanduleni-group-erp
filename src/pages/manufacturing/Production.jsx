import React from 'react';
import Layout from '../../components/common/Layout';
import ProductionOrders from '../../components/manufacturing/ProductionOrders';
import WorkCenters from '../../components/manufacturing/WorkCenters';
import { useProductionOrders, useWorkCenters } from '../../hooks/useManufacturing';
import Loader from '../../components/common/Loader';
import styles from './ManufacturingStyles.module.css';

const Production = () => {
  const { orders, loading: ordersLoading, updateOrderStatus, addOrder } = useProductionOrders();
  const { workCenters, loading: wcLoading } = useWorkCenters();

  if (ordersLoading || wcLoading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Production Management</h1></div>
        <div className={styles.productionGrid}>
          <ProductionOrders orders={orders} onStatusChange={updateOrderStatus} onAdd={() => console.log('Add order')} />
          <WorkCenters workCenters={workCenters} />
        </div>
      </div>
    </Layout>
  );
};

export default Production;
