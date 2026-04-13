import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './ChemicalInventory.module.css';

const ChemicalInventory = ({ chemicals }) => {
  const getStockStatus = (item) => {
    if (item.status === 'critical' || item.quantity < item.min_stock) {
      return styles.stockCritical;
    }
    if (item.status === 'low' || item.quantity <= item.min_stock * 1.2) {
      return styles.stockLow;
    }
    return styles.stockGood;
  };

  return (
    <Card className={styles.chemicalCard}>
      <div className={styles.header}>
        <h3>Chemical Inventory</h3>
        <Button variant="primary" size="small">+ Add Chemical</Button>
      </div>

      <div className={styles.chemicalGrid}>
        {chemicals.map(chem => (
          <div key={chem.id} className={styles.chemicalItem}>
            <div className={styles.chemicalHeader}>
              <span className={styles.chemicalName}>{chem.name}</span>
              <span className={styles.chemicalType}>{chem.type}</span>
            </div>
            
            <div className={styles.chemicalDetails}>
              <div className={styles.quantity}>
                <span className={styles.quantityValue}>{chem.quantity}</span>
                <span className={styles.quantityUnit}>{chem.unit}</span>
              </div>
              <div className={`${styles.stockIndicator} ${getStockStatus(chem)}`}>
                {chem.quantity <= chem.min_stock ? '⚠️ Low Stock' : '✓ In Stock'}
              </div>
            </div>

            <div className={styles.chemicalMeta}>
              <span>📍 {chem.location}</span>
              <span>Min: {chem.min_stock} {chem.unit}</span>
            </div>

            <div className={styles.supplier}>
              <span>🏢 {chem.supplier}</span>
              <span className={styles.lastOrdered}>
                Last order: {chem.last_ordered}
              </span>
            </div>

            <Button variant="default" size="small" className={styles.orderBtn}>
              Order More
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ChemicalInventory;
