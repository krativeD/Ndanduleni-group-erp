import React from 'react';
import Card from '../../components/common/Card';
import { useDocuments } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Archive = () => {
  const { documents, loading, getFileIcon, formatFileSize } = useDocuments();
  const archivedDocs = documents.filter(d => d.status === 'archived');

  if (loading) return <Loader />;

  return (
    <Card className={styles.archiveCard}>
      <h3>Archived Documents</h3>
      <div className={styles.docGrid}>
        {archivedDocs.map(doc => (
          <div key={doc.id} className={styles.docItem}>
            <span className={styles.docIcon}>{getFileIcon(doc.type)}</span>
            <span className={styles.docName}>{doc.name}</span>
            <span className={styles.docMeta}>{formatFileSize(doc.size)}</span>
          </div>
        ))}
        {archivedDocs.length === 0 && <p className={styles.empty}>No archived documents</p>}
      </div>
    </Card>
  );
};

export default Archive;
