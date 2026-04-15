import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from './ReportsStyles.module.css';

const Custom = () => {
  const [reportConfig, setReportConfig] = useState({
    name: '', type: 'sales', dateRange: 'month', fields: ['revenue', 'orders']
  });

  const handleGenerate = () => console.log('Generate custom report:', reportConfig);

  return (
    <Card className={styles.customCard}>
      <h2>Custom Report Builder</h2>
      <div className={styles.formGrid}>
        <Input label="Report Name" value={reportConfig.name} onChange={(e) => setReportConfig({...reportConfig, name: e.target.value})} />
        <select className={styles.select} value={reportConfig.type} onChange={(e) => setReportConfig({...reportConfig, type: e.target.value})}>
          <option value="sales">Sales</option><option value="financial">Financial</option><option value="inventory">Inventory</option><option value="hr">HR</option><option value="services">Services</option>
        </select>
        <select className={styles.select} value={reportConfig.dateRange} onChange={(e) => setReportConfig({...reportConfig, dateRange: e.target.value})}>
          <option value="week">This Week</option><option value="month">This Month</option><option value="quarter">This Quarter</option><option value="year">This Year</option>
        </select>
      </div>
      <div className={styles.actions}>
        <Button variant="primary" onClick={handleGenerate}>Generate Report</Button>
      </div>
    </Card>
  );
};

export default Custom;
