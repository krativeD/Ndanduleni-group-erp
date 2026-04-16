import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './OrderForm.module.css';

const QuotationForm = ({ quotation, onSubmit, onCancel, onConvertToInvoice }) => {
  const [formData, setFormData] = useState({
    customer: quotation?.customer || '',
    customerAddress: quotation?.customerAddress || '',
    customerEmail: quotation?.customerEmail || '',
    validUntil: quotation?.validUntil || '',
    status: quotation?.status || 'draft'
  });

  const [lineItems, setLineItems] = useState(quotation?.lineItems || [
    { id: Date.now(), description: '', quantity: 1, unitPrice: 0 }
  ]);
  
  const [loading, setLoading] = useState(false);

  // Calculate totals
  const calculateSubtotal = () => {
    return lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateVAT = () => {
    return calculateSubtotal() * 0.15;
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  const formatCurrency = (amount) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLineItemChange = (id, field, value) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: field === 'quantity' ? parseInt(value) || 0 : field === 'unitPrice' ? parseFloat(value) || 0 : value } : item
    ));
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { id: Date.now() + Math.random(), description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeLineItem = (id) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Filter out empty line items
    const validLineItems = lineItems.filter(item => item.description.trim() !== '');
    
    const quotationData = {
      ...formData,
      lineItems: validLineItems.length > 0 ? validLineItems : lineItems,
      items: validLineItems.length,
      total: calculateTotal()
    };
    
    await onSubmit(quotationData);
    setLoading(false);
  };

  const subtotal = calculateSubtotal();
  const vat = calculateVAT();
  const total = calculateTotal();

  return (
    <Card className={styles.formCard}>
      <h3>{quotation ? 'Edit Quotation' : 'Create New Quotation'}</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Customer" name="customer" value={formData.customer} onChange={handleChange} required />
        <Input label="Customer Address" name="customerAddress" value={formData.customerAddress} onChange={handleChange} />
        <Input label="Customer Email" name="customerEmail" type="email" value={formData.customerEmail} onChange={handleChange} />
        <Input label="Valid Until" name="validUntil" type="date" value={formData.validUntil} onChange={handleChange} required />
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={styles.select}>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Line Items Section */}
        <div className={styles.lineItemsSection}>
          <div className={styles.lineItemsHeader}>
            <label className={styles.label}>Services / Line Items</label>
            <Button type="button" variant="default" size="small" onClick={addLineItem}>+ Add Item</Button>
          </div>
          
          {lineItems.map((item, index) => (
            <div key={item.id} className={styles.lineItemRow}>
              <div className={styles.lineItemDescription}>
                <Input
                  placeholder="Description (e.g., 1 Room House Cleaning)"
                  value={item.description}
                  onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                />
              </div>
              <div className={styles.lineItemQuantity}>
                <Input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => handleLineItemChange(item.id, 'quantity', e.target.value)}
                />
              </div>
              <div className={styles.lineItemPrice}>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleLineItemChange(item.id, 'unitPrice', e.target.value)}
                />
              </div>
              <div className={styles.lineItemTotal}>
                <span>{formatCurrency(item.quantity * item.unitPrice)}</span>
              </div>
              {lineItems.length > 1 && (
                <button type="button" className={styles.removeBtn} onClick={() => removeLineItem(item.id)}>✕</button>
              )}
            </div>
          ))}
        </div>

        {/* Totals Section */}
        <div className={styles.totalsSection}>
          <div className={styles.totalRow}>
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>VAT (15%):</span>
            <span>{formatCurrency(vat)}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total (VAT Incl):</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>Cancel</Button>
          {quotation && onConvertToInvoice && (
            <Button type="button" variant="success" onClick={onConvertToInvoice}>
              📄 Convert to Invoice
            </Button>
          )}
          <Button type="submit" variant="primary" loading={loading}>
            {quotation ? 'Update' : 'Create'} Quotation
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default QuotationForm;
