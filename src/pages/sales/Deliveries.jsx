import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import DeliveryForm from '../../components/sales/DeliveryForm';
import { useDeliveries } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Deliveries = () => {
  const { deliveries, loading, addDelivery, updateDeliveryStatus, deleteDelivery } = useDeliveries();
  const [showForm, setShowForm] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);

  const getStatusBadge = (status) => {
    const badges = { 'scheduled': styles.statusScheduled, 'in-transit': styles.statusTransit, 'delivered': styles.statusDelivered };
    return badges[status] || styles.statusScheduled;
  };

  const handleAdd = () => {
    setEditingDelivery(null);
    setShowForm(true);
  };

  const handleEdit = (delivery) => {
    setEditingDelivery(delivery);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this delivery?')) {
      deleteDelivery(id);
    }
  };

  const handleMarkDelivered = (id) => {
    updateDeliveryStatus(id, 'delivered', new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = (data) => {
    if (editingDelivery) {
      // Update not implemented in hook, but we can add later
      console.log('Update delivery:', editingDelivery.id, data);
    } else {
      addDelivery(data);
    }
    setShowForm(false);
    setEditingDelivery(null);
  };

  if (loading) return <Loader />;

  return (
    <>
      {showForm ? (
        <DeliveryForm delivery={editingDelivery} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingDelivery(null); }} />
      ) : (
        <>
          <div className={styles.subHeader}>
            <Button variant="primary" onClick={handleAdd}>+ Schedule Delivery</Button>
          </div>
          <Card className={styles.deliveryCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead><tr><th>Order #</th><th>Customer</th><th>Address</th><th>Scheduled</th><th>Delivered</th><th>Driver</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {deliveries.map(d => (
                    <tr key={d.id}>
                      <td>{d.order}</td><td>{d.customer}</td><td>{d.address}</td><td>{d.scheduled}</td><td>{d.delivered || '—'}</td><td>{d.driver}</td>
                      <td><span className={`${styles.statusBadge} ${getStatusBadge(d.status)}`}>{d.status}</span></td>
                      <td>
                        <div className={styles.actions}>
                          {d.status !== 'delivered' && (
                            <button className={styles.actionBtn} onClick={() => handleMarkDelivered(d.id)} title="Mark Delivered">✅</button>
                          )}
                          <button className={styles.actionBtn} onClick={() => handleEdit(d)}>✏️</button>
                          <button className={styles.actionBtn} onClick={() => handleDelete(d.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default Deliveries;
