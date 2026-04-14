import React from 'react';
import Layout from '../../components/common/Layout';
import OrderList from '../../components/sales/OrderList';
import { useOrders } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Orders = () => {
  const { orders, loading, error, updateOrderStatus } = useOrders();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Sales Orders</h1></div>
        <OrderList orders={orders} onStatusChange={updateOrderStatus} onAdd={() => console.log('Add order')} />
      </div>
    </Layout>
  );
};

export default Orders;
