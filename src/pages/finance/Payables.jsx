import React from 'react';
import AccountsPayable from '../../components/finance/AccountsPayable';
import { useAccountsPayable } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Payables = () => {
  const { payables, loading, recordPayment } = useAccountsPayable();

  if (loading) return <Loader />;
  return <AccountsPayable payables={payables} onRecordPayment={recordPayment} />;
};

export default Payables;
