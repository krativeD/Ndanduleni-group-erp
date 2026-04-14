import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useDeliveries } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Deliveries = () => {
  const { deliveries, loading } = useDeliveries();

  const getStatusBadge = (status) => {
    const badges = { 'scheduled': styles.statusScheduled, 'in-transit': styles.statusTransit, 'delivered': styles.statusDelivered };
    return badges[status] || styles.statusScheduled;
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className={styles.subHeader}>
        <Button variant="primary">+ Schedule Delivery</Button>
      </div>
      <Card className={styles.deliveryCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead><tr><th>Order #</th><th>Customer</th><th>Address</th><th>Scheduled</th><th>Delivered</th><th>Driver</th><th>Status</th></tr></thead>
            <tbody>
              {deliveries.map(d => (
                <tr key={d.id}>
                  <td>{d.order}</td><td>{d.customer}</td><td>{d.address}</td><td>{d.scheduled}</td><td>{d.delivered || '—'}</td><td>{d.driver}</td>
                  <td><span className={`${styles.statusBadge} ${getStatusBadge(d.status)}`}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default Deliveries;
