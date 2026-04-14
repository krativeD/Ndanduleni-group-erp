import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import InvoiceForm from '../../components/sales/InvoiceForm';
import InvoiceView from '../../components/sales/InvoiceView';
import { useInvoices } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Invoices = () => {
  const { invoices, loading, addInvoice, updateInvoice, deleteInvoice, generateInvoiceNumber } = useInvoices();
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);

  const getStatusBadge = (status) => {
    const badges = { 'paid': styles.statusPaid, 'partial': styles.statusPartial, 'unpaid': styles.statusUnpaid };
    return badges[status] || styles.statusUnpaid;
  };

  const handleAdd = () => {
    setEditingInvoice(null);
    setShowForm(true);
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

  const handleView = (invoice) => {
    setViewingInvoice(invoice);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoice(id);
    }
  };

  const handleSubmit = (data) => {
    if (editingInvoice) {
      updateInvoice(editingInvoice.id, data);
    } else {
      addInvoice(data);
    }
    setShowForm(false);
    setEditingInvoice(null);
  };

  if (loading) return <Loader />;

  const totalOutstanding = invoices.filter(i => i.status !== 'paid').reduce((sum, i) => sum + (i.total - i.paid), 0);
  const nextInvoiceNumber = generateInvoiceNumber();

  // Show invoice view if viewing
  if (viewingInvoice) {
    return (
      <InvoiceView 
        invoice={viewingInvoice} 
        onClose={() => setViewingInvoice(null)} 
      />
    );
  }

  return (
    <>
      {showForm ? (
        <InvoiceForm 
          invoice={editingInvoice} 
          onSubmit={handleSubmit} 
          onCancel={() => { setShowForm(false); setEditingInvoice(null); }}
          nextInvoiceNumber={nextInvoiceNumber}
        />
      ) : (
        <>
          <div className={styles.subHeader}>
            <Button variant="primary" onClick={handleAdd}>+ Generate Invoice</Button>
          </div>
          <Card className={styles.invoiceCard}>
            <div className={styles.summary}>
              <span>Outstanding: <strong>R {totalOutstanding.toLocaleString()}</strong></span>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead><tr><th>Invoice #</th><th>Customer</th><th>Date</th><th>Due Date</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id}>
                      <td>{inv.invoiceNumber}</td><td>{inv.customer}</td><td>{inv.date}</td><td>{inv.dueDate}</td><td>R {inv.total.toLocaleString()}</td><td>R {inv.paid.toLocaleString()}</td>
                      <td>R {(inv.total - inv.paid).toLocaleString()}</td>
                      <td><span className={`${styles.statusBadge} ${getStatusBadge(inv.status)}`}>{inv.status}</span></td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} onClick={() => handleView(inv)} title="View/Print">👁️</button>
                          <button className={styles.actionBtn} onClick={() => handleEdit(inv)} title="Edit">✏️</button>
                          <button className={styles.actionBtn} onClick={() => handleDelete(inv.id)} title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </>
  );
};

export default Invoices;
