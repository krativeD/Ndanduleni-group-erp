import React from 'react';
import styles from './InvoiceTemplate.module.css';

const QuotationTemplate = ({ quotation, companyInfo }) => {
  const formatCurrency = (amount) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const quoteDate = formatDate(quotation.date);
  const validUntil = formatDate(quotation.validUntil);

  return (
    <div className={styles.invoiceContainer}>
      {/* Header with Logo */}
      <div className={styles.header}>
        <div className={styles.logoSection}>
          <img src="/logo.png" alt="Ndanduleni Group" className={styles.logo} />
          <div className={styles.companyInfo}>
            <h1>NDANDULENI GROUP</h1>
            <p>{companyInfo.address}</p>
            <p>Tel: {companyInfo.phone} | Email: {companyInfo.email}</p>
            <p>VAT Reg: {companyInfo.vatNumber}</p>
          </div>
        </div>
        <div className={styles.invoiceTitle}>
          <h2>QUOTATION</h2>
          <div className={styles.invoiceMeta}>
            <p><strong>Quote #:</strong> {quotation.quoteNumber}</p>
            <p><strong>Date:</strong> {quoteDate}</p>
            <p><strong>Valid Until:</strong> {validUntil}</p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className={styles.billTo}>
        <h3>Prepared For:</h3>
        <p className={styles.customerName}>{quotation.customer}</p>
        <p>{quotation.customerAddress || 'Address not provided'}</p>
        <p>{quotation.customerEmail || ''}</p>
      </div>

      {/* Line Items */}
      <table className={styles.itemsTable}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {quotation.items && quotation.items.length > 0 ? (
            quotation.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.unitPrice)}</td>
                <td>{formatCurrency(item.quantity * item.unitPrice)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Professional Cleaning Services</td>
              <td>1</td>
              <td>{formatCurrency(quotation.total)}</td>
              <td>{formatCurrency(quotation.total)}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className={styles.totals}>
        <div className={styles.totalsRow}>
          <span>Subtotal:</span>
          <span>{formatCurrency(quotation.total)}</span>
        </div>
        <div className={styles.totalsRow}>
          <span>VAT (15%):</span>
          <span>{formatCurrency(quotation.total * 0.15)}</span>
        </div>
        <div className={`${styles.totalsRow} ${styles.balanceDue}`}>
          <span>Total (VAT Incl):</span>
          <span>{formatCurrency(quotation.total)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p><strong>Terms & Conditions:</strong></p>
        <p>1. This quotation is valid until the date specified above.</p>
        <p>2. Prices are subject to change after the validity period.</p>
        <p>3. Payment terms: 50% deposit upon acceptance, 50% upon completion.</p>
        <p>4. This quotation is subject to site inspection and final scope confirmation.</p>
        <p className={styles.thankYou}>Thank you for considering Ndanduleni Group!</p>
      </div>
    </div>
  );
};

export default QuotationTemplate;
