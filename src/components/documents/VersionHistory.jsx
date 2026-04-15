import React from 'react';
import { useVersionHistory } from '../../hooks/useDocuments';
import Loader from '../common/Loader';
import styles from './VersionHistory.module.css';

const VersionHistory = ({ documentId }) => {
  const { versions, loading } = useVersionHistory(documentId);

  if (loading) return <Loader />;

  return (
    <div className={styles.versionList}>
      <div className={styles.versionItem + ' ' + styles.current}>
        <span className={styles.version}>Current Version</span>
        <span className={styles.date}>-</span>
        <span className={styles.user}>-</span>
      </div>
      {versions.map(v => (
        <div key={v.id} className={styles.versionItem}>
          <span className={styles.version}>v{v.version}</span>
          <span className={styles.date}>{v.uploadedAt}</span>
          <span className={styles.user}>{v.uploadedBy}</span>
          <span className={styles.notes}>{v.notes}</span>
          <button className={styles.downloadBtn}>📥</button>
        </div>
      ))}
      {versions.length === 0 && <p className={styles.noVersions}>No previous versions</p>}
    </div>
  );
};

export default VersionHistory;
