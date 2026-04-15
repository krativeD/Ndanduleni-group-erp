import React from 'react';
import PurchaseOrder from '../../components/procurement/PurchaseOrder';
import { usePurchaseOrders, useSuppliers } from '../../hooks/useProcurement';
import Loader from '../../components/common/Loader';

const Orders = () => {
  const { orders, loading, addOrder, updateOrder, deleteOrder, approveOrder, sendOrder } = usePurchaseOrders();
  const { suppliers } = useSuppliers();

  if (loading) return <Loader />;
  return (
    <PurchaseOrder 
      orders={orders} 
      suppliers={suppliers} 
      onAdd={addOrder} 
      onEdit={updateOrder} 
      onDelete={deleteOrder} 
      onApprove={approveOrder} 
      onSend={sendOrder} 
    />
  );
};

export default Orders;
