import React from 'react';
import GeneralLedger from '../../components/finance/GeneralLedger';
import { useGeneralLedger } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Ledger = () => {
  const { ledger, loading, addEntry, updateEntry, deleteEntry } = useGeneralLedger();

  if (loading) return <Loader />;
  return (
    <GeneralLedger 
      ledger={ledger} 
      onAddEntry={addEntry}
      onEditEntry={updateEntry}
      onDeleteEntry={deleteEntry}
    />
  );
};

export default Ledger;
