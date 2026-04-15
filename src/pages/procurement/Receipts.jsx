import React from 'react';
import GoodsReceipt from '../../components/procurement/GoodsReceipt';
import { useReceipts, usePurchaseOrders } from '../../hooks/useProcurement';
import Loader from '../../components/common/Loader';

const Receipts = () => {
  const { receipts, loading, addReceipt, deleteReceipt } = useReceipts();
  const { orders } = usePurchaseOrders();

  if (loading) return <Loader />;
  return (
    <GoodsReceipt 
      receipts={receipts} 
      orders={orders} 
      onAdd={addReceipt} 
      onDelete={deleteReceipt} 
    />
  );
};

export default Receipts;
