import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './EquipmentTracker.module.css';

const EquipmentTracker = ({ equipment }) => {
  const getConditionBadge = (condition) => {
    const badges = {
      'excellent': styles.conditionExcellent,
      'good': styles.conditionGood,
      'fair': styles.conditionFair,
      'poor': styles.conditionPoor
    };
    return badges[condition] || styles.conditionGood;
  };

  const getStatusBadge = (status) => {
    const badges = {
      'available': styles.statusAvailable,
      'in-use': styles.statusInUse,
      'needs-service': styles.statusService
    };
    return badges[status] || styles.statusAvailable;
  };

  return (
    <Card className={styles.equipmentCard}>
      <div className={styles.header}>
        <h3>Equipment Tracker</h3>
        <Button variant="primary" size="small">+ Add Equipment</Button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Serial #</th>
              <th>Condition</th>
              <th>Assigned To</th>
              <th>Next Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map(eq => (
              <tr key={eq.id}>
                <td>{eq.name}</td>
                <td>{eq.serial}</td>
                <td>
                  <span className={`${styles.conditionBadge} ${getConditionBadge(eq.condition)}`}>
                    {eq.condition}
                  </span>
                </td>
                <td>{eq.assigned_to || '—'}</td>
                <td>{eq.next_service}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusBadge(eq.status)}`}>
                    {eq.status}
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

export default EquipmentTracker;
