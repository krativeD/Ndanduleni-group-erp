import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './ContractManagement.module.css';

const ContractManagement = ({ contracts, suppliers, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [formData, setFormData] = useState({ supplier: '', startDate: '', endDate: '', value: 0, type: 'Fixed', status: 'active', description: '' });

  const filteredContracts = contracts.filter(c => 
    c.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  const getStatusBadge = (status) => {
    const badges = { 'active': styles.statusActive, 'expired': styles.statusExpired, 'pending': styles.statusPending };
    return badges[status] || styles.statusActive;
  };

  const handleAdd = () => {
    setEditingContract(null);
    setFormData({ supplier: '', startDate: '', endDate: '', value: 0, type: 'Fixed', status: 'active', description: '' });
    setShowForm(true);
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setFormData({ ...contract });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contractData = { ...formData, value: parseFloat(formData.value) };
    if (editingContract) {
      onEdit(editingContract.id, contractData);
    } else {
      onAdd(contractData);
    }
    setShowForm(false);
  };

  return (
    <Card className={styles.contractCard}>
      <div className={styles.header}>
        <h3>Contract Management</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ New Contract</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingContract ? 'Edit Contract' : 'New Contract'}</h4>
            <form onSubmit={handleSubmit}>
              <select name="supplier" value={formData.supplier} onChange={handleChange} className={styles.select} required>
                <option value="">Select Supplier</option>
                {suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
              <Input label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />
              <Input label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />
              <Input label="Contract Value (R)" name="value" type="number" step="0.01" value={formData.value} onChange={handleChange} required />
              <select name="type" value={formData.type} onChange={handleChange} className={styles.select}>
                <option value="Fixed">Fixed</option><option value="Framework">Framework</option><option value="Spot">Spot</option>
              </select>
              <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
                <option value="active">Active</option><option value="pending">Pending</option><option value="expired">Expired</option>
              </select>
              <Input label="Description" name="description" value={formData.description} onChange={handleChange} />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingContract ? 'Update' : 'Create'} Contract</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <Input type="search" placeholder="Search contracts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr><th>Contract #</th><th>Supplier</th><th>Start</th><th>End</th><th>Value</th><th>Type</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredContracts.map(c => (
              <tr key={c.id}>
                <td>{c.contractNumber}</td><td>{c.supplier}</td><td>{c.startDate}</td><td>{c.endDate}</td><td>{formatCurrency(c.value)}</td><td>{c.type}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(c.status)}`}>{c.status}</span></td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => handleEdit(c)}>✏️</button>
                    <button className={styles.actionBtn} onClick={() => onDelete(c.id)}>🗑️</button>
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

export default ContractManagement;
