import React from 'react';
import styles from './InvoiceTemplate.module.css';

const InvoiceTemplate = ({ invoice, companyInfo }) => {
  const formatCurrency = (amount) => {
    return `R ${amount.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const invoiceDate = formatDate(invoice.date);
  const dueDate = formatDate(invoice.dueDate);
  const balance = invoice.total - (invoice.paid || 0);

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
          <h2>TAX INVOICE</h2>
          <div className={styles.invoiceMeta}>
            <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
            <p><strong>Order #:</strong> {invoice.order}</p>
            <p><strong>Date:</strong> {invoiceDate}</p>
            <p><strong>Due Date:</strong> {dueDate}</p>
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className={styles.billTo}>
        <h3>Bill To:</h3>
        <p className={styles.customerName}>{invoice.customer}</p>
        <p>{invoice.customerAddress || 'Address not provided'}</p>
        <p>{invoice.customerEmail || ''}</p>
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
          {invoice.items && invoice.items.length > 0 ? (
            invoice.items.map((item, idx) => (
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
              <td>{formatCurrency(invoice.total)}</td>
              <td>{formatCurrency(invoice.total)}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className={styles.totals}>
        <div className={styles.totalsRow}>
          <span>Subtotal:</span>
          <span>{formatCurrency(invoice.total)}</span>
        </div>
        <div className={styles.totalsRow}>
          <span>VAT (15%):</span>
          <span>{formatCurrency(invoice.total * 0.15)}</span>
        </div>
        <div className={styles.totalsRow}>
          <span>Total (VAT Incl):</span>
          <span>{formatCurrency(invoice.total)}</span>
        </div>
        <div className={styles.totalsRow}>
          <span>Amount Paid:</span>
          <span>{formatCurrency(invoice.paid || 0)}</span>
        </div>
        <div className={`${styles.totalsRow} ${styles.balanceDue}`}>
          <span>Balance Due:</span>
          <span>{formatCurrency(balance)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p><strong>Payment Details:</strong></p>
        <p>Bank: {companyInfo.bankName} | Account: {companyInfo.accountNumber} | Branch: {companyInfo.branchCode}</p>
        <p>Reference: {invoice.invoiceNumber}</p>
        <p className={styles.thankYou}>Thank you for your business!</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
