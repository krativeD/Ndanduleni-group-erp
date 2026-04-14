import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './ProductCatalog.module.css';

const ProductCatalog = ({ products, onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || product.type === filterType;
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const badges = {
      'active': styles.statusActive,
      'low-stock': styles.statusLowStock,
      'inactive': styles.statusInactive
    };
    return badges[status] || styles.statusActive;
  };

  const getTypeBadge = (type) => {
    return type === 'finished' ? styles.typeFinished : styles.typeRaw;
  };

  return (
    <Card className={styles.catalogCard}>
      <div className={styles.header}>
        <h3>Product Catalog</h3>
        <Button variant="primary" size="small" onClick={onAdd}>+ Add Product</Button>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Products</span>
          <span className={styles.statValue}>{products.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Finished Goods</span>
          <span className={styles.statValue}>{products.filter(p => p.type === 'finished').length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Raw Materials</span>
          <span className={styles.statValue}>{products.filter(p => p.type === 'raw').length}</span>
        </div>
      </div>

      <div className={styles.filters}>
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select className={styles.filterSelect} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="finished">Finished Goods</option>
          <option value="raw">Raw Materials</option>
        </select>
        <select className={styles.filterSelect} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <span className={styles.productName}>{product.name}</span>
                </td>
                <td>{product.sku}</td>
                <td><span className={`${styles.typeBadge} ${getTypeBadge(product.type)}`}>{product.type}</span></td>
                <td>R {product.cost?.toFixed(2) || '-'}</td>
                <td>R {product.price?.toFixed(2) || '-'}</td>
                <td>{product.stock} {product.unit}</td>
                <td><span className={`${styles.statusBadge} ${getStatusBadge(product.status)}`}>{product.status}</span></td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} onClick={() => onEdit(product)}>✏️</button>
                    <button className={styles.actionBtn} onClick={() => onDelete(product.id)}>🗑️</button>
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

export default ProductCatalog;
