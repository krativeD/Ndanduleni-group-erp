import React from 'react';
import InvoiceList from '../../components/sales/InvoiceList';
import { useInvoices } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Invoices = () => {
  const { invoices, loading } = useInvoices();
  if (loading) return <Loader />;
  return <InvoiceList invoices={invoices} onGenerate={() => console.log('Generate invoice')} />;
};

export default Invoices;
