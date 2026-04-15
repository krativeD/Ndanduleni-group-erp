import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './DocumentList.module.css';

const DocumentList = ({ documents, folders, onUpload, onDelete, onShare, onView, getFileIcon, formatFileSize }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredDocs = documents.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusBadge = (status) => {
    const badges = { 'draft': styles.statusDraft, 'review': styles.statusReview, 'published': styles.statusPublished };
    return badges[status] || styles.statusDraft;
  };

  const toggleSelect = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <Card className={styles.docCard}>
      <div className={styles.header}>
        <h3>Documents</h3>
        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <button className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
            <button className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`} onClick={() => setViewMode('list')}>☰</button>
          </div>
          <Button variant="primary" size="small" onClick={onUpload}>+ Upload</Button>
        </div>
      </div>

      <div className={styles.filters}>
        <Input type="search" placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchInput} />
      </div>

      {viewMode === 'grid' ? (
        <div className={styles.docGrid}>
          {filteredDocs.map(doc => (
            <div key={doc.id} className={`${styles.docItem} ${selectedItems.includes(doc.id) ? styles.selected : ''}`} onClick={() => onView(doc)}>
              <input type="checkbox" checked={selectedItems.includes(doc.id)} onChange={(e) => { e.stopPropagation(); toggleSelect(doc.id); }} className={styles.checkbox} />
              <span className={styles.docIcon}>{getFileIcon(doc.type)}</span>
              <span className={styles.docName}>{doc.name}</span>
              <span className={styles.docMeta}>{formatFileSize(doc.size)} • v{doc.version}</span>
              <span className={`${styles.statusBadge} ${getStatusBadge(doc.status)}`}>{doc.status}</span>
              <div className={styles.docActions} onClick={(e) => e.stopPropagation()}>
                <button className={styles.actionBtn} onClick={() => onShare(doc)} title="Share">↗️</button>
                <button className={styles.actionBtn} onClick={() => onDelete(doc.id)} title="Delete">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.docTable}>
          <table>
            <thead><tr><th><input type="checkbox" /></th><th>Name</th><th>Size</th><th>Version</th><th>Uploaded</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id} onClick={() => onView(doc)}>
                  <td><input type="checkbox" checked={selectedItems.includes(doc.id)} onChange={(e) => { e.stopPropagation(); toggleSelect(doc.id); }} /></td>
                  <td><span className={styles.docIcon}>{getFileIcon(doc.type)}</span> {doc.name}</td>
                  <td>{formatFileSize(doc.size)}</td>
                  <td>v{doc.version}</td>
                  <td>{doc.uploadedAt}</td>
                  <td><span className={`${styles.statusBadge} ${getStatusBadge(doc.status)}`}>{doc.status}</span></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className={styles.actionBtn} onClick={() => onShare(doc)}>↗️</button>
                    <button className={styles.actionBtn} onClick={() => onDelete(doc.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default DocumentList;
