import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './BillOfMaterials.module.css';

const BillOfMaterials = ({ boms, products, onView }) => {
  const [expandedBOM, setExpandedBOM] = useState(null);

  const getProductName = (productId) => {
    return products.find(p => p.id === productId)?.name || 'Unknown';
  };

  return (
    <Card className={styles.bomCard}>
      <div className={styles.header}>
        <h3>Bill of Materials</h3>
        <Button variant="primary" size="small">+ Create BOM</Button>
      </div>

      <div className={styles.bomList}>
        {boms.map(bom => (
          <div key={bom.id} className={styles.bomItem}>
            <div 
              className={styles.bomHeader}
              onClick={() => setExpandedBOM(expandedBOM === bom.id ? null : bom.id)}
            >
              <div>
                <span className={styles.bomName}>{bom.productName}</span>
                <span className={styles.componentCount}>{bom.components.length} components</span>
              </div>
              <span className={styles.expandIcon}>{expandedBOM === bom.id ? '▼' : '▶'}</span>
            </div>

            {expandedBOM === bom.id && (
              <div className={styles.bomDetails}>
                <table className={styles.componentsTable}>
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bom.components.map((comp, idx) => (
                      <tr key={idx}>
                        <td>{comp.materialName}</td>
                        <td>{comp.quantity}</td>
                        <td>{comp.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.bomActions}>
                  <Button variant="default" size="small" onClick={() => onView(bom)}>View Details</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BillOfMaterials;
