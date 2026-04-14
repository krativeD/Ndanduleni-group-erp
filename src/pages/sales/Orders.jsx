import React from 'react';
import OrderList from '../../components/sales/OrderList';
import { useOrders } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Orders = () => {
  const { orders, loading, error, updateOrderStatus } = useOrders();

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <>
      <OrderList orders={orders} onStatusChange={updateOrderStatus} onAdd={() => console.log('Add order')} />
    </>
  );
};

export default Orders;
