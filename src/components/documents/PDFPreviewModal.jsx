import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Loader from '../common/Loader';
import styles from './PDFPreviewModal.module.css';

const PDFPreviewModal = ({ document, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    
    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timer);
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPDFUrl = () => {
    // For demo purposes, use a sample PDF or generate one
    if (document.type === 'pdf') {
      // Using a reliable sample PDF for demo
      return 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    }
    return null;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const pdfUrl = getPDFUrl();

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.documentInfo}>
            <h3>{document.name}</h3>
            <span className={styles.docMeta}>
              {formatFileSize(document.size)} • v{document.version} • {document.uploadedAt}
            </span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {loading && (
            <div className={styles.loaderContainer}>
              <Loader />
              <p>Loading document...</p>
            </div>
          )}

          {!loading && pdfUrl && (
            <iframe
              src={pdfUrl}
              className={styles.pdfViewer}
              title={document.name}
              onError={() => setError('Failed to load PDF')}
            />
          )}

          {!loading && !pdfUrl && (
            <div className={styles.fallbackPreview}>
              <div className={styles.previewPlaceholder}>
                <span style={{ fontSize: '4rem' }}>📄</span>
                <h4>Preview Not Available</h4>
                <p>This file type ({document.type?.toUpperCase()}) cannot be previewed directly.</p>
                <p className={styles.hint}>Download the file to view its contents.</p>
                <button className={styles.downloadBtn} onClick={() => alert('Download started...')}>
                  📥 Download {document.name}
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className={styles.errorContainer}>
              <span>⚠️</span>
              <p>{error}</p>
              <button onClick={() => window.open(pdfUrl, '_blank')}>Open in new tab</button>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <span className={styles.footerText}>Ndanduleni Group • Document Preview</span>
          <button className={styles.downloadFooterBtn} onClick={() => alert('Download started...')}>
            📥 Download
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PDFPreviewModal;
