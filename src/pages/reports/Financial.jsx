import React, { useState } from 'react';
import FinancialReport from '../../components/reports/FinancialReport';
import ExportTools from '../../components/reports/ExportTools';
import { useFinancialReport } from '../../hooks/useReports';
import Loader from '../../components/common/Loader';
import styles from './ReportsStyles.module.css';

const Financial = () => {
  const { data, loading } = useFinancialReport();
  const [showExport, setShowExport] = useState(false);

  const handleExport = (format, reportType) => console.log(`Export ${reportType} as ${format}`);
  const handlePrint = () => window.print();
  const handleSchedule = () => console.log('Schedule report');

  if (loading) return <Loader />;

  return (
    <div className={styles.reportPage}>
      <FinancialReport data={data} onExport={() => setShowExport(!showExport)} onPrint={handlePrint} />
      {showExport && <ExportTools onExport={handleExport} onSchedule={handleSchedule} reportType="financial" />}
    </div>
  );
};

export default Financial;
