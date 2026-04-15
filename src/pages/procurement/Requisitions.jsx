import React from 'react';
import PurchaseRequisition from '../../components/procurement/PurchaseRequisition';
import { useRequisitions } from '../../hooks/useProcurement';
import Loader from '../../components/common/Loader';

const Requisitions = () => {
  const { requisitions, loading, addRequisition, updateRequisition, deleteRequisition, approveRequisition } = useRequisitions();

  if (loading) return <Loader />;
  return (
    <PurchaseRequisition 
      requisitions={requisitions} 
      onAdd={addRequisition} 
      onEdit={updateRequisition} 
      onDelete={deleteRequisition} 
      onApprove={approveRequisition} 
    />
  );
};

export default Requisitions;
