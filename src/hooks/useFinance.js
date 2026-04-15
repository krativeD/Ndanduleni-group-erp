import { useState, useEffect } from 'react';
import { 
  financeData,
  syncPaymentToCashflow,
  syncReceiptToCashflow,
  syncPayableToLedger,
  syncReceivableToLedger,
  getMockChartOfAccounts
} from '../lib/financeService';

export const useChartOfAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setAccounts(getMockChartOfAccounts());
    setLoading(false);
  }, []);

  return { accounts, loading };
};

export const useGeneralLedger = () => {
  const [ledger, setLedger] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshLedger = () => {
    setLedger([...financeData.ledger]);
  };

  useEffect(() => {
    setLoading(true);
    refreshLedger();
    setLoading(false);
  }, []);

  const addEntry = (entry) => {
    const newEntry = { 
      ...entry, 
      id: Math.max(...financeData.ledger.map(l => l.id), 0) + 1,
      balance: 0
    };
    financeData.ledger = [newEntry, ...financeData.ledger];
    refreshLedger();
  };

  const updateEntry = (id, updates) => {
    financeData.ledger = financeData.ledger.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    );
    refreshLedger();
  };

  const deleteEntry = (id) => {
    financeData.ledger = financeData.ledger.filter(entry => entry.id !== id);
    refreshLedger();
  };

  return { ledger, loading, addEntry, updateEntry, deleteEntry };
};

export const useAccountsPayable = () => {
  const [payables, setPayables] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshPayables = () => {
    setPayables([...financeData.payables]);
  };

  useEffect(() => {
    setLoading(true);
    refreshPayables();
    setLoading(false);
  }, []);

  const addPayable = (payable) => {
    const newPayable = {
      ...payable,
      id: Math.max(...financeData.payables.map(p => p.id), 0) + 1,
      paid: 0,
      balance: payable.amount,
      status: 'pending'
    };
    financeData.payables = [...financeData.payables, newPayable];
    syncPayableToLedger(newPayable);
    refreshPayables();
  };

  const updatePayable = (id, updates) => {
    financeData.payables = financeData.payables.map(p => 
      p.id === id ? { ...p, ...updates } : p
    );
    refreshPayables();
  };

  const deletePayable = (id) => {
    financeData.payables = financeData.payables.filter(p => p.id !== id);
    refreshPayables();
  };

  const recordPayment = (id, amount) => {
    let updatedPayable = null;
    financeData.payables = financeData.payables.map(p => {
      if (p.id === id) {
        const newPaid = p.paid + amount;
        const newBalance = p.amount - newPaid;
        updatedPayable = { 
          ...p, 
          paid: newPaid, 
          balance: newBalance, 
          status: newBalance === 0 ? 'paid' : 'partial' 
        };
        return updatedPayable;
      }
      return p;
    });
    
    if (updatedPayable) {
      syncPaymentToCashflow({ ...updatedPayable, amount });
    }
    
    refreshPayables();
  };

  return { payables, loading, addPayable, updatePayable, deletePayable, recordPayment };
};

export const useAccountsReceivable = () => {
  const [receivables, setReceivables] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshReceivables = () => {
    setReceivables([...financeData.receivables]);
  };

  useEffect(() => {
    setLoading(true);
    refreshReceivables();
    setLoading(false);
  }, []);

  const addReceivable = (receivable) => {
    const newReceivable = {
      ...receivable,
      id: Math.max(...financeData.receivables.map(r => r.id), 0) + 1,
      paid: 0,
      balance: receivable.amount,
      status: 'pending'
    };
    financeData.receivables = [...financeData.receivables, newReceivable];
    syncReceivableToLedger(newReceivable);
    refreshReceivables();
  };

  const updateReceivable = (id, updates) => {
    financeData.receivables = financeData.receivables.map(r => 
      r.id === id ? { ...r, ...updates } : r
    );
    refreshReceivables();
  };

  const deleteReceivable = (id) => {
    financeData.receivables = financeData.receivables.filter(r => r.id !== id);
    refreshReceivables();
  };

  const recordReceipt = (id, amount) => {
    let updatedReceivable = null;
    financeData.receivables = financeData.receivables.map(r => {
      if (r.id === id) {
        const newPaid = r.paid + amount;
        const newBalance = r.amount - newPaid;
        updatedReceivable = { 
          ...r, 
          paid: newPaid, 
          balance: newBalance, 
          status: newBalance === 0 ? 'paid' : 'partial' 
        };
        return updatedReceivable;
      }
      return r;
    });
    
    if (updatedReceivable) {
      syncReceiptToCashflow({ ...updatedReceivable, amount });
    }
    
    refreshReceivables();
  };

  return { receivables, loading, addReceivable, updateReceivable, deleteReceivable, recordReceipt };
};

export const useCashflow = () => {
  const [cashflow, setCashflow] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshCashflow = () => {
    setCashflow([...financeData.cashflow]);
  };

  useEffect(() => {
    setLoading(true);
    refreshCashflow();
    setLoading(false);
    
    const handleStorageChange = () => {
      refreshCashflow();
    };
    window.addEventListener('financeDataUpdated', handleStorageChange);
    return () => window.removeEventListener('financeDataUpdated', handleStorageChange);
  }, []);

  const addTransaction = (transaction) => {
    const lastBalance = financeData.cashflow.length > 0 
      ? financeData.cashflow[financeData.cashflow.length - 1].balance 
      : 0;
    const newBalance = transaction.type === 'inflow' 
      ? lastBalance + transaction.amount 
      : lastBalance - transaction.amount;
    
    const newTransaction = {
      ...transaction,
      id: Math.max(...financeData.cashflow.map(c => c.id), 0) + 1,
      balance: newBalance,
      date: new Date().toISOString().split('T')[0]
    };
    financeData.cashflow = [...financeData.cashflow, newTransaction];
    refreshCashflow();
    window.dispatchEvent(new Event('financeDataUpdated'));
  };

  const deleteTransaction = (id) => {
    financeData.cashflow = financeData.cashflow.filter(t => t.id !== id);
    refreshCashflow();
    window.dispatchEvent(new Event('financeDataUpdated'));
  };

  return { cashflow, loading, addTransaction, deleteTransaction, refreshCashflow };
};

export const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshBudgets = () => {
    setBudgets([...financeData.budgets]);
  };

  useEffect(() => {
    setLoading(true);
    refreshBudgets();
    setLoading(false);
    
    const handleStorageChange = () => {
      refreshBudgets();
    };
    window.addEventListener('financeDataUpdated', handleStorageChange);
    return () => window.removeEventListener('financeDataUpdated', handleStorageChange);
  }, []);

  const addBudget = (budget) => {
    const newBudget = {
      ...budget,
      id: Math.max(...financeData.budgets.map(b => b.id), 0) + 1,
      actual: 0,
      variance: budget.budgeted
    };
    financeData.budgets = [...financeData.budgets, newBudget];
    refreshBudgets();
  };

  const updateBudget = (id, updates) => {
    financeData.budgets = financeData.budgets.map(b => {
      if (b.id === id) {
        const updated = { ...b, ...updates };
        updated.variance = updated.budgeted - updated.actual;
        return updated;
      }
      return b;
    });
    refreshBudgets();
  };

  const deleteBudget = (id) => {
    financeData.budgets = financeData.budgets.filter(b => b.id !== id);
    refreshBudgets();
  };

  return { budgets, loading, addBudget, updateBudget, deleteBudget, refreshBudgets };
};

export const useFinancialReports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshReports = () => {
    const totalRevenue = financeData.receivables.reduce((sum, r) => sum + r.amount, 0);
    const totalExpenses = financeData.payables.reduce((sum, p) => sum + p.amount, 0) + 245000 + 30000;
    const cashBalance = financeData.cashflow.length > 0 
      ? financeData.cashflow[financeData.cashflow.length - 1].balance 
      : 0;
    const arBalance = financeData.receivables.reduce((sum, r) => sum + r.balance, 0);
    const apBalance = financeData.payables.reduce((sum, p) => sum + p.balance, 0);
    
    const generatedReports = {
      incomeStatement: {
        revenue: { 'Service Revenue': totalRevenue, 'Total Revenue': totalRevenue },
        expenses: { 'Salaries & Wages': 245000.00, 'Rent': 30000.00, 'Supplies': financeData.payables.reduce((sum, p) => sum + p.amount, 0), 'Total Expenses': totalExpenses },
        netIncome: totalRevenue - totalExpenses
      },
      balanceSheet: {
        assets: { 'Cash': cashBalance, 'Accounts Receivable': arBalance, 'Total Assets': cashBalance + arBalance },
        liabilities: { 'Accounts Payable': apBalance, 'Total Liabilities': apBalance },
        equity: { 'Retained Earnings': (cashBalance + arBalance) - apBalance, 'Total Equity': (cashBalance + arBalance) - apBalance }
      }
    };
    setReports(generatedReports);
  };

  useEffect(() => {
    setLoading(true);
    refreshReports();
    setLoading(false);
    
    const handleStorageChange = () => {
      refreshReports();
    };
    window.addEventListener('financeDataUpdated', handleStorageChange);
    return () => window.removeEventListener('financeDataUpdated', handleStorageChange);
  }, []);

  return { reports, loading, refreshReports };
};
