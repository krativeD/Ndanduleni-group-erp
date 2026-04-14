import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './SupplierList.module.css';

const SupplierList = ({ suppliers, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    return status === 'active' ? styles.statusActive : styles.statusInactive;
  };

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <Card className={styles.supplierCard}>
      <div className={styles.header}>
        <h3>Suppliers</h3>
        <Button variant="primary" size="small" onClick={onAdd}>+ Add Supplier</Button>
      </div>

      <div className={styles.filters}>
        <Input
          type="search"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.supplierGrid}>
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className={styles.supplierItem}>
            <div className={styles.supplierHeader}>
              <div>
                <span className={styles.supplierName}>{supplier.name}</span>
                <span className={styles.supplierCategory}>{supplier.category}</span>
              </div>
              <span className={`${styles.statusBadge} ${getStatusBadge(supplier.status)}`}>
                {supplier.status}
              </span>
            </div>

            <div className={styles.supplierDetails}>
              <div className={styles.contact}>
                <span>👤 {supplier.contact}</span>
                <span>📧 {supplier.email}</span>
                <span>📞 {supplier.phone}</span>
              </div>
              <div className={styles.address}>{supplier.address}</div>
              <div className={styles.terms}>
                <span>Payment: {supplier.paymentTerms}</span>
                <span className={styles.rating}>{renderStars(supplier.rating)}</span>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={() => onEdit(supplier)}>✏️</button>
              <button className={styles.actionBtn} onClick={() => onDelete(supplier.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SupplierList;
