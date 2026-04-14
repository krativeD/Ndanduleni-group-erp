import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './LowStockAlerts.module.css';

const LowStockAlerts = ({ items, onOrder }) => {
  const lowStockItems = items.filter(item => 
    item.status === 'low-stock' || item.status === 'critical'
  );

  const getAlertLevel = (status) => {
    return status === 'critical' ? styles.critical : styles.low;
  };

  return (
    <Card className={styles.alertsCard}>
      <div className={styles.header}>
        <h3>⚠️ Low Stock Alerts</h3>
        <span className={styles.count}>{lowStockItems.length} items</span>
      </div>

      {lowStockItems.length === 0 ? (
        <div className={styles.noAlerts}>
          <span>✅ All stock levels are good</span>
        </div>
      ) : (
        <div className={styles.alertList}>
          {lowStockItems.map(item => (
            <div key={item.id} className={`${styles.alertItem} ${getAlertLevel(item.status)}`}>
              <div className={styles.alertInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemSku}>{item.sku}</span>
              </div>
              <div className={styles.alertStats}>
                <span className={styles.quantity}>
                  {item.quantity} / {item.minStock} {item.unit}
                </span>
                <span className={styles.percentage}>
                  {Math.round((item.quantity / item.minStock) * 100)}%
                </span>
              </div>
              <Button 
                variant="primary" 
                size="small"
                onClick={() => onOrder(item)}
              >
                Order Now
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default LowStockAlerts;
