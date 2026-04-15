import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './ExportTools.module.css';

const ExportTools = ({ onExport, onSchedule, reportType }) => {
  const formats = ['PDF', 'Excel', 'CSV', 'JSON'];

  return (
    <Card className={styles.exportCard}>
      <h3>Export Options</h3>
      <div className={styles.formatGrid}>
        {formats.map(fmt => (
          <Button key={fmt} variant="default" size="small" onClick={() => onExport(fmt, reportType)}>
            📄 Export as {fmt}
          </Button>
        ))}
      </div>
      <div className={styles.scheduleSection}>
        <Button variant="primary" onClick={onSchedule}>📅 Schedule Report</Button>
      </div>
    </Card>
  );
};

export default ExportTools;
