import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import QuotationForm from '../../components/sales/QuotationForm';
import { useQuotations } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Quotations = () => {
  const { quotations, loading, addQuotation, updateQuotation, deleteQuotation } = useQuotations();
  const [showForm, setShowForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState(null);

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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quotation?')) {
      deleteQuotation(id);
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

  return (
    <>
      {showForm ? (
        <QuotationForm quotation={editingQuotation} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingQuotation(null); }} />
      ) : (
        <>
          <div className={styles.subHeader}>
            <Button variant="primary" onClick={handleAdd}>+ New Quotation</Button>
          </div>
          <Card className={styles.quoteCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead><tr><th>Quote #</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Valid Until</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {quotations.map(q => (
                    <tr key={q.id}>
                      <td>{q.quoteNumber}</td><td>{q.customer}</td><td>{q.date}</td><td>{q.items}</td><td>R {q.total.toLocaleString()}</td><td>{q.validUntil}</td>
                      <td><span className={`${styles.statusBadge} ${getStatusBadge(q.status)}`}>{q.status}</span></td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} onClick={() => handleEdit(q)}>✏️</button>
                          <button className={styles.actionBtn} onClick={() => handleDelete(q.id)}>🗑️</button>
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
