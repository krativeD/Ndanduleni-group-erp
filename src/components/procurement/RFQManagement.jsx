import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './RFQManagement.module.css';

const RFQManagement = ({ rfqs, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRFQ, setEditingRFQ] = useState(null);
  const [formData, setFormData] = useState({ title: '', closingDate: '', budget: 0, status: 'draft' });

  const filteredRFQs = rfqs.filter(r => 
    r.rfqNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const getStatusBadge = (status) => {
    const badges = { 'draft': styles.statusDraft, 'open': styles.statusOpen, 'evaluating': styles.statusEvaluating, 'awarded': styles.statusAwarded };
    return badges[status] || styles.statusDraft;
  };

  const handleAdd = () => {
    setEditingRFQ(null);
    setFormData({ title: '', closingDate: '', budget: 0, status: 'draft' });
    setShowForm(true);
  };

  const handleEdit = (rfq) => {
    setEditingRFQ(rfq);
    setFormData({ title: rfq.title, closingDate: rfq.closingDate, budget: rfq.budget, status: rfq.status });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rfqData = { ...formData, budget: parseFloat(formData.budget) };
    if (editingRFQ) {
      onEdit(editingRFQ.id, rfqData);
    } else {
      onAdd(rfqData);
    }
    setShowForm(false);
  };

  return (
    <Card className={styles.rfqCard}>
      <div className={styles.header}>
        <h3>RFQ Management</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ New RFQ</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingRFQ ? 'Edit RFQ' : 'New RFQ'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Title" name="title" value={formData.title} onChange={handleChange} required />
              <Input label="Closing Date" name="closingDate" type="date" value={formData.closingDate} onChange={handleChange} required />
              <Input label="Budget (R)" name="budget" type="number" step="0.01" value={formData.budget} onChange={handleChange} required />
              <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
                <option value="draft">Draft</option><option value="open">Open</option><option value="evaluating">Evaluating</option><option value="awarded">Awarded</option>
              </select>
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingRFQ ? 'Update' : 'Create'} RFQ</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <Input type="search" placeholder="Search RFQs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>RFQ #</th><th>Title</th><th>Issue Date</th><th>Closing</th><th>Budget</th><th>Suppliers</th><th>Responses</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredRFQs.map(r => (
              <tr key={r.id}>
                <td>{r.rfqNumber}</td><td>{r.title}</td><td>{r.issueDate}</td><td>{r.closingDate}</td><td>{formatCurrency(r.budget)}</td><td>{r.suppliers}</td><td>{r.responses}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(r.status)}`}>{r.status}</span></td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => handleEdit(r)}>✏️</button>
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

export default RFQManagement;
