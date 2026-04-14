import React from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useQuotations } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Quotations = () => {
  const { quotations, loading } = useQuotations();

  const getStatusBadge = (status) => {
    const badges = { 'draft': styles.statusDraft, 'sent': styles.statusSent, 'accepted': styles.statusAccepted, 'rejected': styles.statusRejected };
    return badges[status] || styles.statusDraft;
  };

  if (loading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Quotations</h1>
          <Button variant="primary">+ New Quotation</Button>
        </div>
        <Card className={styles.quoteCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead><tr><th>Quote #</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Valid Until</th><th>Status</th></tr></thead>
              <tbody>
                {quotations.map(q => (
                  <tr key={q.id}>
                    <td>{q.quoteNumber}</td><td>{q.customer}</td><td>{q.date}</td><td>{q.items}</td><td>R {q.total.toLocaleString()}</td><td>{q.validUntil}</td>
                    <td><span className={`${styles.statusBadge} ${getStatusBadge(q.status)}`}>{q.status}</span></td>
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

export default Quotations;
