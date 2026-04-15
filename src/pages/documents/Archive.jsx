import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useArchive } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Archive = () => {
  const { documents, loading, unarchiveDocument, getFileIcon, formatFileSize } = useArchive();

  const handleUnarchive = (id) => {
    if (window.confirm('Restore this document from archive?')) {
      unarchiveDocument(id);
    }
  };

  if (loading) return <Loader />;

  return (
    <Card className={styles.archiveCard}>
      <div className={styles.header}>
        <h3>Archived Documents</h3>
        <span className={styles.count}>{documents.length} documents</span>
      </div>
      
      {documents.length === 0 ? (
        <p className={styles.empty}>No archived documents</p>
      ) : (
        <div className={styles.docGrid}>
          {documents.map(doc => (
            <div key={doc.id} className={styles.docItem}>
              <span className={styles.docIcon}>{getFileIcon(doc.type)}</span>
              <span className={styles.docName}>{doc.name}</span>
              <span className={styles.docMeta}>{formatFileSize(doc.size)} • v{doc.version}</span>
              <span className={styles.docMeta}>Archived: {doc.uploadedAt}</span>
              <div className={styles.archiveActions}>
                <Button size="small" variant="primary" onClick={() => handleUnarchive(doc.id)}>↩️ Restore</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Archive;
