import React from 'react';
import AccountsReceivable from '../../components/finance/AccountsReceivable';
import { useAccountsReceivable } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Receivables = () => {
  const { receivables, loading, addReceivable, updateReceivable, deleteReceivable, recordReceipt } = useAccountsReceivable();

  const handleAdd = () => console.log('Add receivable');

  if (loading) return <Loader />;
  return (
    <AccountsReceivable 
      receivables={receivables} 
      onRecordReceipt={recordReceipt}
      onAddReceivable={handleAdd}
    />
  );
};

export default Receivables;
