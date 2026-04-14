import React from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useStockTakeHistory } from '../../hooks/useInventory';
import Loader from '../../components/common/Loader';
import styles from './InventoryStyles.module.css';

const StockTake = () => {
  const { history, loading, error } = useStockTakeHistory();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Stock Take</h1>
          <Button variant="primary">+ New Stock Take</Button>
        </div>

        <Card className={styles.stockTakeCard}>
          <h3>Stock Take History</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Warehouse</th>
                  <th>Items Counted</th>
                  <th>Discrepancies</th>
                  <th>Status</th>
                  <th>Conducted By</th>
                </tr>
              </thead>
              <tbody>
                {history.map(item => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.warehouse}</td>
                    <td>{item.items}</td>
                    <td style={{ color: item.discrepancies > 0 ? '#ef4444' : '#10b981' }}>
                      {item.discrepancies}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.conductedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default StockTake;
