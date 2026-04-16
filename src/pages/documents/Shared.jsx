import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import PDFPreviewModal from '../../components/documents/PDFPreviewModal';
import { useSharedDocuments, useDocuments } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Shared = () => {
  const { documents, loading, refresh, getFileIcon, formatFileSize } = useSharedDocuments();
  const { shareDocument, deleteDocument } = useDocuments();
  const [previewDocument, setPreviewDocument] = useState(null);

  const handleRemoveShare = (doc) => {
    if (window.confirm(`Remove sharing for "${doc.name}"?`)) {
      shareDocument(doc.id, []);
      refresh();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this document?')) {
      deleteDocument(id);
      refresh();
    }
  };

  const handleView = (doc) => {
    setPreviewDocument(doc);
  };

  if (loading) return <Loader />;

  return (
    <>
      <Card className={styles.sharedCard}>
        <div className={styles.header}>
          <h3>Shared Documents</h3>
          <span className={styles.count}>{documents.length} documents</span>
        </div>

        {documents.length === 0 ? (
          <p className={styles.empty}>No documents shared with you</p>
        ) : (
          <div className={styles.docGrid}>
            {documents.map(doc => (
              <div key={doc.id} className={styles.docItem}>
                <span className={styles.docIcon}>{getFileIcon(doc.type)}</span>
                <span className={styles.docName}>{doc.name}</span>
                <span className={styles.docMeta}>{formatFileSize(doc.size)} • Shared by {doc.uploadedBy}</span>
                <span className={styles.docMeta}>Shared with: {doc.shared?.length || 0} people</span>
                <div className={styles.sharedActions}>
                  <button className={styles.previewBtn} onClick={() => handleView(doc)} title="Preview">👁️</button>
                  <Button size="small" variant="default" onClick={() => handleRemoveShare(doc)}>🔒 Unshare</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
      
      {previewDocument && (
        <PDFPreviewModal 
          document={previewDocument} 
          onClose={() => setPreviewDocument(null)} 
        />
      )}
    </>
  );
};

export default Shared;
