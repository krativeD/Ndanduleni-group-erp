import React from 'react';
import RFQManagement from '../../components/procurement/RFQManagement';
import { useRFQs } from '../../hooks/useProcurement';
import Loader from '../../components/common/Loader';

const RFQs = () => {
  const { rfqs, loading, addRFQ, updateRFQ, deleteRFQ } = useRFQs();

  if (loading) return <Loader />;
  return (
    <RFQManagement 
      rfqs={rfqs} 
      onAdd={addRFQ} 
      onEdit={updateRFQ} 
      onDelete={deleteRFQ} 
    />
  );
};

export default RFQs;
