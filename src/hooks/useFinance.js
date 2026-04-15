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
    setLedger(getMockGeneralLedger());
    setLoading(false);
  }, []);

  const addEntry = (entry) => {
    setLedger(prev => [{ ...entry, id: Math.max(...prev.map(l => l.id), 0) + 1 }, ...prev]);
  };

  return { ledger, loading, addEntry };
};

export const useAccountsPayable = () => {
  const [payables, setPayables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setPayables(getMockAccountsPayable());
    setLoading(false);
  }, []);

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

  return { payables, loading, recordPayment };
};

export const useAccountsReceivable = () => {
  const [receivables, setReceivables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setReceivables(getMockAccountsReceivable());
    setLoading(false);
  }, []);

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

  return { receivables, loading, recordReceipt };
};

export const useCashflow = () => {
  const [cashflow, setCashflow] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setCashflow(getMockCashflow());
    setLoading(false);
  }, []);

  return { cashflow, loading };
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
