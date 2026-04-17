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
  const [successMessage, setSuccessMessage] = useState('');

  const getStatusBadge = (status) => {
    const badges = { 
      'draft': styles.statusDraft, 
      'sent': styles.statusSent, 
      'accepted': styles.statusAccepted, 
      'rejected': styles.statusRejected,
      'converted': styles.statusConverted
    };
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
    if (window.confirm('Are you sure you want to delete this quotation? This action cannot be undone.')) {
      deleteQuotation(id);
    }
  };

  const handleConvertToInvoice = (quotation) => {
    if (window.confirm(`Convert quotation ${quotation.quoteNumber} to invoice? This will mark the quotation as converted.`)) {
      const newInvoice = convertQuotationToInvoice(quotation);
      // Mark quotation as converted (does NOT delete it)
      updateQuotation(quotation.id, { status: 'converted' });
      alert(`✅ Quotation converted to Invoice ${newInvoice.invoiceNumber} successfully!`);
      navigate('/sales/invoices');
    }
  };

  const handlePrintSuccess = (id, updates) => {
    // Only update lastPrinted timestamp - does NOT change status or delete
    updateQuotation(id, updates);
    setSuccessMessage('Quotation printed successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
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

  // Show quotation view if viewing - QUOTATION REMAINS VISIBLE IN BACKGROUND
  if (viewingQuotation) {
    return (
      <>
        {/* The quotation list is still there, just hidden by the modal */}
        <QuotationView 
          quotation={viewingQuotation} 
          onClose={() => setViewingQuotation(null)}
          onPrintSuccess={handlePrintSuccess}
        />
      </>
    );
  }

  return (
    <>
      {successMessage && (
        <div className={styles.successToast}>
          ✅ {successMessage}
        </div>
      )}

      {showForm ? (
        <QuotationForm 
          quotation={editingQuotation} 
          onSubmit={handleSubmit} 
          onCancel={() => { 
            setShowForm(false); 
            setEditingQuotation(null); 
          }}
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
                    <tr key={q.id} className={q.status === 'converted' ? styles.convertedRow : ''}>
                      <td>{q.quoteNumber}</td>
                      <td>{q.customer}</td>
                      <td>{q.date}</td>
                      <td>{q.items}</td>
                      <td>R {q.total?.toLocaleString()}</td>
                      <td>{q.validUntil}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusBadge(q.status)}`}>
                          {q.status}
                        </span>
                        {q.lastPrinted && (
                          <span className={styles.printedBadge} title={`Last printed: ${new Date(q.lastPrinted).toLocaleString()}`}>
                            🖨️
                          </span>
                        )}
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button 
                            className={styles.actionBtn} 
                            onClick={() => handleView(q)} 
                            title="View/Print"
                          >
                            👁️
                          </button>
                          {q.status !== 'converted' && (
                            <>
                              <button 
                                className={styles.actionBtn} 
                                onClick={() => handleEdit(q)} 
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button 
                                className={styles.actionBtn} 
                                onClick={() => handleDelete(q.id)} 
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </>
                          )}
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
