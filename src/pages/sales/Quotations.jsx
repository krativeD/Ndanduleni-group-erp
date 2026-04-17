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
  const { quotations, loading, error, addQuotation, updateQuotation, deleteQuotation } = useQuotations();
  const { convertQuotationToInvoice } = useInvoices();
  const [showForm, setShowForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [viewingQuotation, setViewingQuotation] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [view, setView] = useState('all');
  const [converting, setConverting] = useState(false);

  const stats = {
    total: quotations.length,
    draft: quotations.filter(q => q.status === 'draft').length,
    sent: quotations.filter(q => q.status === 'sent').length,
    accepted: quotations.filter(q => q.status === 'accepted').length,
    totalValue: quotations.filter(q => q.status === 'accepted').reduce((sum, q) => sum + (q.total || 0), 0)
  };

  const formatCurrency = (amount) => `R ${amount?.toLocaleString('en-ZA', { minimumFractionDigits: 2 }) || '0.00'}`;

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
    const currentQuote = quotations.find(q => q.id === quote.id) || quote;
    setViewingQuotation(currentQuote);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quotation? This action cannot be undone.')) {
      try {
        await deleteQuotation(id);
        setSuccessMessage('✅ Quotation deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        alert('Failed to delete quotation: ' + err.message);
      }
    }
  };

  const handleConvertToInvoice = async (quotation) => {
    if (window.confirm(`Convert quotation ${quotation.quote_number} to invoice?\n\nThis will:\n• Remove the quotation from this list\n• Create a new invoice\n• Transfer all data to the invoice`)) {
      setConverting(true);
      try {
        const newInvoice = await convertQuotationToInvoice(quotation);
        setSuccessMessage(`✅ Quotation converted to Invoice ${newInvoice.invoice_number} successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        
        // Ask if user wants to view the new invoice
        if (window.confirm('Quotation converted successfully! Would you like to view the new invoice?')) {
          navigate('/sales/invoices');
        }
      } catch (err) {
        alert('Failed to convert quotation: ' + err.message);
      } finally {
        setConverting(false);
      }
    }
  };

  const handlePrintSuccess = (id, updates) => {
    setView('all');
    updateQuotation(id, updates);
    setSuccessMessage('✅ Quotation printed successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCloseView = () => {
    setViewingQuotation(null);
  };

  const handleSubmit = async (data) => {
    try {
      if (editingQuotation) {
        await updateQuotation(editingQuotation.id, data);
        setSuccessMessage('✅ Quotation updated successfully!');
      } else {
        await addQuotation(data);
        setSuccessMessage('✅ Quotation created successfully!');
      }
      setTimeout(() => setSuccessMessage(''), 3000);
      setShowForm(false);
      setEditingQuotation(null);
    } catch (err) {
      alert('Failed to save quotation: ' + err.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const filteredQuotations = quotations.filter(q => 
    view === 'all' || 
    (view === 'active' && q.status !== 'converted' && q.status !== 'rejected') ||
    q.status === view
  );

  return (
    <div className={styles.quotationsContainer}>
      {successMessage && (
        <div className={styles.successToast}>{successMessage}</div>
      )}

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <span className={styles.statIcon}>📄</span>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Active Quotes</span>
            <span className={styles.statValue}>{stats.total}</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statIcon}>📝</span>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Draft</span>
            <span className={styles.statValue}>{stats.draft}</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statIcon}>📤</span>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Sent</span>
            <span className={styles.statValue}>{stats.sent}</span>
          </div>
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statIcon}>✅</span>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Accepted</span>
            <span className={styles.statValue}>{stats.accepted}</span>
          </div>
        </Card>
        <Card className={`${styles.statCard} ${styles.statHighlight}`}>
          <span className={styles.statIcon}>💰</span>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Pipeline Value</span>
            <span className={styles.statValue}>{formatCurrency(stats.totalValue)}</span>
          </div>
        </Card>
      </div>

      {/* View Toggle */}
      <div className={styles.viewToggle}>
        <button className={`${styles.viewBtn} ${view === 'all' ? styles.active : ''}`} onClick={() => setView('all')}>
          All Quotes
        </button>
        <button className={`${styles.viewBtn} ${view === 'active' ? styles.active : ''}`} onClick={() => setView('active')}>
          Active
        </button>
        <button className={`${styles.viewBtn} ${view === 'draft' ? styles.active : ''}`} onClick={() => setView('draft')}>
          Draft
        </button>
        <button className={`${styles.viewBtn} ${view === 'sent' ? styles.active : ''}`} onClick={() => setView('sent')}>
          Sent
        </button>
        <button className={`${styles.viewBtn} ${view === 'accepted' ? styles.active : ''}`} onClick={() => setView('accepted')}>
          Accepted
        </button>
      </div>

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
            <Button variant="primary" onClick={handleAdd}>+ Create Quotation</Button>
          </div>
          <Card className={styles.quoteCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Quote #</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Valid Until</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotations.map(q => (
                    <tr key={q.id}>
                      <td className={styles.quoteNumber}>{q.quote_number}</td>
                      <td>{q.customer}</td>
                      <td>{q.date}</td>
                      <td>{q.valid_until}</td>
                      <td>{q.items || (q.line_items?.length || 0)}</td>
                      <td className={styles.amount}>{formatCurrency(q.total)}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusBadge(q.status)}`}>
                          {q.status}
                        </span>
                        {q.last_printed && (
                          <span className={styles.printedBadge} title={`Last printed: ${new Date(q.last_printed).toLocaleString()}`}>
                            🖨️
                          </span>
                        )}
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} onClick={() => handleView(q)} title="View/Print">👁️</button>
                          <button className={styles.actionBtn} onClick={() => handleEdit(q)} title="Edit">✏️</button>
                          <button className={styles.actionBtn} onClick={() => handleConvertToInvoice(q)} title="Convert to Invoice" style={{ background: '#10b981', color: 'white' }}>📄→🧾</button>
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

      {/* Modal */}
      {viewingQuotation && (
        <QuotationView 
          quotation={viewingQuotation} 
          onClose={handleCloseView}
          onPrintSuccess={handlePrintSuccess}
        />
      )}
      
      {/* Converting overlay */}
      {converting && (
        <div className={styles.modalOverlay}>
          <Card className={styles.formCard}>
            <h4>⏳ Converting to Invoice...</h4>
            <p>Please wait while we process your request.</p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Quotations;
