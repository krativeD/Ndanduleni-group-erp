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
      // Fetch all quotations except deleted ones
      const data = await fetchQuotations(null); // Get all statuses
      // Filter out deleted ones for display
      const activeData = data.filter(q => q.status !== 'deleted' && q.status !== 'converted');
      
      // Map snake_case to camelCase for frontend
      const mappedData = activeData.map(q => ({
        ...q,
        customerAddress: q.customer_address,
        customerEmail: q.customer_email,
        validUntil: q.valid_until,
        lineItems: q.line_items,
        quoteNumber: q.quote_number,
        lastPrinted: q.last_printed,
        createdBy: q.created_by,
        createdAt: q.created_at,
        updatedAt: q.updated_at
      }));
      setQuotations(mappedData);
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
    }, null); // Listen to all changes
    
    return () => unsubscribe();
  }, [loadQuotations]);

  const addQuotation = async (quote) => {
    try {
      const quoteNumber = `QUO-${new Date().getFullYear()}-${String(quotations.length + 1).padStart(3, '0')}`;
      
      // Ensure status is one of the allowed values
      const validStatus = quote.status || 'draft';
      
      // Map camelCase to snake_case for database
      const newQuote = {
        quote_number: quoteNumber,
        customer: quote.customer || '',
        customer_address: quote.customerAddress || '',
        customer_email: quote.customerEmail || '',
        date: new Date().toISOString().split('T')[0],
        valid_until: quote.validUntil || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        line_items: quote.lineItems || [],
        items: quote.items || (quote.lineItems?.length || 0),
        subtotal: quote.subtotal || 0,
        tax: quote.tax || 0,
        discount: quote.discount || 0,
        total: quote.total || 0,
        status: validStatus, // 'draft', 'sent', 'accepted', 'rejected'
        created_by: 'Current User'
      };
      
      console.log('Creating quotation with data:', newQuote);
      
      const data = await createQuotation(newQuote);
      
      // Map back to camelCase for frontend
      const mappedData = {
        ...data,
        customerAddress: data.customer_address,
        customerEmail: data.customer_email,
        validUntil: data.valid_until,
        lineItems: data.line_items,
        quoteNumber: data.quote_number,
        lastPrinted: data.last_printed
      };
      
      setQuotations(prev => [mappedData, ...prev]);
      return mappedData;
    } catch (err) {
      console.error('Error adding quotation:', err);
      throw err;
    }
  };

  const updateQuotation = async (id, updates) => {
    try {
      // Map camelCase to snake_case for database
      const dbUpdates = {};
      if (updates.customer !== undefined) dbUpdates.customer = updates.customer;
      if (updates.customerAddress !== undefined) dbUpdates.customer_address = updates.customerAddress;
      if (updates.customerEmail !== undefined) dbUpdates.customer_email = updates.customerEmail;
      if (updates.validUntil !== undefined) dbUpdates.valid_until = updates.validUntil;
      if (updates.lineItems !== undefined) dbUpdates.line_items = updates.lineItems;
      if (updates.items !== undefined) dbUpdates.items = updates.items;
      if (updates.subtotal !== undefined) dbUpdates.subtotal = updates.subtotal;
      if (updates.tax !== undefined) dbUpdates.tax = updates.tax;
      if (updates.discount !== undefined) dbUpdates.discount = updates.discount;
      if (updates.total !== undefined) dbUpdates.total = updates.total;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.lastPrinted !== undefined) dbUpdates.last_printed = updates.lastPrinted;
      
      const data = await updateQuotationDB(id, dbUpdates);
      
      // Map back to camelCase for frontend
      const mappedData = {
        ...data,
        customerAddress: data.customer_address,
        customerEmail: data.customer_email,
        validUntil: data.valid_until,
        lineItems: data.line_items,
        quoteNumber: data.quote_number,
        lastPrinted: data.last_printed
      };
      
      setQuotations(prev => prev.map(q => q.id === id ? mappedData : q));
      return mappedData;
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
      // Filter out deleted ones
      const activeData = data.filter(i => i.status !== 'deleted');
      
      // Map snake_case to camelCase for frontend
      const mappedData = activeData.map(i => ({
        ...i,
        invoiceNumber: i.invoice_number,
        quotationId: i.quotation_id,
        orderRef: i.order_ref,
        customerAddress: i.customer_address,
        customerEmail: i.customer_email,
        dueDate: i.due_date,
        createdBy: i.created_by,
        createdAt: i.created_at,
        updatedAt: i.updated_at
      }));
      setInvoices(mappedData);
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
      
      // Map camelCase to snake_case for database
      const newInvoice = {
        invoice_number: invoiceNumber,
        order_ref: invoice.order || '',
        customer: invoice.customer || '',
        customer_address: invoice.customerAddress || '',
        customer_email: invoice.customerEmail || '',
        date: invoice.date || new Date().toISOString().split('T')[0],
        due_date: invoice.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        items: invoice.items || [],
        subtotal: invoice.subtotal || 0,
        tax: invoice.tax || 0,
        discount: invoice.discount || 0,
        total: invoice.total || 0,
        paid: invoice.paid || 0,
        status: invoice.status || 'unpaid',
        created_by: 'Current User'
      };
      
      const data = await createInvoice(newInvoice);
      
      // Map back to camelCase
      const mappedData = {
        ...data,
        invoiceNumber: data.invoice_number,
        customerAddress: data.customer_address,
        customerEmail: data.customer_email,
        dueDate: data.due_date
      };
      
      setInvoices(prev => [mappedData, ...prev]);
      return mappedData;
    } catch (err) {
      console.error('Error adding invoice:', err);
      throw err;
    }
  };

  const convertQuotationToInvoice = async (quotation, orderNumber = null) => {
    try {
      const newInvoice = await convertQuotationToInvoiceDB(quotation.id, orderNumber);
      
      // Map back to camelCase
      const mappedData = {
        ...newInvoice,
        invoiceNumber: newInvoice.invoice_number,
        customerAddress: newInvoice.customer_address,
        customerEmail: newInvoice.customer_email,
        dueDate: newInvoice.due_date
      };
      
      setInvoices(prev => [mappedData, ...prev]);
      
      // Also refresh quotations to remove the converted one
      return mappedData;
    } catch (err) {
      console.error('Error converting quotation to invoice:', err);
      throw err;
    }
  };

  const updateInvoice = async (id, updates) => {
    try {
      // Map camelCase to snake_case
      const dbUpdates = {};
      if (updates.customer !== undefined) dbUpdates.customer = updates.customer;
      if (updates.customerAddress !== undefined) dbUpdates.customer_address = updates.customerAddress;
      if (updates.paid !== undefined) dbUpdates.paid = updates.paid;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      
      const data = await updateInvoiceDB(id, dbUpdates);
      
      const mappedData = {
        ...data,
        invoiceNumber: data.invoice_number,
        customerAddress: data.customer_address,
        customerEmail: data.customer_email,
        dueDate: data.due_date
      };
      
      setInvoices(prev => prev.map(i => i.id === id ? mappedData : i));
      return mappedData;
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
