import React from 'react';
import Layout from '../../components/common/Layout';
import PaymentTracker from '../../components/sales/PaymentTracker';
import { usePayments } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Payments = () => {
  const { payments, loading } = usePayments();
  if (loading) return <Layout><Loader /></Layout>;
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Payments</h1></div>
        <PaymentTracker payments={payments} onRecord={() => console.log('Record payment')} />
      </div>
    </Layout>
  );
};

export default Payments;
