import React, { useState } from 'react';
import ServiceReport from '../../components/reports/ServiceReport';
import ExportTools from '../../components/reports/ExportTools';
import { useServiceReport } from '../../hooks/useReports';
import Loader from '../../components/common/Loader';
import styles from './ReportsStyles.module.css';

const Services = () => {
  const { data, loading } = useServiceReport();
  const [showExport, setShowExport] = useState(false);

  const handleExport = (format, reportType) => console.log(`Export ${reportType} as ${format}`);
  const handlePrint = () => window.print();
  const handleSchedule = () => console.log('Schedule report');

  if (loading) return <Loader />;

  return (
    <div className={styles.reportPage}>
      <ServiceReport data={data} onExport={() => setShowExport(!showExport)} onPrint={handlePrint} />
      {showExport && <ExportTools onExport={handleExport} onSchedule={handleSchedule} reportType="services" />}
    </div>
  );
};

export default Services;
