import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import QuotationForm from '../../components/sales/QuotationForm';
import QuotationView from '../../components/sales/QuotationView';
import { useQuotations, useInvoices } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Quotations = () => {
  const navigate = useNavigate();
  const { quotations, loading, addQuotation, updateQuotation, deleteQuotation } = useQuotations();
  const { convertQuotationToInvoice } = useInvoices();
  const [showForm, setShowForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [viewingQuotation, setViewingQuotation] = useState(null);

  const getStatusBadge = (status) => {
    const badges = { 'draft': styles.statusDraft, 'sent': styles.statusSent, 'accepted': styles.statusAccepted, 'rejected': styles.statusRejected };
    return badges[status] || styles.statusDraft;
  };

  const handleAdd = () => {
    setEditingQuotation(null);
    setShowForm(true);
  };

  const handleEdit = (quote) => {
    setEditingQuotation(quote);
    setShowForm(true);
  };

  const handleView = (quote) => {
    setViewingQuotation(quote);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      deleteQuotation(id);
    }
  };

  const handleConvertToInvoice = (quotation) => {
    if (window.confirm(`Convert quotation ${quotation.quoteNumber} to invoice?`)) {
      const newInvoice = convertQuotationToInvoice(quotation);
      alert(`Invoice ${newInvoice.invoiceNumber} created successfully!`);
      navigate('/sales/invoices');
    }
  };

  const handleSubmit = (data) => {
    if (editingQuotation) {
      updateQuotation(editingQuotation.id, data);
    } else {
      addQuotation(data);
    }
    setShowForm(false);
    setEditingQuotation(null);
  };

  if (loading) return <Loader />;

  // Show quotation view if viewing
  if (viewingQuotation) {
    return (
      <QuotationView 
        quotation={viewingQuotation} 
        onClose={() => setViewingQuotation(null)} 
      />
    );
  }

  return (
    <>
      {showForm ? (
        <QuotationForm 
          quotation={editingQuotation} 
          onSubmit={handleSubmit} 
          onCancel={() => { setShowForm(false); setEditingQuotation(null); }}
          onConvertToInvoice={editingQuotation ? () => handleConvertToInvoice(editingQuotation) : null}
        />
      ) : (
        <>
          <div className={styles.subHeader}>
            <Button variant="primary" onClick={handleAdd}>+ New Quotation</Button>
          </div>
          <Card className={styles.quoteCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Quote #</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Valid Until</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map(q => (
                    <tr key={q.id}>
                      <td>{q.quoteNumber}</td>
                      <td>{q.customer}</td>
                      <td>{q.date}</td>
                      <td>{q.items}</td>
                      <td>R {q.total.toLocaleString()}</td>
                      <td>{q.validUntil}</td>
                      <td><span className={`${styles.statusBadge} ${getStatusBadge(q.status)}`}>{q.status}</span></td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} onClick={() => handleView(q)} title="View/Print">👁️</button>
                          <button className={styles.actionBtn} onClick={() => handleEdit(q)} title="Edit">✏️</button>
                          <button className={styles.actionBtn} onClick={() => handleDelete(q.id)} title="Delete">🗑️</button>
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

export default Quotations;
