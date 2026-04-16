import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { useServicesList } from '../../hooks/useServicesList';
import styles from './OrderForm.module.css';

const QuotationForm = ({ quotation, onSubmit, onCancel, onConvertToInvoice }) => {
  const { services, getCategories } = useServicesList();
  const categories = getCategories();
  
  const [formData, setFormData] = useState({
    customer: quotation?.customer || '',
    customerAddress: quotation?.customerAddress || '',
    customerEmail: quotation?.customerEmail || '',
    validUntil: quotation?.validUntil || '',
    status: quotation?.status || 'draft'
  });

  const [items, setItems] = useState(quotation?.lineItems || [
    { id: Date.now(), description: '', quantity: 1, unitPrice: 0, serviceId: null }
  ]);
  
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, discount: 0, total: 0 });
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // Filter services by category
  const filteredServices = filterCategory === 'all' 
    ? services 
    : services.filter(s => s.category === filterCategory);

  // Auto-calculate totals whenever items change
  useEffect(() => {
    calculateTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return sum + (qty * price);
    }, 0);

    const tax = subtotal * 0.15;
    const discount = 0;
    const total = subtotal + tax - discount;

    setTotals({ subtotal, tax, discount, total });
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

  const handleServiceSelect = (itemId, serviceId) => {
    const selectedService = services.find(s => s.id === parseInt(serviceId));
    if (selectedService) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { 
                ...item, 
                serviceId: selectedService.id,
                description: selectedService.name, 
                unitPrice: selectedService.price 
              } 
            : item
        )
      );
    }
  };

  const handleItemChange = (id, field, value) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          let newValue = value;
          if (field === 'quantity') {
            newValue = Math.max(0, parseInt(value) || 0);
          } else if (field === 'unitPrice') {
            newValue = Math.max(0, parseFloat(value) || 0);
          }
          return { ...item, [field]: newValue };
        }
        return item;
      })
    );
  };

  const handleDescriptionChange = (id, value) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item => 
        item.id === id ? { ...item, description: value } : item
      );
      
      const isLastItem = updatedItems[updatedItems.length - 1]?.id === id;
      
      if (isLastItem && value.trim() !== '') {
        return [...updatedItems, { id: Date.now() + Math.random(), description: '', quantity: 1, unitPrice: 0, serviceId: null }];
      }
      
      return updatedItems;
    });
  };

  const addLineItem = () => {
    setItems(prev => [...prev, { id: Date.now() + Math.random(), description: '', quantity: 1, unitPrice: 0, serviceId: null }]);
  };

  const removeLineItem = (id) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const calculateItemTotal = (quantity, unitPrice) => {
    return (parseFloat(quantity) || 0) * (parseFloat(unitPrice) || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const validItems = items.filter(item => item.description.trim() !== '');
    
    const quotationData = {
      ...formData,
      lineItems: validItems.length > 0 ? validItems : items,
      items: validItems.length,
      subtotal: totals.subtotal,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total
    };
    
    await onSubmit(quotationData);
    setLoading(false);
  };

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
            <label className={styles.label}>Line Items</label>
            <Button type="button" variant="default" size="small" onClick={addLineItem}>+ Add Item</Button>
          </div>

          {/* Service Category Filter */}
          <div className={styles.categoryFilter}>
            <select 
              className={styles.categorySelect} 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Services</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.lineItemsTable}>
            <div className={styles.tableHeader}>
              <span className={styles.colService}>Service</span>
              <span className={styles.colDescription}>Description</span>
              <span className={styles.colQty}>Qty</span>
              <span className={styles.colPrice}>Unit Price</span>
              <span className={styles.colTotal}>Total</span>
              <span className={styles.colAction}></span>
            </div>
            
            {items.map((item) => {
              const itemTotal = calculateItemTotal(item.quantity, item.unitPrice);
              
              return (
                <div key={item.id} className={styles.lineItemRow}>
                  <div className={styles.colService}>
                    <select
                      className={styles.serviceSelect}
                      value={item.serviceId || ''}
                      onChange={(e) => handleServiceSelect(item.id, e.target.value)}
                    >
                      <option value="">Select service...</option>
                      {filteredServices.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} - {formatCurrency(service.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.colDescription}>
                    <input
                      type="text"
                      placeholder="Or type custom description"
                      value={item.description}
                      onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                      className={styles.itemInput}
                    />
                  </div>
                  <div className={styles.colQty}>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                      className={styles.itemInput}
                    />
                  </div>
                  <div className={styles.colPrice}>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, 'unitPrice', e.target.value)}
                      className={styles.itemInput}
                    />
                  </div>
                  <div className={styles.colTotal}>
                    <span className={styles.itemTotal}>{formatCurrency(itemTotal)}</span>
                  </div>
                  <div className={styles.colAction}>
                    {items.length > 1 && (
                      <button type="button" className={styles.removeBtn} onClick={() => removeLineItem(item.id)}>✕</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Totals Section */}
        <div className={styles.totalsSection}>
          <div className={styles.totalRow}>
            <span>Subtotal:</span>
            <span className={styles.totalValue}>{formatCurrency(totals.subtotal)}</span>
          </div>
          <div className={styles.totalRow}>
            <span>VAT (15%):</span>
            <span className={styles.totalValue}>{formatCurrency(totals.tax)}</span>
          </div>
          <div className={`${styles.totalRow} ${styles.grandTotal}`}>
            <span>Total (VAT Incl):</span>
            <span className={styles.grandTotalValue}>{formatCurrency(totals.total)}</span>
          </div>
        </div>

        <div className={styles.formActions}>
          <Button type="button" variant="default" onClick={onCancel}>Cancel</Button>
          {quotation && onConvertToInvoice && (
            <Button type="button" variant="success" onClick={onConvertToInvoice}>
              📄 Convert to Invoice
            </Button>
          )}
          <Button type="submit" variant="313" loading={loading}>
            {quotation ? 'Update' : 'Create'} Quotation
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default QuotationForm;
