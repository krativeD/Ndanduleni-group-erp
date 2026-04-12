import React from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import styles from './CRMStyles.module.css';

const Reports = () => {
  const reportTypes = [
    { id: 1, name: 'Sales Pipeline Report', description: 'Overview of leads and deals by stage' },
    { id: 2, name: 'Contact Activity Report', description: 'Communication and engagement summary' },
    { id: 3, name: 'Revenue Forecast', description: 'Projected revenue from active deals' },
    { id: 4, name: 'Lead Source Analysis', description: 'Where leads are coming from' }
  ];

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>CRM Reports</h1>
          <Button variant="primary">Generate Report</Button>
        </div>

        <div className={styles.reportsGrid}>
          {reportTypes.map(report => (
            <Card key={report.id} className={styles.reportCard}>
              <h3>{report.name}</h3>
              <p>{report.description}</p>
              <Button variant="default" size="small">View Report</Button>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
