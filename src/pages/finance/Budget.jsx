import React from 'react';
import BudgetTracker from '../../components/finance/BudgetTracker';
import { useBudgets } from '../../hooks/useFinance';
import Loader from '../../components/common/Loader';

const Budget = () => {
  const { budgets, loading, addBudget, updateBudget, deleteBudget } = useBudgets();

  if (loading) return <Loader />;
  return (
    <BudgetTracker 
      budgets={budgets}
      onAddBudget={addBudget}
      onEditBudget={updateBudget}
      onDeleteBudget={deleteBudget}
    />
  );
};

export default Budget;
