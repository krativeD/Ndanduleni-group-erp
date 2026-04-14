import React from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import { useQualityChecks } from '../../hooks/useManufacturing';
import Loader from '../../components/common/Loader';
import styles from './ManufacturingStyles.module.css';

const Quality = () => {
  const { checks, loading, error } = useQualityChecks();

  const getStatusBadge = (status) => {
    const badges = {
      'approved': styles.statusApproved,
      'pending': styles.statusPending,
      'rejected': styles.statusRejected
    };
    return badges[status] || styles.statusPending;
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Quality Control</h1></div>
        <Card className={styles.qualityCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr><th>Order</th><th>Product</th><th>Batch</th><th>pH</th><th>Viscosity</th><th>Appearance</th><th>Status</th></tr>
              </thead>
              <tbody>
                {checks.map(check => (
                  <tr key={check.id}>
                    <td>{check.productionOrder}</td>
                    <td>{check.product}</td>
                    <td>{check.batch}</td>
                    <td>{check.phLevel}</td>
                    <td>{check.viscosity}</td>
                    <td>{check.appearance}</td>
                    <td><span className={`${styles.statusBadge} ${getStatusBadge(check.status)}`}>{check.status}</span></td>
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

export default Quality;
