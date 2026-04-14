import React from 'react';
import PaymentTracker from '../../components/sales/PaymentTracker';
import { usePayments } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';

const Payments = () => {
  const { payments, loading } = usePayments();
  if (loading) return <Loader />;
  return <PaymentTracker payments={payments} onRecord={() => console.log('Record payment')} />;
};

export default Payments;
