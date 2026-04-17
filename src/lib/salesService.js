import { supabase } from './supabaseClient';

// ============================================
// MOCK DATA (FOR ORDERS AND PAYMENTS)
// ============================================

export const getMockOrders = () => [
  { id: 1, orderNumber: 'ORD-2026-001', customer: 'Sandton City Mall', date: '2026-04-10', items: 5, total: 12500.00, status: 'delivered', paymentStatus: 'paid' },
  { id: 2, orderNumber: 'ORD-2026-002', customer: 'Menlyn Park', date: '2026-04-11', items: 3, total: 8750.50, status: 'processing', paymentStatus: 'partial' },
  { id: 3, orderNumber: 'ORD-2026-003', customer: 'V&A Waterfront', date: '2026-04-12', items: 7, total: 15300.75, status: 'pending', paymentStatus: 'unpaid' },
  { id: 4, orderNumber: 'ORD-2026-004', customer: 'Gateway Theatre', date: '2026-04-09', items: 2, total: 4200.00, status: 'shipped', paymentStatus: 'paid' },
  { id: 5, orderNumber: 'ORD-2026-005', customer: 'Fourways Mall', date: '2026-04-13', items: 4, total: 9800.00, status: 'confirmed', paymentStatus: 'unpaid' }
];

export const getMockPayments = () => [
  { id: 1, invoice: 'INV-2026-001', customer: 'Sandton City Mall', amount: 12500.00, method: 'EFT', date: '2026-04-12', reference: 'PAY-001', status: 'completed' },
  { id: 2, invoice: 'INV-2026-002', customer: 'Menlyn Park', amount: 4000.00, method: 'Credit Card', date: '2026-04-13', reference: 'PAY-002', status: 'completed' },
  { id: 3, invoice: 'INV-2026-004', customer: 'Gateway Theatre', amount: 4200.00, method: 'EFT', date: '2026-04-10', reference: 'PAY-003', status: 'completed' }
];

export const getMockQuotations = () => [
  { 
    id: 1, 
    quoteNumber: 'QUO-2026-001', 
    customer: 'Clearwater Mall', 
    customerAddress: 'Hendrik Potgieter Road, Roodepoort, 1709',
    customerEmail: 'procurement@clearwatermall.co.za',
    date: '2026-04-10', 
    items: 6, 
    total: 18500.00, 
    validUntil: '2026-05-10', 
    status: 'sent',
    lineItems: [
      { description: 'Deep Cleaning - Food Court', quantity: 1, unitPrice: 8500.00 },
      { description: 'Window Cleaning - Storefronts', quantity: 2, unitPrice: 3500.00 },
      { description: 'Floor Buffing - Main Concourse', quantity: 1, unitPrice: 6500.00 }
    ]
  },
  { 
    id: 2, 
    quoteNumber: 'QUO-2026-002', 
    customer: 'Brooklyn Mall', 
    customerAddress: 'Fehrsen Street, Brooklyn, Pretoria, 0181',
    customerEmail: 'finance@brooklynmall.co.za',
    date: '2026-04-11', 
    items: 3, 
    total: 7200.00, 
    validUntil: '2026-05-11', 
    status: 'accepted',
    lineItems: [
      { description: 'Daily Maintenance - Restrooms', quantity: 5, unitPrice: 1200.00 },
      { description: 'Sanitization - High Touch Areas', quantity: 1, unitPrice: 1200.00 }
    ]
  }
];

export const getMockInvoices = () => [
  { 
    id: 1, 
    invoiceNumber: 'INV-2026-001', 
    order: 'ORD-2026-001', 
    customer: 'Sandton City Mall', 
    customerAddress: '83 Rivonia Road, Sandton, Johannesburg, 2196',
    customerEmail: 'accounts@sandtoncity.co.za',
    date: '2026-04-10', 
    dueDate: '2026-05-10', 
    total: 12500.00, 
    paid: 12500.00, 
    status: 'paid',
    items: [
      { description: 'Deep Cleaning - Food Court', quantity: 1, unitPrice: 8500.00 },
      { description: 'Window Cleaning - Atrium', quantity: 1, unitPrice: 4000.00 }
    ]
  },
  { 
    id: 2, 
    invoiceNumber: 'INV-2026-002', 
    order: 'ORD-2026-002', 
    customer: 'Menlyn Park', 
    customerAddress: 'Atterbury Road, Menlyn, Pretoria, 0063',
    customerEmail: 'finance@menlynpark.co.za',
    date: '2026-04-11', 
    dueDate: '2026-05-11', 
    total: 8750.50, 
    paid: 4000.00, 
    status: 'partial',
    items: [
      { description: 'Daily Maintenance - Restrooms', quantity: 5, unitPrice: 1200.00 },
      { description: 'Floor Buffing - Concourse', quantity: 1, unitPrice: 2750.50 }
    ]
  }
];

// ============================================
// QUOTATIONS SERVICE (SUPABASE)
// ============================================

export const fetchQuotations = async (status = 'active') => {
  let query = supabase
    .from('quotations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const createQuotation = async (quotation) => {
  const { data, error } = await supabase
    .from('quotations')
    .insert([quotation])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateQuotation = async (id, updates) => {
  const { data, error } = await supabase
    .from('quotations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteQuotation = async (id) => {
  const { data, error } = await supabase
    .from('quotations')
    .update({ status: 'deleted' })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const convertQuotationToInvoiceDB = async (quotationId, orderRef = null) => {
  // 1. Get the quotation
  const { data: quotation, error: fetchError } = await supabase
    .from('quotations')
    .select('*')
    .eq('id', quotationId)
    .single();
  
  if (fetchError) throw fetchError;
  
  // 2. Generate invoice number
  const year = new Date().getFullYear();
  const { data: existingInvoices } = await supabase
    .from('invoices')
    .select('invoice_number')
    .like('invoice_number', `INV-${year}-%`)
    .order('invoice_number', { ascending: false })
    .limit(1);
  
  const nextNumber = existingInvoices?.length 
    ? String(parseInt(existingInvoices[0].invoice_number.split('-')[2]) + 1).padStart(3, '0')
    : '001';
  const invoiceNumber = `INV-${year}-${nextNumber}`;
  
  // 3. Create invoice from quotation
  const invoice = {
    invoice_number: invoiceNumber,
    quotation_id: quotation.id,
    order_ref: orderRef || `ORD-${year}-${nextNumber}`,
    customer: quotation.customer,
    customer_address: quotation.customer_address,
    customer_email: quotation.customer_email,
    date: new Date().toISOString().split('T')[0],
    due_date: quotation.valid_until || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: quotation.line_items,
    subtotal: quotation.subtotal,
    tax: quotation.tax,
    discount: quotation.discount,
    total: quotation.total,
    paid: 0,
    status: 'unpaid',
    created_by: quotation.created_by || 'system'
  };
  
  const { data: newInvoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert([invoice])
    .select()
    .single();
  
  if (invoiceError) throw invoiceError;
  
  // 4. Update quotation status to 'converted'
  const { error: updateError } = await supabase
    .from('quotations')
    .update({ status: 'converted' })
    .eq('id', quotationId);
  
  if (updateError) throw updateError;
  
  return newInvoice;
};

// ============================================
// INVOICES SERVICE (SUPABASE)
// ============================================

export const fetchInvoices = async () => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createInvoice = async (invoice) => {
  const { data, error } = await supabase
    .from('invoices')
    .insert([invoice])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateInvoice = async (id, updates) => {
  const { data, error } = await supabase
    .from('invoices')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteInvoice = async (id) => {
  const { data, error } = await supabase
    .from('invoices')
    .update({ status: 'deleted' })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// ============================================
// REAL-TIME SUBSCRIPTIONS
// ============================================

export const subscribeToQuotations = (callback, status = 'active') => {
  const subscription = supabase
    .channel('quotations-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'quotations' },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
  
  return () => {
    supabase.removeChannel(subscription);
  };
};

export const subscribeToInvoices = (callback) => {
  const subscription = supabase
    .channel('invoices-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'invoices' },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
  
  return () => {
    supabase.removeChannel(subscription);
  };
};
