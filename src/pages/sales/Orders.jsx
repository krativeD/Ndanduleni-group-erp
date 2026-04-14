import React, { useState } from 'react';
import OrderList from '../../components/sales/OrderList';
import OrderForm from '../../components/sales/OrderForm';
import { useOrders } from '../../hooks/useSales';
import Loader from '../../components/common/Loader';
import styles from './SalesStyles.module.css';

const Orders = () => {
  const { orders, loading, error, addOrder, updateOrder, deleteOrder } = useOrders();
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const handleAdd = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id);
    }
  };

  const handleSubmit = (data) => {
    if (editingOrder) {
      updateOrder(editingOrder.id, data);
    } else {
      addOrder(data);
    }
    setShowForm(false);
    setEditingOrder(null);
  };

  if (loading) return <Loader />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <>
      {showForm ? (
        <OrderForm 
          order={editingOrder}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingOrder(null);
          }}
        />
      ) : (
        <OrderList 
          orders={orders} 
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Orders;
