import React from 'react';
import Card from '../../components/common/Card';
import { useCommissions } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Commissions = () => {
  const { commissions, loading } = useCommissions();

  const getStatusBadge = (status) => {
    return status === 'paid' ? styles.statusPaid : styles.statusPending;
  };

  const totalCommissions = commissions.reduce((sum, c) => sum + c.commission, 0);

  if (loading) return <Loader />;

  return (
    <>
      <div className={styles.commissionSummary}>
        <Card className={styles.summaryCard}><span>Total Commissions (April)</span><h2>R {totalCommissions.toLocaleString()}</h2></Card>
      </div>
      <Card className={styles.commissionCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead><tr><th>Salesperson</th><th>Orders</th><th>Total Sales</th><th>Rate</th><th>Commission</th><th>Status</th></tr></thead>
            <tbody>
              {commissions.map(c => (
                <tr key={c.id}>
                  <td>{c.salesperson}</td><td>{c.orders}</td><td>R {c.totalSales.toLocaleString()}</td><td>{c.commissionRate}%</td><td>R {c.commission.toLocaleString()}</td>
                  <td><span className={`${styles.statusBadge} ${getStatusBadge(c.status)}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
};

export default Commissions;
