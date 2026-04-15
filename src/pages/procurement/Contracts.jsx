import React from 'react';
import ContractManagement from '../../components/procurement/ContractManagement';
import { useContracts, useSuppliers } from '../../hooks/useProcurement';
import Loader from '../../components/common/Loader';

const Contracts = () => {
  const { contracts, loading, addContract, updateContract, deleteContract } = useContracts();
  const { suppliers } = useSuppliers();

  if (loading) return <Loader />;
  return (
    <ContractManagement 
      contracts={contracts} 
      suppliers={suppliers} 
      onAdd={addContract} 
      onEdit={updateContract} 
      onDelete={deleteContract} 
    />
  );
};

export default Contracts;
