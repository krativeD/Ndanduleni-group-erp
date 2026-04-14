import React from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import { useCostTracking } from '../../hooks/useManufacturing';
import Loader from '../../components/common/Loader';
import styles from './ManufacturingStyles.module.css';

const Costs = () => {
  const { costs, loading, error } = useCostTracking();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  const totalCost = costs.reduce((sum, c) => sum + c.totalCost, 0);

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Cost Tracking</h1></div>
        <div className={styles.costSummary}>
          <Card className={styles.summaryCard}><span>Total Production Cost</span><h2>R {totalCost.toLocaleString()}</h2></Card>
        </div>
        <Card className={styles.costsCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr><th>Order</th><th>Product</th><th>Qty</th><th>Materials</th><th>Labor</th><th>Overhead</th><th>Total</th><th>Cost/Unit</th></tr>
              </thead>
              <tbody>
                {costs.map(cost => (
                  <tr key={cost.id}>
                    <td>{cost.productionOrder}</td>
                    <td>{cost.product}</td>
                    <td>{cost.quantity}</td>
                    <td>R {cost.materialCost.toFixed(2)}</td>
                    <td>R {cost.laborCost.toFixed(2)}</td>
                    <td>R {cost.overheadCost.toFixed(2)}</td>
                    <td>R {cost.totalCost.toFixed(2)}</td>
                    <td>R {cost.costPerUnit.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Costs;
