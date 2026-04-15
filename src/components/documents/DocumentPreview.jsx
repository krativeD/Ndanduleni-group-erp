import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './DocumentPreview.module.css';

const DocumentPreview = ({ document, onClose, onDownload }) => {
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const isPDF = document.type === 'pdf';
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(document.type);

  return (
    <div className={styles.previewOverlay}>
      <Card className={styles.previewCard}>
        <div className={styles.previewHeader}>
          <div>
            <h3>{document.name}</h3>
            <span className={styles.previewMeta}>
              {formatFileSize(document.size)} • v{document.version} • Uploaded by {document.uploadedBy}
            </span>
          </div>
          <div className={styles.previewActions}>
            <Button variant="primary" size="small" onClick={onDownload}>📥 Download</Button>
            <Button variant="default" size="small" onClick={onClose}>✕ Close</Button>
          </div>
        </div>

        <div className={`${styles.previewContent} ${isPDF ? styles.a4Preview : ''}`}>
          {isPDF && (
            <div className={styles.pdfPreview}>
              <div className={styles.pdfHeader}>
                <img src="/logo.png" alt="Ndanduleni Group" className={styles.pdfLogo} />
                <h2>NDANDULENI GROUP</h2>
                <p>Document Preview - A4 Format</p>
              </div>
              <div className={styles.pdfBody}>
                <div className={styles.documentInfo}>
                  <p><strong>Document:</strong> {document.name}</p>
                  <p><strong>Type:</strong> {document.type?.toUpperCase()}</p>
                  <p><strong>Version:</strong> {document.version}</p>
                  <p><strong>Uploaded:</strong> {document.uploadedAt} by {document.uploadedBy}</p>
                  <p><strong>Status:</strong> {document.status}</p>
                  <p><strong>Tags:</strong> {document.tags?.join(', ') || 'None'}</p>
                </div>
                <div className={styles.pdfContent}>
                  <div className={styles.contentPlaceholder}>
                    <span style={{ fontSize: '3rem' }}>📄</span>
                    <p>PDF Document Preview</p>
                    <p className={styles.hint}>This is an A4 formatted preview. Download to view the full document.</p>
                  </div>
                </div>
              </div>
              <div className={styles.pdfFooter}>
                <p>Ndanduleni Group • 123 Main Street, Sandton, Johannesburg • Tel: +27 11 234 5678</p>
                <p>Generated: {new Date().toLocaleDateString('en-ZA')}</p>
              </div>
            </div>
          )}

          {isImage && (
            <div className={styles.imagePreview}>
              <div className={styles.imagePlaceholder}>
                <span style={{ fontSize: '4rem' }}>🖼️</span>
                <p>Image Preview</p>
                <p className={styles.hint}>Download to view the full image</p>
              </div>
            </div>
          )}

          {!isPDF && !isImage && (
            <div className={styles.genericPreview}>
              <span style={{ fontSize: '4rem' }}>📄</span>
              <p>Preview not available for this file type</p>
              <p className={styles.hint}>Download the file to view its contents</p>
              <Button variant="primary" onClick={onDownload}>📥 Download to View</Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DocumentPreview;
