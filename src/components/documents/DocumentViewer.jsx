import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import VersionHistory from './VersionHistory';
import ShareDocument from './ShareDocument';
import styles from './DocumentViewer.module.css';

const DocumentViewer = ({ document, onClose, onDelete, onShare, onDownload, getFileIcon, formatFileSize }) => {
  const [activeTab, setActiveTab] = useState('preview');
  const [showShare, setShowShare] = useState(false);

  if (!document) return null;

  return (
    <Card className={styles.viewerCard}>
      <div className={styles.header}>
        <div>
          <span className={styles.docIcon}>{getFileIcon(document.type)}</span>
          <h3>{document.name}</h3>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'preview' ? styles.active : ''}`} onClick={() => setActiveTab('preview')}>Preview</button>
        <button className={`${styles.tab} ${activeTab === 'details' ? styles.active : ''}`} onClick={() => setActiveTab('details')}>Details</button>
        <button className={`${styles.tab} ${activeTab === 'versions' ? styles.active : ''}`} onClick={() => setActiveTab('versions')}>Versions</button>
      </div>

      <div className={styles.content}>
        {activeTab === 'preview' && (
          <div className={styles.preview}>
            <div className={styles.previewPlaceholder}>
              <span style={{ fontSize: '4rem' }}>{getFileIcon(document.type)}</span>
              <p>Preview not available</p>
              <Button variant="primary" onClick={onDownload}>📥 Download to View</Button>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className={styles.details}>
            <div className={styles.detailRow}><span>Name:</span><span>{document.name}</span></div>
            <div className={styles.detailRow}><span>Type:</span><span>{document.type?.toUpperCase()}</span></div>
            <div className={styles.detailRow}><span>Size:</span><span>{formatFileSize(document.size)}</span></div>
            <div className={styles.detailRow}><span>Version:</span><span>v{document.version}</span></div>
            <div className={styles.detailRow}><span>Uploaded:</span><span>{document.uploadedAt} by {document.uploadedBy}</span></div>
            <div className={styles.detailRow}><span>Status:</span><span>{document.status}</span></div>
            <div className={styles.detailRow}><span>Tags:</span><span>{document.tags?.join(', ') || 'None'}</span></div>
            <div className={styles.detailRow}><span>Shared with:</span><span>{document.shared?.length || 0} people</span></div>
          </div>
        )}

        {activeTab === 'versions' && (
          <VersionHistory documentId={document.id} />
        )}
      </div>

      <div className={styles.actions}>
        <Button variant="danger" size="small" onClick={() => onDelete(document.id)}>🗑️ Delete</Button>
        <Button variant="default" size="small" onClick={() => setShowShare(true)}>↗️ Share</Button>
        <Button variant="primary" size="small" onClick={onDownload}>📥 Download</Button>
      </div>

      {showShare && (
        <ShareDocument document={document} onShare={onShare} onClose={() => setShowShare(false)} />
      )}
    </Card>
  );
};

export default DocumentViewer;
