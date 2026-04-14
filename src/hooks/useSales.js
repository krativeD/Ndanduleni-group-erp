import { useState, useEffect } from 'react';
import { getMockOrders, getMockQuotations, getMockInvoices, getMockPayments, getMockDeliveries, getMockCommissions } from '../lib/salesService';

let globalOrders = null;
let globalQuotations = null;
let globalInvoices = null;
let globalPayments = null;
let globalDeliveries = null;

// ORDERS HOOK
export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (globalOrders) { 
          setOrders(globalOrders); 
        } else {
          const data = getMockOrders(); 
          globalOrders = data; 
          setOrders(data);
        }
      } catch (err) { 
        setError(err.message); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  const addOrder = (order) => {
    const newOrder = { 
      ...order, 
      id: Math.max(...orders.map(o => o.id), 0) + 1, 
      orderNumber: `ORD-2026-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      paymentStatus: 'unpaid'
    };
    const updated = [...orders, newOrder]; 
    globalOrders = updated; 
    setOrders(updated); 
    return newOrder;
  };

  const updateOrder = (id, updates) => {
    const updated = orders.map(o => o.id === id ? { ...o, ...updates } : o);
    globalOrders = updated;
    setOrders(updated);
  };

  const updateOrderStatus = (id, status) => {
    updateOrder(id, { status });
  };

  const deleteOrder = (id) => {
    const updated = orders.filter(o => o.id !== id);
    globalOrders = updated;
    setOrders(updated);
  };

  return { orders, loading, error, addOrder, updateOrder, updateOrderStatus, deleteOrder };
};

// QUOTATIONS HOOK
export const useQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (globalQuotations) {
        setQuotations(globalQuotations);
      } else {
        const data = getMockQuotations();
        globalQuotations = data;
        setQuotations(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const addQuotation = (quote) => {
    const newQuote = {
      ...quote,
      id: Math.max(...quotations.map(q => q.id), 0) + 1,
      quoteNumber: `QUO-2026-${String(quotations.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...quotations, newQuote];
    globalQuotations = updated;
    setQuotations(updated);
    return newQuote;
  };

  const updateQuotation = (id, updates) => {
    const updated = quotations.map(q => q.id === id ? { ...q, ...updates } : q);
    globalQuotations = updated;
    setQuotations(updated);
  };

  const deleteQuotation = (id) => {
    const updated = quotations.filter(q => q.id !== id);
    globalQuotations = updated;
    setQuotations(updated);
  };

  return { quotations, loading, addQuotation, updateQuotation, deleteQuotation };
};

// INVOICES HOOK
export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to generate next invoice number
  const generateInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    const existingInvoices = invoices.filter(inv => 
      inv.invoiceNumber && inv.invoiceNumber.includes(`INV-${currentYear}`)
    );
    const nextNumber = String(existingInvoices.length + 1).padStart(3, '0');
    return `INV-${currentYear}-${nextNumber}`;
  };

  useEffect(() => {
    setLoading(true);
    if (globalInvoices) {
      setInvoices(globalInvoices);
    } else {
      const data = getMockInvoices();
      globalInvoices = data;
      setInvoices(data);
    }
    setLoading(false);
  }, []);

  const addInvoice = (invoice) => {
    const newInvoice = {
      ...invoice,
      id: Math.max(...invoices.map(i => i.id), 0) + 1,
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...invoices, newInvoice];
    globalInvoices = updated;
    setInvoices(updated);
    return newInvoice;
  };

  const convertQuotationToInvoice = (quotation, orderNumber = null) => {
    const newInvoice = {
      id: Math.max(...invoices.map(i => i.id), 0) + 1,
      invoiceNumber: generateInvoiceNumber(),
      order: orderNumber || `ORD-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`,
      customer: quotation.customer,
      customerAddress: quotation.customerAddress || 'Address not provided',
      customerEmail: quotation.customerEmail || '',
      date: new Date().toISOString().split('T')[0],
      dueDate: quotation.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      total: quotation.total,
      paid: 0,
      status: 'unpaid',
      items: quotation.items || [{ description: 'Cleaning Services', quantity: 1, unitPrice: quotation.total }]
    };
    const updated = [...invoices, newInvoice];
    globalInvoices = updated;
    setInvoices(updated);
    return newInvoice;
  };

  const updateInvoice = (id, updates) => {
    const updated = invoices.map(i => i.id === id ? { ...i, ...updates } : i);
    globalInvoices = updated;
    setInvoices(updated);
  };

  const deleteInvoice = (id) => {
    const updated = invoices.filter(i => i.id !== id);
    globalInvoices = updated;
    setInvoices(updated);
  };

  return { 
    invoices, 
    loading, 
    addInvoice, 
    updateInvoice, 
    deleteInvoice, 
    convertQuotationToInvoice,
    generateInvoiceNumber 
  };
};

// DELIVERIES HOOK
export const useDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (globalDeliveries) {
      setDeliveries(globalDeliveries);
    } else {
      const data = getMockDeliveries();
      globalDeliveries = data;
      setDeliveries(data);
    }
    setLoading(false);
  }, []);

  const addDelivery = (delivery) => {
    const newDelivery = {
      ...delivery,
      id: Math.max(...deliveries.map(d => d.id), 0) + 1,
      status: 'scheduled'
    };
    const updated = [...deliveries, newDelivery];
    globalDeliveries = updated;
    setDeliveries(updated);
    return newDelivery;
  };

  const updateDeliveryStatus = (id, status, delivered = null) => {
    const updated = deliveries.map(d => d.id === id ? { ...d, status, delivered } : d);
    globalDeliveries = updated;
    setDeliveries(updated);
  };

  const deleteDelivery = (id) => {
    const updated = deliveries.filter(d => d.id !== id);
    globalDeliveries = updated;
    setDeliveries(updated);
  };

  return { deliveries, loading, addDelivery, updateDeliveryStatus, deleteDelivery };
};

// COMMISSIONS HOOK
export const useCommissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const data = getMockCommissions();
    setCommissions(data);
    setLoading(false);
  }, []);

  const updateCommissionStatus = (id, status) => {
    setCommissions(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  return { commissions, loading, updateCommissionStatus };
};
