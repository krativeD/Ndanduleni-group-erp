import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './ProductionOrders.module.css';

const ProductionOrders = ({ orders, onStatusChange, onAdd }) => {
  const getStatusBadge = (status) => {
    const badges = {
      'planned': styles.statusPlanned,
      'in-progress': styles.statusProgress,
      'completed': styles.statusCompleted
    };
    return badges[status] || styles.statusPlanned;
  };

  const getProgress = (order) => {
    if (order.status === 'completed') return 100;
    if (order.status === 'in-progress') return 65;
    return 0;
  };

  return (
    <Card className={styles.ordersCard}>
      <div className={styles.header}>
        <h3>Production Orders</h3>
        <Button variant="primary" size="small" onClick={onAdd}>+ New Order</Button>
      </div>

      <div className={styles.orderList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderItem}>
            <div className={styles.orderHeader}>
              <div>
                <span className={styles.orderNumber}>{order.orderNumber}</span>
                <span className={styles.productName}>{order.product}</span>
              </div>
              <span className={`${styles.statusBadge} ${getStatusBadge(order.status)}`}>{order.status}</span>
            </div>

            <div className={styles.orderDetails}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${getProgress(order)}%` }}></div>
              </div>
              <div className={styles.orderMeta}>
                <span>Qty: {order.quantity}</span>
                <span>Work Center: {order.workCenter}</span>
                <span>Team: {order.assignedTo}</span>
              </div>
              <div className={styles.orderDates}>
                <span>Start: {order.startDate}</span>
                <span>End: {order.endDate}</span>
              </div>
            </div>

            {order.status !== 'completed' && (
              <div className={styles.orderActions}>
                {order.status === 'planned' && (
                  <Button variant="primary" size="small" onClick={() => onStatusChange(order.id, 'in-progress')}>Start Production</Button>
                )}
                {order.status === 'in-progress' && (
                  <Button variant="success" size="small" onClick={() => onStatusChange(order.id, 'completed')}>Complete</Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProductionOrders;
