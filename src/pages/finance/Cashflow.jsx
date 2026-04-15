import React from 'react';
import CashManagement from '../../components/finance/CashManagement';
import { useCashflow } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Cashflow = () => {
  const { cashflow, loading } = useCashflow();

  if (loading) return <Loader />;
  return <CashManagement cashflow={cashflow} />;
};

export default Cashflow;
