import React from 'react';
import Layout from '../../components/common/Layout';
import InvoiceList from '../../components/sales/InvoiceList';
import { useInvoices } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Invoices = () => {
  const { invoices, loading } = useInvoices();
  if (loading) return <Layout><Loader /></Layout>;
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Invoices</h1></div>
        <InvoiceList invoices={invoices} onGenerate={() => console.log('Generate invoice')} />
      </div>
    </Layout>
  );
};

export default Invoices;
