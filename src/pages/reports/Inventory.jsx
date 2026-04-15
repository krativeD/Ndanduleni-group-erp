import React, { useState } from 'react';
import InventoryReport from '../../components/reports/InventoryReport';
import ExportTools from '../../components/reports/ExportTools';
import { useInventoryReport } from '../../hooks/useReports';
import Loader from '../../components/common/Loader';
import styles from './ReportsStyles.module.css';

const Inventory = () => {
  const { data, loading } = useInventoryReport();
  const [showExport, setShowExport] = useState(false);

  const handleExport = (format, reportType) => console.log(`Export ${reportType} as ${format}`);
  const handlePrint = () => window.print();
  const handleSchedule = () => console.log('Schedule report');

  if (loading) return <Loader />;

  return (
    <div className={styles.reportPage}>
      <InventoryReport data={data} onExport={() => setShowExport(!showExport)} onPrint={handlePrint} />
      {showExport && <ExportTools onExport={handleExport} onSchedule={handleSchedule} reportType="inventory" />}
    </div>
  );
};

export default Inventory;
