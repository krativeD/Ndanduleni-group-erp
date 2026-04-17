import React, { useState } from 'react';
import OrderList from '../../components/sales/OrderList';
import OrderForm from '../../components/sales/OrderForm';
import { useOrders } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import Card from '../../components/common/Card';
import styles from './SalesStyles.module.css';

const Orders = () => {
  const { orders, loading, error, addOrder, updateOrder, deleteOrder, updateOrderStatus } = useOrders();
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [view, setView] = useState('all');

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'delivered').length,
    revenue: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0)
  };

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const handleAdd = () => { setEditingOrder(null); setShowForm(true); };
  const handleEdit = (order) => { setEditingOrder(order); setShowForm(true); };
  const handleDelete = (id) => { if (window.confirm('Delete this order?')) deleteOrder(id); };
  const handleSubmit = (data) => {
    editingOrder ? updateOrder(editingOrder.id, data) : addOrder(data);
    setShowForm(false); setEditingOrder(null);
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}><span className={styles.statIcon}>📋</span><div className={styles.statContent}><span className={styles.statLabel}>Total</span><span className={styles.statValue}>{stats.total}</span></div></Card>
        <Card className={styles.statCard}><span className={styles.statIcon}>⏳</span><div className={styles.statContent}><span className={styles.statLabel}>Pending</span><span className={styles.statValue}>{stats.pending}</span></div></Card>
        <Card className={styles.statCard}><span className={styles.statIcon}>🔄</span><div className={styles.statContent}><span className={styles.statLabel}>Processing</span><span className={styles.statValue}>{stats.processing}</span></div></Card>
        <Card className={styles.statCard}><span className={styles.statIcon}>✅</span><div className={styles.statContent}><span className={styles.statLabel}>Completed</span><span className={styles.statValue}>{stats.completed}</span></div></Card>
        <Card className={`${styles.statCard} ${styles.statHighlight}`}><span className={styles.statIcon}>💰</span><div className={styles.statContent}><span className={styles.statLabel}>Revenue</span><span className={styles.statValue}>{formatCurrency(stats.revenue)}</span></div></Card>
      </div>

      <div className={styles.viewToggle}>
        <button className={`${styles.viewBtn} ${view === 'all' ? styles.active : ''}`} onClick={() => setView('all')}>All</button>
        <button className={`${styles.viewBtn} ${view === 'pending' ? styles.active : ''}`} onClick={() => setView('pending')}>Pending</button>
        <button className={`${styles.viewBtn} ${view === 'processing' ? styles.active : ''}`} onClick={() => setView('processing')}>Processing</button>
        <button className={`${styles.viewBtn} ${view === 'completed' ? styles.active : ''}`} onClick={() => setView('completed')}>Completed</button>
      </div>

      {showForm ? (
        <OrderForm order={editingOrder} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingOrder(null); }} />
      ) : (
        <OrderList 
          orders={orders.filter(o => view === 'all' || (view === 'pending' && o.status === 'pending') || (view === 'processing' && o.status === 'processing') || (view === 'completed' && o.status === 'delivered'))} 
          onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onStatusChange={updateOrderStatus} 
        />
      )}
    </div>
  );
};

export default Orders;
