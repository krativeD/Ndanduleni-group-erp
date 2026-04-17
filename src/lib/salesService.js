import { supabase } from './supabaseClient';

// ============================================
// QUOTATIONS SERVICE
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
  // Soft delete - just mark as deleted
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
  // Start a transaction-like process
  
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
  
  // 4. Update quotation status to 'converted' (this removes it from active list)
  const { error: updateError } = await supabase
    .from('quotations')
    .update({ status: 'converted' })
    .eq('id', quotationId);
  
  if (updateError) throw updateError;
  
  return newInvoice;
};

// ============================================
// INVOICES SERVICE
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
  let query = supabase
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
    supabase.removeChannel(query);
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
