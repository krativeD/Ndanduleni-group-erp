import React, { useState } from 'react';
import DocumentList from '../../components/documents/DocumentList';
import FolderTree from '../../components/documents/FolderTree';
import DocumentUploader from '../../components/documents/DocumentUploader';
import PDFPreviewModal from '../../components/documents/PDFPreviewModal';
import { useFolders, useDocuments } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const MyDocuments = () => {
  const { folders, loading: foldersLoading, addFolder } = useFolders();
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { documents, loading: docsLoading, uploadDocument, deleteDocument, shareDocument, getFileIcon, formatFileSize } = useDocuments(selectedFolder);
  const [showUploader, setShowUploader] = useState(false);
  const [previewDocument, setPreviewDocument] = useState(null);

  const handleUpload = (doc) => {
    uploadDocument(doc);
    setShowUploader(false);
  };

  const handleView = (doc) => {
    setPreviewDocument(doc);
  };

  if (foldersLoading || docsLoading) return <Loader />;

  return (
    <div className={styles.documentsPage}>
      <div className={styles.sidebar}>
        <FolderTree folders={folders} documents={documents} onSelectFolder={setSelectedFolder} onAddFolder={addFolder} selectedFolder={selectedFolder} />
      </div>
      <div className={styles.mainContent}>
        {showUploader ? (
          <DocumentUploader folders={folders} onUpload={handleUpload} onCancel={() => setShowUploader(false)} />
        ) : (
          <DocumentList 
            documents={documents} 
            folders={folders} 
            onUpload={() => setShowUploader(true)} 
            onDelete={deleteDocument} 
            onShare={shareDocument} 
            onView={handleView} 
            getFileIcon={getFileIcon} 
            formatFileSize={formatFileSize} 
          />
        )}
      </div>
      
      {previewDocument && (
        <PDFPreviewModal 
          document={previewDocument} 
          onClose={() => setPreviewDocument(null)} 
        />
      )}
    </div>
  );
};

export default MyDocuments;
