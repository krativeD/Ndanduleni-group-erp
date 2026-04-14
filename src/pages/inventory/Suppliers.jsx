import React from 'react';
import Layout from '../../components/common/Layout';
import SupplierList from '../../components/inventory/SupplierList';
import { useSuppliers } from '../../hooks/useInventory';
import Loader from '../../components/common/Loader';
import styles from './InventoryStyles.module.css';

const Suppliers = () => {
  const { suppliers, loading, error, deleteSupplier } = useSuppliers();

  const handleEdit = (supplier) => {
    console.log('Edit supplier:', supplier);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      deleteSupplier(id);
    }
  };

  const handleAdd = () => {
    console.log('Add supplier');
  };

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Suppliers</h1>
        </div>

        <SupplierList 
          suppliers={suppliers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </div>
    </Layout>
  );
};

export default Suppliers;
