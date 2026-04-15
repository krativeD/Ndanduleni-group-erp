import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './InventoryReport.module.css';

const InventoryReport = ({ data, onExport, onPrint }) => {
  if (!data) return null;

  const formatCurrency = (amount) => `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;

  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportHeader}>
        <h2>Inventory Analytics Report</h2>
        <div className={styles.headerActions}>
          <Button variant="primary" size="small" onClick={onPrint}>🖨️ Print</Button>
          <Button variant="success" size="small" onClick={onExport}>📄 Export</Button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <Card className={styles.kpiCard}><span>Total Items</span><h3>{data.totalItems}</h3></Card>
        <Card className={styles.kpiCard}><span>Total Value</span><h3>{formatCurrency(data.totalValue)}</h3></Card>
        <Card className={styles.kpiCard}><span>Low Stock</span><h3 style={{ color: '#ef4444' }}>{data.lowStockItems}</h3></Card>
        <Card className={styles.kpiCard}><span>Turnover Rate</span><h3>{data.turnoverRate}x</h3></Card>
      </div>

      <div className={styles.twoColumn}>
        <Card className={styles.listCard}>
          <h3>Top Moving Items</h3>
          {data.topMoving.map((item, idx) => (
            <div key={idx} className={styles.listItem}>
              <span>{item.name}</span>
              <span>Sold: {item.sold} | Stock: {item.stock}</span>
            </div>
          ))}
        </Card>

        <Card className={styles.listCard}>
          <h3>Slow Moving Items</h3>
          {data.slowMoving.map((item, idx) => (
            <div key={idx} className={styles.listItem}>
              <span>{item.name}</span>
              <span>{item.daysInStock} days in stock</span>
            </div>
          ))}
        </Card>
      </div>

      <Card className={styles.categoryCard}>
        <h3>Stock by Category</h3>
        {data.stockByCategory.map((cat, idx) => (
          <div key={idx} className={styles.categoryItem}>
            <span>{cat.category}</span>
            <span>{cat.items} items</span>
            <span>{formatCurrency(cat.value)}</span>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default InventoryReport;
