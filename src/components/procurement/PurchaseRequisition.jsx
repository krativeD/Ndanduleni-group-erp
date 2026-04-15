import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './PurchaseRequisition.module.css';

const PurchaseRequisition = ({ requisitions, onAdd, onEdit, onDelete, onApprove }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingReq, setEditingReq] = useState(null);
  const [formData, setFormData] = useState({ requestedBy: '', department: '', requiredDate: '', items: 1, total: 0, priority: 'medium' });

  const filteredReqs = requisitions.filter(r => {
    const matchesSearch = r.reqNumber.toLowerCase().includes(searchTerm.toLowerCase()) || r.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const getStatusBadge = (status) => {
    const badges = { 'draft': styles.statusDraft, 'pending': styles.statusPending, 'approved': styles.statusApproved, 'rejected': styles.statusRejected };
    return badges[status] || styles.statusDraft;
  };

  const getPriorityBadge = (priority) => {
    const badges = { 'low': styles.priorityLow, 'medium': styles.priorityMedium, 'high': styles.priorityHigh };
    return badges[priority] || styles.priorityMedium;
  };

  const handleAdd = () => {
    setEditingReq(null);
    setFormData({ requestedBy: '', department: '', requiredDate: '', items: 1, total: 0, priority: 'medium' });
    setShowForm(true);
  };

  const handleEdit = (req) => {
    setEditingReq(req);
    setFormData({ requestedBy: req.requestedBy, department: req.department, requiredDate: req.requiredDate, items: req.items, total: req.total, priority: req.priority });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqData = { ...formData, items: parseInt(formData.items), total: parseFloat(formData.total) };
    if (editingReq) {
      onEdit(editingReq.id, reqData);
    } else {
      onAdd(reqData);
    }
    setShowForm(false);
  };

  return (
    <Card className={styles.reqCard}>
      <div className={styles.header}>
        <h3>Purchase Requisitions</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ New Requisition</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingReq ? 'Edit Requisition' : 'New Requisition'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Requested By" name="requestedBy" value={formData.requestedBy} onChange={handleChange} required />
              <Input label="Department" name="department" value={formData.department} onChange={handleChange} required />
              <Input label="Required Date" name="requiredDate" type="date" value={formData.requiredDate} onChange={handleChange} required />
              <Input label="Number of Items" name="items" type="number" value={formData.items} onChange={handleChange} required />
              <Input label="Estimated Total (R)" name="total" type="number" step="0.01" value={formData.total} onChange={handleChange} required />
              <select name="priority" value={formData.priority} onChange={handleChange} className={styles.select}>
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
              </select>
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingReq ? 'Update' : 'Create'} Requisition</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <Input type="search" placeholder="Search requisitions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option><option value="draft">Draft</option><option value="pending">Pending</option><option value="approved">Approved</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>Req #</th><th>Requested By</th><th>Department</th><th>Date</th><th>Required</th><th>Items</th><th>Total</th><th>Priority</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredReqs.map(r => (
              <tr key={r.id}>
                <td>{r.reqNumber}</td><td>{r.requestedBy}</td><td>{r.department}</td><td>{r.date}</td><td>{r.requiredDate}</td><td>{r.items}</td><td>{formatCurrency(r.total)}</td>
                <td><span className={`${styles.priorityBadge} ${getPriorityBadge(r.priority)}`}>{r.priority}</span></td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(r.status)}`}>{r.status}</span></td>
                <td>
                  <div className={styles.actions}>
                    {r.status === 'pending' && <Button variant="success" size="small" onClick={() => onApprove(r.id)}>Approve</Button>}
                    {r.status === 'draft' && <button className={styles.actionBtn} onClick={() => handleEdit(r)}>✏️</button>}
                    <button className={styles.actionBtn} onClick={() => onDelete(r.id)}>🗑️</button>
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

export default PurchaseRequisition;
