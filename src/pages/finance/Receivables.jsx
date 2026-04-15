import React from 'react';
import AccountsReceivable from '../../components/finance/AccountsReceivable';
import { useAccountsReceivable } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Receivables = () => {
  const { receivables, loading, recordReceipt } = useAccountsReceivable();

  if (loading) return <Loader />;
  return <AccountsReceivable receivables={receivables} onRecordReceipt={recordReceipt} />;
};

export default Receivables;
