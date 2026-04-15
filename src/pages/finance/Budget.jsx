import React from 'react';
import BudgetTracker from '../../components/finance/BudgetTracker';
import { useBudgets } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Budget = () => {
  const { budgets, loading } = useBudgets();

  if (loading) return <Loader />;
  return <BudgetTracker budgets={budgets} />;
};

export default Budget;
