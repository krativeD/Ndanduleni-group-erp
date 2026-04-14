import React from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { usePurchaseOrders } from '../../hooks/useInventory';
import Loader from '../../components/common/Loader';
import styles from './InventoryStyles.module.css';

const PurchaseOrders = () => {
  const { orders, loading, error } = usePurchaseOrders();

  const getStatusBadge = (status) => {
    const badges = {
      'pending': styles.statusPending,
      'approved': styles.statusApproved,
      'in-transit': styles.statusTransit,
      'delivered': styles.statusDelivered
    };
    return badges[status] || styles.statusPending;
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Purchase Orders</h1>
          <Button variant="primary">+ New Order</Button>
        </div>

        <Card className={styles.ordersCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>PO Number</th>
                  <th>Supplier</th>
                  <th>Order Date</th>
                  <th>Expected Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.poNumber}</td>
                    <td>{order.supplier}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.expectedDate}</td>
                    <td>{order.items}</td>
                    <td>R {order.total.toLocaleString()}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PurchaseOrders;
