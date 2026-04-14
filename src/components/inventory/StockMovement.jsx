import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './StockMovement.module.css';

const StockMovement = ({ movements, onNewMovement }) => {
  const getTypeBadge = (type) => {
    return type === 'in' ? styles.typeIn : styles.typeOut;
  };

  return (
    <Card className={styles.movementCard}>
      <div className={styles.header}>
        <h3>Recent Stock Movements</h3>
        <Button variant="primary" size="small" onClick={onNewMovement}>+ Record Movement</Button>
      </div>

      <div className={styles.movementList}>
        {movements.slice(0, 8).map(movement => (
          <div key={movement.id} className={styles.movementItem}>
            <div className={styles.movementIcon}>
              {movement.type === 'in' ? '📥' : '📤'}
            </div>
            <div className={styles.movementInfo}>
              <div className={styles.movementHeader}>
                <span className={styles.itemName}>{movement.item}</span>
                <span className={`${styles.typeBadge} ${getTypeBadge(movement.type)}`}>
                  {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                </span>
              </div>
              <div className={styles.movementMeta}>
                <span>{movement.reference}</span>
                <span>👤 {movement.user}</span>
              </div>
            </div>
            <div className={styles.movementDate}>
              {movement.date}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StockMovement;
