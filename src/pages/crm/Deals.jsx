import React from 'react';
import Layout from '../../components/common/Layout';
import DealCard from '../../components/crm/DealCard';
import Button from '../../components/common/Button';
import { useDeals } from '../../hooks/useCRM';
import Loader from '../../components/common/Loader';
import styles from './CRMStyles.module.css';

const Deals = () => {
  const { deals, loading, error } = useDeals();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Deals</h1>
          <Button variant="primary">+ New Deal</Button>
        </div>

        <div className={styles.dealsGrid}>
          <DealCard deals={deals} />
        </div>
      </div>
    </Layout>
  );
};

export default Deals;
