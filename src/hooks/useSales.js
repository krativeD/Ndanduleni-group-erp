import { useState, useEffect, useCallback } from 'react';
import { 
  fetchQuotations, 
  createQuotation, 
  updateQuotation as updateQuotationDB, 
  deleteQuotation as deleteQuotationDB,
  convertQuotationToInvoiceDB,
  fetchInvoices,
  createInvoice,
  updateInvoice as updateInvoiceDB,
  deleteInvoice as deleteInvoiceDB,
  subscribeToQuotations,
  subscribeToInvoices,
  getMockOrders,
  getMockPayments
} from '../lib/salesService';

// ============================================
// QUOTATIONS HOOK (WITH SUPABASE)
// ============================================

export const useQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadQuotations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchQuotations('active');
      setQuotations(data);
      setError(null);
    } catch (err) {
      console.error('Error loading quotations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuotations();
  }, [loadQuotations]);

  useEffect(() => {
    const unsubscribe = subscribeToQuotations((payload) => {
      console.log('Quotation change:', payload.eventType);
      loadQuotations();
    }, 'active');
    
    return () => unsubscribe();
  }, [loadQuotations]);

  const addQuotation = async (quote) => {
    try {
      const quoteNumber = `QUO-${new Date().getFullYear()}-${String(quotations.length + 1).padStart(3, '0')}`;
      const newQuote = {
        ...quote,
        quote_number: quoteNumber,
        line_items: quote.lineItems || [],
        created_by: 'Current User',
        status: 'active'
      };
      
      const data = await createQuotation(newQuote);
      setQuotations(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error adding quotation:', err);
      throw err;
    }
  };

  const updateQuotation = async (id, updates) => {
    try {
      const dbUpdates = {
        ...updates,
        line_items: updates.lineItems || updates.line_items
      };
      const data = await updateQuotationDB(id, dbUpdates);
      setQuotations(prev => prev.map(q => q.id === id ? data : q));
      return data;
    } catch (err) {
      console.error('Error updating quotation:', err);
      throw err;
    }
  };

  const deleteQuotation = async (id) => {
    try {
      await deleteQuotationDB(id);
      setQuotations(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      console.error('Error deleting quotation:', err);
      throw err;
    }
  };

  return { 
    quotations, 
    loading, 
    error, 
    addQuotation, 
    updateQuotation, 
    deleteQuotation,
    refreshQuotations: loadQuotations
  };
};

// ============================================
// INVOICES HOOK (WITH SUPABASE)
// ============================================

export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadInvoices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchInvoices();
      setInvoices(data);
      setError(null);
    } catch (err) {
      console.error('Error loading invoices:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  useEffect(() => {
    const unsubscribe = subscribeToInvoices((payload) => {
      console.log('Invoice change:', payload.eventType);
      loadInvoices();
    });
    
    return () => unsubscribe();
  }, [loadInvoices]);

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const nextNumber = String(invoices.length + 1).padStart(3, '0');
    return `INV-${year}-${nextNumber}`;
  };

  const addInvoice = async (invoice) => {
    try {
      const invoiceNumber = generateInvoiceNumber();
      const newInvoice = {
        ...invoice,
        invoice_number: invoiceNumber,
        created_by: 'Current User'
      };
      
      const data = await createInvoice(newInvoice);
      setInvoices(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error adding invoice:', err);
      throw err;
    }
  };

  const convertQuotationToInvoice = async (quotation, orderNumber = null) => {
    try {
      const newInvoice = await convertQuotationToInvoiceDB(quotation.id, orderNumber);
      setInvoices(prev => [newInvoice, ...prev]);
      return newInvoice;
    } catch (err) {
      console.error('Error converting quotation to invoice:', err);
      throw err;
    }
  };

  const updateInvoice = async (id, updates) => {
    try {
      const data = await updateInvoiceDB(id, updates);
      setInvoices(prev => prev.map(i => i.id === id ? data : i));
      return data;
    } catch (err) {
      console.error('Error updating invoice:', err);
      throw err;
    }
  };

  const deleteInvoice = async (id) => {
    try {
      await deleteInvoiceDB(id);
      setInvoices(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error('Error deleting invoice:', err);
      throw err;
    }
  };

  return { 
    invoices, 
    loading, 
    error,
    addInvoice, 
    updateInvoice, 
    deleteInvoice, 
    convertQuotationToInvoice,
    generateInvoiceNumber,
    refreshInvoices: loadInvoices
  };
};

// ============================================
// ORDERS HOOK (MOCK - TO BE MIGRATED LATER)
// ============================================

let globalOrders = null;

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

// ============================================
// PAYMENTS HOOK (MOCK - TO BE MIGRATED LATER)
// ============================================

let globalPayments = null;

export const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (globalPayments) {
      setPayments(globalPayments);
    } else {
      const data = getMockPayments();
      globalPayments = data;
      setPayments(data);
    }
    setLoading(false);
  }, []);

  const addPayment = (payment) => {
    const newPayment = {
      ...payment,
      id: Math.max(...payments.map(p => p.id), 0) + 1,
      date: new Date().toISOString().split('T')[0],
      reference: `PAY-${String(payments.length + 1).padStart(3, '0')}`
    };
    const updated = [...payments, newPayment];
    globalPayments = updated;
    setPayments(updated);
    return newPayment;
  };

  const deletePayment = (id) => {
    const updated = payments.filter(p => p.id !== id);
    globalPayments = updated;
    setPayments(updated);
  };

  return { payments, loading, addPayment, deletePayment };
};
