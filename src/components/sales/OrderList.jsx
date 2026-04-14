import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './OrderList.module.css';

const OrderList = ({ orders, onStatusChange, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badges = { 'pending': styles.statusPending, 'confirmed': styles.statusConfirmed, 'processing': styles.statusProcessing, 'shipped': styles.statusShipped, 'delivered': styles.statusDelivered };
    return badges[status] || styles.statusPending;
  };

  const getPaymentBadge = (status) => {
    const badges = { 'paid': styles.paymentPaid, 'partial': styles.paymentPartial, 'unpaid': styles.paymentUnpaid };
    return badges[status] || styles.paymentUnpaid;
  };

  const totalValue = filteredOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <Card className={styles.orderCard}>
      <div className={styles.header}>
        <h3>Sales Orders</h3>
        <Button variant="primary" size="small" onClick={onAdd}>+ New Order</Button>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.statItem}><span className={styles.statLabel}>Total Orders</span><span className={styles.statValue}>{filteredOrders.length}</span></div>
        <div className={styles.statItem}><span className={styles.statLabel}>Total Value</span><span className={styles.statValue}>R {totalValue.toLocaleString()}</span></div>
      </div>

      <div className={styles.filters}>
        <Input type="search" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="processing">Processing</option><option value="shipped">Shipped</option><option value="delivered">Delivered</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead><tr><th>Order #</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Payment</th><th>Actions</th></tr></thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td><td>{order.customer}</td><td>{order.date}</td><td>{order.items}</td><td>R {order.total.toLocaleString()}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(order.status)}`}>{order.status}</span></td>
                <td><span className={`${styles.paymentBadge} ${getPaymentBadge(order.paymentStatus)}`}>{order.paymentStatus}</span></td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => onEdit(order)}>✏️</button>
                    <button className={styles.actionBtn} onClick={() => onDelete(order.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default OrderList;
