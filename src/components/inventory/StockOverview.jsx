import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './StockOverview.module.css';

const StockOverview = ({ items, onItemClick, onAddItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = [...new Set(items.map(i => i.category))];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      'in-stock': styles.statusInStock,
      'low-stock': styles.statusLowStock,
      'critical': styles.statusCritical,
      'out-of-stock': styles.statusOutOfStock
    };
    return badges[status] || styles.statusInStock;
  };

  const totalValue = filteredItems.reduce((sum, item) => sum + (item.quantity * 100), 0);
  const lowStockCount = items.filter(i => i.status === 'low-stock' || i.status === 'critical').length;

  return (
    <Card className={styles.overviewCard}>
      <div className={styles.header}>
        <h3>Stock Overview</h3>
        <Button variant="primary" size="small" onClick={onAddItem}>+ Add Item</Button>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Items</span>
          <span className={styles.statValue}>{items.length}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Low Stock</span>
          <span className={styles.statValue} style={{ color: '#f59e0b' }}>{lowStockCount}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Est. Value</span>
          <span className={styles.statValue}>R {totalValue.toLocaleString()}</span>
        </div>
      </div>

      <div className={styles.filters}>
        <Input
          type="search"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select 
          className={styles.filterSelect}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select 
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id} onClick={() => onItemClick(item)} className={styles.tableRow}>
                <td>
                  <div className={styles.itemCell}>
                    <span className={styles.itemName}>{item.name}</span>
                  </div>
                </td>
                <td>{item.sku}</td>
                <td>{item.category}</td>
                <td>
                  <span className={styles.quantity}>
                    {item.quantity} {item.unit}
                  </span>
                </td>
                <td>{item.location}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusBadge(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StockOverview;
