import React, { useState } from 'react';
import HRReport from '../../components/reports/HRReport';
import ExportTools from '../../components/reports/ExportTools';
import { useHRReport } from '../../hooks/useReports';
import Loader from '../../components/common/Loader';
import styles from './ReportsStyles.module.css';

const HR = () => {
  const { data, loading } = useHRReport();
  const [showExport, setShowExport] = useState(false);

  const handleExport = (format, reportType) => console.log(`Export ${reportType} as ${format}`);
  const handlePrint = () => window.print();
  const handleSchedule = () => console.log('Schedule report');

  if (loading) return <Loader />;

  return (
    <div className={styles.reportPage}>
      <HRReport data={data} onExport={() => setShowExport(!showExport)} onPrint={handlePrint} />
      {showExport && <ExportTools onExport={handleExport} onSchedule={handleSchedule} reportType="hr" />}
    </div>
  );
};

export default HR;
