import React from 'react';
import GeneralLedger from '../../components/finance/GeneralLedger';
import { useGeneralLedger } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Ledger = () => {
  const { ledger, loading } = useGeneralLedger();

  const handleAddEntry = () => console.log('Add journal entry');

  if (loading) return <Loader />;
  return <GeneralLedger ledger={ledger} onAddEntry={handleAddEntry} />;
};

export default Ledger;
