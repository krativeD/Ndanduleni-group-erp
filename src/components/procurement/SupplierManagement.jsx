import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './SupplierManagement.module.css';

const SupplierManagement = ({ suppliers, onAdd, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '', contact: '', email: '', phone: '', address: '', category: 'Chemicals', paymentTerms: 'Net 30', status: 'active', rating: 0
  });

  const categories = [...new Set(suppliers.map(s => s.category))];

  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const renderStars = (rating) => '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));

  const handleAdd = () => {
    setEditingSupplier(null);
    setFormData({ name: '', contact: '', email: '', phone: '', address: '', category: 'Chemicals', paymentTerms: 'Net 30', status: 'active', rating: 0 });
    setShowForm(true);
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({ ...supplier });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSupplier) {
      onEdit(editingSupplier.id, { ...formData, rating: parseFloat(formData.rating) || 0 });
    } else {
      onAdd({ ...formData, rating: parseFloat(formData.rating) || 0 });
    }
    setShowForm(false);
  };

  return (
    <Card className={styles.supplierCard}>
      <div className={styles.header}>
        <h3>Supplier Management</h3>
        <Button variant="primary" size="small" onClick={handleAdd}>+ Add Supplier</Button>
      </div>

      {showForm && (
        <div className={styles.formOverlay}>
          <Card className={styles.formCard}>
            <h4>{editingSupplier ? 'Edit Supplier' : 'New Supplier'}</h4>
            <form onSubmit={handleSubmit}>
              <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} required />
              <Input label="Contact Person" name="contact" value={formData.contact} onChange={handleChange} required />
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
              <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
              <select name="category" value={formData.category} onChange={handleChange} className={styles.select}>
                <option>Chemicals</option><option>Supplies</option><option>Equipment</option><option>All</option>
              </select>
              <select name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} className={styles.select}>
                <option>Net 15</option><option>Net 30</option><option>Net 45</option><option>Net 60</option>
              </select>
              <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
                <option value="active">Active</option><option value="inactive">Inactive</option>
              </select>
              <Input label="Rating (0-5)" name="rating" type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={handleChange} />
              <div className={styles.formActions}>
                <Button type="button" variant="default" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingSupplier ? 'Update' : 'Add'} Supplier</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div className={styles.filters}>
        <Input type="search" placeholder="Search suppliers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
        <select className={styles.filterSelect} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
        </select>
      </div>

      <div className={styles.supplierGrid}>
        {filteredSuppliers.map(s => (
          <div key={s.id} className={styles.supplierItem}>
            <div className={styles.supplierHeader}>
              <span className={styles.supplierName}>{s.name}</span>
              <span className={`${styles.statusBadge} ${s.status === 'active' ? styles.active : styles.inactive}`}>{s.status}</span>
            </div>
            <div className={styles.supplierDetails}>
              <p>👤 {s.contact}</p>
              <p>📧 {s.email}</p>
              <p>📞 {s.phone}</p>
              <p>📍 {s.address}</p>
              <p>🏷️ {s.category} | 💰 {s.paymentTerms}</p>
              <p className={styles.rating}>{renderStars(s.rating)}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={() => handleEdit(s)}>✏️</button>
              <button className={styles.actionBtn} onClick={() => onDelete(s.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SupplierManagement;
