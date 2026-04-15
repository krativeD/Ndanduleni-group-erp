import React from 'react';
import SupplierManagement from '../../components/procurement/SupplierManagement';
import { useSuppliers } from '../../hooks/useProcurement';
import Loader from '../../components/common/Loader';

const Suppliers = () => {
  const { suppliers, loading, addSupplier, updateSupplier, deleteSupplier } = useSuppliers();

  if (loading) return <Loader />;
  return (
    <SupplierManagement 
      suppliers={suppliers} 
      onAdd={addSupplier} 
      onEdit={updateSupplier} 
      onDelete={deleteSupplier} 
    />
  );
};

export default Suppliers;
