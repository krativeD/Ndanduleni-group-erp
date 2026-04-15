import React from 'react';
import AccountsPayable from '../../components/finance/AccountsPayable';
import { useAccountsPayable } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Payables = () => {
  const { payables, loading, addPayable, updatePayable, deletePayable, recordPayment } = useAccountsPayable();

  if (loading) return <Loader />;
  return (
    <AccountsPayable 
      payables={payables} 
      onRecordPayment={recordPayment}
      onAddPayable={addPayable}
      onEditPayable={updatePayable}
      onDeletePayable={deletePayable}
    />
  );
};

export default Payables;
