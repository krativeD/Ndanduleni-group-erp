import React, { useState } from 'react';
import SalesReport from '../../components/reports/SalesReport';
import ExportTools from '../../components/reports/ExportTools';
import { useSalesReport } from '../../hooks/useReports';
import Loader from '../../components/common/Loader';
import styles from './ReportsStyles.module.css';

const Sales = () => {
  const { data, loading } = useSalesReport();
  const [showExport, setShowExport] = useState(false);

  const handleExport = (format, reportType) => console.log(`Export ${reportType} as ${format}`);
  const handlePrint = () => window.print();
  const handleSchedule = () => console.log('Schedule report');

  if (loading) return <Loader />;

  return (
    <div className={styles.reportPage}>
      <SalesReport data={data} onExport={() => setShowExport(!showExport)} onPrint={handlePrint} />
      {showExport && <ExportTools onExport={handleExport} onSchedule={handleSchedule} reportType="sales" />}
    </div>
  );
};

export default Sales;
