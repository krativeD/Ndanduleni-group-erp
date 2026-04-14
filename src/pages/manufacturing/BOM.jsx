import React from 'react';
import Layout from '../../components/common/Layout';
import BillOfMaterials from '../../components/manufacturing/BillOfMaterials';
import { useBOMs, useProducts } from '../../hooks/useManufacturing';
import Loader from '../../components/common/Loader';
import styles from './ManufacturingStyles.module.css';

const BOM = () => {
  const { boms, loading: bomsLoading } = useBOMs();
  const { products, loading: productsLoading } = useProducts();

  if (bomsLoading || productsLoading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Bill of Materials</h1></div>
        <BillOfMaterials boms={boms} products={products} onView={(bom) => console.log('View BOM:', bom)} />
      </div>
    </Layout>
  );
};

export default BOM;
