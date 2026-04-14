import { useState, useEffect } from 'react';
import { getMockOrders, getMockQuotations, getMockInvoices, getMockPayments, getMockDeliveries, getMockCommissions } from '../lib/salesService';

let globalOrders = null;

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (globalOrders) { setOrders(globalOrders); } else {
          const data = getMockOrders(); globalOrders = data; setOrders(data);
        }
      } catch (err) { setError(err.message); } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const addOrder = (order) => {
    const newOrder = { ...order, id: Math.max(...orders.map(o => o.id), 0) + 1, orderNumber: `ORD-2026-${String(orders.length + 1).padStart(3, '0')}` };
    const updated = [...orders, newOrder]; globalOrders = updated; setOrders(updated); return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    const updated = orders.map(o => o.id === id ? { ...o, status } : o);
    globalOrders = updated; setOrders(updated);
  };

  return { orders, loading, error, addOrder, updateOrderStatus };
};

export const useQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); setQuotations(getMockQuotations()); setLoading(false); }, []);
  return { quotations, loading };
};

export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); setInvoices(getMockInvoices()); setLoading(false); }, []);
  return { invoices, loading };
};

export const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); setPayments(getMockPayments()); setLoading(false); }, []);
  return { payments, loading };
};

export const useDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); setDeliveries(getMockDeliveries()); setLoading(false); }, []);
  return { deliveries, loading };
};

export const useCommissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); setCommissions(getMockCommissions()); setLoading(false); }, []);
  return { commissions, loading };
};
