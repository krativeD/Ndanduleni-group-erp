import React from 'react';
import Layout from '../../components/common/Layout';
import ProductCatalog from '../../components/manufacturing/ProductCatalog';
import { useProducts } from '../../hooks/useManufacturing';
import Loader from '../../components/common/Loader';
import styles from './ManufacturingStyles.module.css';

const Products = () => {
  const { products, loading, error, updateProduct, deleteProduct, addProduct } = useProducts();

  const handleEdit = (product) => console.log('Edit product:', product);
  const handleDelete = (id) => { if (window.confirm('Delete this product?')) deleteProduct(id); };
  const handleAdd = () => console.log('Add product');

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Product Catalog</h1></div>
        <ProductCatalog products={products} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
      </div>
    </Layout>
  );
};

export default Products;
