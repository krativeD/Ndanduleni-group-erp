import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import PaymentForm from '../../components/sales/PaymentForm';
import { usePayments } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Payments = () => {
  const { payments, loading, addPayment, deletePayment } = usePayments();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => setShowForm(true);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      deletePayment(id);
    }
  };

  const handleSubmit = (data) => {
    addPayment(data);
    setShowForm(false);
  };

  if (loading) return <Loader />;

  const totalReceived = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <>
      {showForm ? (
        <PaymentForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
      ) : (
        <>
          <div className={styles.subHeader}>
            <Button variant="primary" onClick={handleAdd}>+ Record Payment</Button>
          </div>
          <Card className={styles.paymentCard}>
            <div className={styles.summary}>
              <span>Total Received: <strong>R {totalReceived.toLocaleString()}</strong></span>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead><tr><th>Invoice</th><th>Customer</th><th>Amount</th><th>Method</th><th>Date</th><th>Reference</th><th>Actions</th></tr></thead>
                <tbody>
                  {payments.map(p => (
                    <tr key={p.id}>
                      <td>{p.invoice}</td><td>{p.customer}</td><td>R {p.amount.toLocaleString()}</td><td>{p.method}</td><td>{p.date}</td><td>{p.reference}</td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} onClick={() => handleDelete(p.id)}>🗑️</button>
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

export default Payments;
