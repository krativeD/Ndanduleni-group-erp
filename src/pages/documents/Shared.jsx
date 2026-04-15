import React from 'react';
import Card from '../../components/common/Card';
import { useDocuments } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Shared = () => {
  const { documents, loading, getFileIcon, formatFileSize } = useDocuments();
  const sharedDocs = documents.filter(d => d.shared && d.shared.length > 0);

  if (loading) return <Loader />;

  return (
    <Card className={styles.sharedCard}>
      <h3>Shared with me</h3>
      <div className={styles.docGrid}>
        {sharedDocs.map(doc => (
          <div key={doc.id} className={styles.docItem}>
            <span className={styles.docIcon}>{getFileIcon(doc.type)}</span>
            <span className={styles.docName}>{doc.name}</span>
            <span className={styles.docMeta}>{formatFileSize(doc.size)} • Shared by {doc.uploadedBy}</span>
          </div>
        ))}
        {sharedDocs.length === 0 && <p className={styles.empty}>No documents shared with you</p>}
      </div>
    </Card>
  );
};

export default Shared;
