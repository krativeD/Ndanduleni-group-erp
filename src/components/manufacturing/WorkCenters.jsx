import React from 'react';
import Card from '../common/Card';
import styles from './WorkCenters.module.css';

const WorkCenters = ({ workCenters }) => {
  const getStatusBadge = (status) => {
    const badges = {
      'active': styles.statusActive,
      'maintenance': styles.statusMaintenance,
      'idle': styles.statusIdle
    };
    return badges[status] || styles.statusIdle;
  };

  return (
    <Card className={styles.workCenterCard}>
      <div className={styles.header}>
        <h3>Work Centers</h3>
      </div>

      <div className={styles.workCenterGrid}>
        {workCenters.map(wc => (
          <div key={wc.id} className={styles.workCenterItem}>
            <div className={styles.workCenterHeader}>
              <span className={styles.workCenterName}>{wc.name}</span>
              <span className={`${styles.statusBadge} ${getStatusBadge(wc.status)}`}>{wc.status}</span>
            </div>
            <div className={styles.workCenterDetails}>
              <div className={styles.detailRow}>
                <span>Type:</span>
                <span>{wc.type}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Capacity:</span>
                <span>{wc.capacity} units/day</span>
              </div>
              <div className={styles.detailRow}>
                <span>Efficiency:</span>
                <span>{wc.efficiency}%</span>
              </div>
              <div className={styles.detailRow}>
                <span>Current Load:</span>
                <div className={styles.loadBar}>
                  <div className={styles.loadFill} style={{ width: `${wc.currentLoad}%` }}></div>
                </div>
                <span>{wc.currentLoad}%</span>
              </div>
              <div className={styles.detailRow}>
                <span>Operator:</span>
                <span>{wc.operator || 'Unassigned'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WorkCenters;
