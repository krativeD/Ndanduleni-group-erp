import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './PurchaseOrder.module.css';

const PurchaseOrder = ({ orders, suppliers, onAdd, onEdit, onDelete, onApprove, onSend }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({ supplier: '', requisition: '', expectedDate: '', items: 1, total: 0 });

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) || o.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const getStatusBadge = (status) => {
    const badges = { 'draft': styles.statusDraft, 'approved': styles.statusApproved, 'ordered': styles.statusOrdered, 'delivered': styles.statusDelivered };
    return badges[status] || styles.statusDraft;
  };

  const handleAdd = () => {
    setEditingOrder(null);
    setFormData({ supplier: '', requisition: '', expectedDate: '', items: 1, total: 0 });
    setShowForm(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({ supplier: order.supplier, requisition: order.requisition || '', expectedDate: order.expectedDate, items: order.items, total: order.total });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = { ...formData, items: parseInt(formData.items), total: parseFloat(formData.total) };
    if (editingOrder) {
      onEdit(editingOrder.id, orderData);
    } else {
      onAdd(orderData);
    }
    setShowForm(false);
  };

  return (
    <Card className={styles.poCard}>
      <div className={styles.header}>
        <h3>Purchase Orders</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ New PO</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingOrder ? 'Edit Purchase Order' : 'New Purchase Order'}</h4>
            <form onSubmit={handleSubmit}>
              <select name="supplier" value={formData.supplier} onChange={handleChange} className={styles.select} required>
                <option value="">Select Supplier</option>
                {suppliers.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
              <Input label="Requisition # (Optional)" name="requisition" value={formData.requisition} onChange={handleChange} />
              <Input label="Expected Delivery" name="expectedDate" type="date" value={formData.expectedDate} onChange={handleChange} required />
              <Input label="Number of Items" name="items" type="number" value={formData.items} onChange={handleChange} required />
              <Input label="Total Amount (R)" name="total" type="number" step="0.01" value={formData.total} onChange={handleChange} required />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingOrder ? 'Update' : 'Create'} PO</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <Input type="search" placeholder="Search PO..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option><option value="draft">Draft</option><option value="approved">Approved</option><option value="ordered">Ordered</option><option value="delivered">Delivered</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>PO #</th><th>Supplier</th><th>Order Date</th><th>Expected</th><th>Items</th><th>Total</th><th>Status</th><th>Payment</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredOrders.map(o => (
              <tr key={o.id}>
                <td>{o.poNumber}</td><td>{o.supplier}</td><td>{o.orderDate}</td><td>{o.expectedDate}</td><td>{o.items}</td><td>{formatCurrency(o.total)}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(o.status)}`}>{o.status}</span></td>
                <td>{o.paymentStatus}</td>
                <td>
                  <div className={styles.actions}>
                    {o.status === 'draft' && <Button variant="success" size="small" onClick={() => onApprove(o.id)}>Approve</Button>}
                    {o.status === 'approved' && <Button variant="primary" size="small" onClick={() => onSend(o.id)}>Send</Button>}
                    {o.status === 'draft' && <button className={styles.actionBtn} onClick={() => handleEdit(o)}>✏️</button>}
                    <button className={styles.actionBtn} onClick={() => onDelete(o.id)}>🗑️</button>
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

export default PurchaseOrder;
