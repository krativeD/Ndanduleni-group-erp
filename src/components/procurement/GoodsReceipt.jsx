import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './GoodsReceipt.module.css';

const GoodsReceipt = ({ receipts, orders, onAdd, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ poNumber: '', items: 1, quantity: 1, inspectedBy: '', status: 'completed' });

  const filteredReceipts = receipts.filter(r => 
    r.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const badges = { 'partial': styles.statusPartial, 'completed': styles.statusCompleted };
    return badges[status] || styles.statusCompleted;
  };

  const handleAdd = () => {
    setFormData({ poNumber: '', items: 1, quantity: 1, inspectedBy: '', status: 'completed' });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPO = orders.find(o => o.poNumber === formData.poNumber);
    onAdd({ ...formData, supplier: selectedPO?.supplier || '', items: parseInt(formData.items), quantity: parseInt(formData.quantity) });
    setShowForm(false);
  };

  return (
    <Card className={styles.receiptCard}>
      <div className={styles.header}>
        <h3>Goods Receipt Notes</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ Record Receipt</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>Record Goods Receipt</h4>
            <form onSubmit={handleSubmit}>
              <select name="poNumber" value={formData.poNumber} onChange={handleChange} className={styles.select} required>
                <option value="">Select PO</option>
                {orders.filter(o => o.status === 'ordered' || o.status === 'approved').map(o => (
                  <option key={o.id} value={o.poNumber}>{o.poNumber} - {o.supplier}</option>
                ))}
              </select>
              <Input label="Items Received" name="items" type="number" value={formData.items} onChange={handleChange} required />
              <Input label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
              <Input label="Inspected By" name="inspectedBy" value={formData.inspectedBy} onChange={handleChange} required />
              <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
                <option value="partial">Partial</option>
                <option value="completed">Completed</option>
              </select>
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">Record Receipt</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <Input type="search" placeholder="Search GRN..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>GRN #</th><th>PO #</th><th>Supplier</th><th>Received</th><th>Items</th><th>Qty</th><th>Status</th><th>Inspector</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.map(r => (
              <tr key={r.id}>
                <td>{r.receiptNumber}</td>
                <td>{r.poNumber}</td>
                <td>{r.supplier}</td>
                <td>{r.receivedDate}</td>
                <td>{r.items}</td>
                <td>{r.quantity}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(r.status)}`}>{r.status}</span></td>
                <td>{r.inspectedBy}</td>
                <td><button className={styles.actionBtn} onClick={() => onDelete(r.id)}>🗑️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default GoodsReceipt;
