import { useState, useEffect } from 'react';
import { 
  getMockChartOfAccounts, 
  getMockGeneralLedger, 
  getMockAccountsPayable, 
  getMockAccountsReceivable,
  getMockCashflow,
  getMockBudgets,
  getMockFinancialReports
} from '../lib/financeService';

let globalLedger = null;
let globalPayables = null;
let globalReceivables = null;
let globalCashflow = null;

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

  useEffect(() => {
    setLoading(true);
    if (globalLedger) {
      setLedger(globalLedger);
    } else {
      const data = getMockGeneralLedger();
      globalLedger = data;
      setLedger(data);
    }
    setLoading(false);
  }, []);

  const addEntry = (entry) => {
    const runningBalance = ledger.length > 0 ? ledger[0].balance : 0;
    const newBalance = runningBalance + (entry.debit || 0) - (entry.credit || 0);
    const newEntry = { 
      ...entry, 
      id: Math.max(...ledger.map(l => l.id), 0) + 1,
      balance: newBalance
    };
    const updated = [newEntry, ...ledger];
    globalLedger = updated;
    setLedger(updated);
  };

  const updateEntry = (id, updates) => {
    const updated = ledger.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    );
    globalLedger = updated;
    setLedger(updated);
  };

  const deleteEntry = (id) => {
    const updated = ledger.filter(entry => entry.id !== id);
    globalLedger = updated;
    setLedger(updated);
  };

  return { ledger, loading, addEntry, updateEntry, deleteEntry };
};

export const useAccountsPayable = () => {
  const [payables, setPayables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (globalPayables) {
      setPayables(globalPayables);
    } else {
      const data = getMockAccountsPayable();
      globalPayables = data;
      setPayables(data);
    }
    setLoading(false);
  }, []);

  const addPayable = (payable) => {
    const newPayable = {
      ...payable,
      id: Math.max(...payables.map(p => p.id), 0) + 1,
      paid: 0,
      balance: payable.amount,
      status: 'pending'
    };
    const updated = [...payables, newPayable];
    globalPayables = updated;
    setPayables(updated);
  };

  const updatePayable = (id, updates) => {
    const updated = payables.map(p => p.id === id ? { ...p, ...updates } : p);
    globalPayables = updated;
    setPayables(updated);
  };

  const deletePayable = (id) => {
    const updated = payables.filter(p => p.id !== id);
    globalPayables = updated;
    setPayables(updated);
  };

  const recordPayment = (id, amount) => {
    setPayables(prev => prev.map(p => {
      if (p.id === id) {
        const newPaid = p.paid + amount;
        const newBalance = p.amount - newPaid;
        return { 
          ...p, 
          paid: newPaid, 
          balance: newBalance, 
          status: newBalance === 0 ? 'paid' : 'partial' 
        };
      }
      return p;
    }));
  };

  return { payables, loading, addPayable, updatePayable, deletePayable, recordPayment };
};

export const useAccountsReceivable = () => {
  const [receivables, setReceivables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (globalReceivables) {
      setReceivables(globalReceivables);
    } else {
      const data = getMockAccountsReceivable();
      globalReceivables = data;
      setReceivables(data);
    }
    setLoading(false);
  }, []);

  const addReceivable = (receivable) => {
    const newReceivable = {
      ...receivable,
      id: Math.max(...receivables.map(r => r.id), 0) + 1,
      paid: 0,
      balance: receivable.amount,
      status: 'pending'
    };
    const updated = [...receivables, newReceivable];
    globalReceivables = updated;
    setReceivables(updated);
  };

  const updateReceivable = (id, updates) => {
    const updated = receivables.map(r => r.id === id ? { ...r, ...updates } : r);
    globalReceivables = updated;
    setReceivables(updated);
  };

  const deleteReceivable = (id) => {
    const updated = receivables.filter(r => r.id !== id);
    globalReceivables = updated;
    setReceivables(updated);
  };

  const recordReceipt = (id, amount) => {
    setReceivables(prev => prev.map(r => {
      if (r.id === id) {
        const newPaid = r.paid + amount;
        const newBalance = r.amount - newPaid;
        return { 
          ...r, 
          paid: newPaid, 
          balance: newBalance, 
          status: newBalance === 0 ? 'paid' : 'partial' 
        };
      }
      return r;
    }));
  };

  return { receivables, loading, addReceivable, updateReceivable, deleteReceivable, recordReceipt };
};

export const useCashflow = () => {
  const [cashflow, setCashflow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (globalCashflow) {
      setCashflow(globalCashflow);
    } else {
      const data = getMockCashflow();
      globalCashflow = data;
      setCashflow(data);
    }
    setLoading(false);
  }, []);

  const addTransaction = (transaction) => {
    const lastBalance = cashflow.length > 0 ? cashflow[cashflow.length - 1].balance : 0;
    const newBalance = transaction.type === 'inflow' 
      ? lastBalance + transaction.amount 
      : lastBalance - transaction.amount;
    const newTransaction = {
      ...transaction,
      id: Math.max(...cashflow.map(c => c.id), 0) + 1,
      balance: newBalance,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...cashflow, newTransaction];
    globalCashflow = updated;
    setCashflow(updated);
  };

  const deleteTransaction = (id) => {
    const updated = cashflow.filter(t => t.id !== id);
    globalCashflow = updated;
    setCashflow(updated);
  };

  return { cashflow, loading, addTransaction, deleteTransaction };
};

export const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setBudgets(getMockBudgets());
    setLoading(false);
  }, []);

  return { budgets, loading };
};

export const useFinancialReports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setReports(getMockFinancialReports());
    setLoading(false);
  }, []);

  return { reports, loading };
};
