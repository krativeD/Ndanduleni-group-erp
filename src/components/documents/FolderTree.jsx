import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import styles from './FolderTree.module.css';

const FolderTree = ({ folders, documents, onSelectFolder, onAddFolder, selectedFolder }) => {
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#6366f1');
  const [expandedFolders, setExpandedFolders] = useState([null]);

  const rootFolders = folders.filter(f => f.parent === null);
  const getSubFolders = (parentId) => folders.filter(f => f.parent === parentId);
  const getDocumentCount = (folderId) => documents.filter(d => d.folder === folderId).length;

  const toggleExpand = (folderId) => {
    setExpandedFolders(prev => prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]);
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder({ name: newFolderName, parent: selectedFolder, color: newFolderColor, createdBy: 'Current User' });
      setNewFolderName('');
      setShowAddFolder(false);
    }
  };

  const renderFolder = (folder) => {
    const subFolders = getSubFolders(folder.id);
    const isExpanded = expandedFolders.includes(folder.id);
    const docCount = getDocumentCount(folder.id);
    const isSelected = selectedFolder === folder.id;

    return (
      <div key={folder.id} className={styles.folderItem}>
        <div 
          className={`${styles.folderRow} ${isSelected ? styles.selected : ''}`}
          onClick={() => onSelectFolder(folder.id)}
        >
          <span className={styles.expandIcon} onClick={(e) => { e.stopPropagation(); toggleExpand(folder.id); }}>
            {subFolders.length > 0 ? (isExpanded ? '▼' : '▶') : '•'}
          </span>
          <span className={styles.folderIcon} style={{ color: folder.color }}>📁</span>
          <span className={styles.folderName}>{folder.name}</span>
          <span className={styles.docCount}>({docCount})</span>
        </div>
        {isExpanded && subFolders.length > 0 && (
          <div className={styles.subFolders}>
            {subFolders.map(sub => renderFolder(sub))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={styles.folderCard}>
      <div className={styles.header}>
        <h3>Folders</h3>
        <Button variant="primary" size="small" onClick={() => setShowAddFolder(!showAddFolder)}>+ New Folder</Button>
      </div>

      {showAddFolder && (
        <div className={styles.addFolder}>
          <Input placeholder="Folder name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
          <select value={newFolderColor} onChange={(e) => setNewFolderColor(e.target.value)} className={styles.colorSelect}>
            <option value="#6366f1">Purple</option><option value="#10b981">Green</option><option value="#f59e0b">Orange</option><option value="#ef4444">Red</option><option value="#3b82f6">Blue</option>
          </select>
          <div className={styles.addActions}>
            <Button size="small" variant="default" onClick={() => setShowAddFolder(false)}>Cancel</Button>
            <Button size="small" variant="primary" onClick={handleAddFolder}>Add</Button>
          </div>
        </div>
      )}

      <div className={styles.folderList}>
        <div className={`${styles.folderRow} ${selectedFolder === null ? styles.selected : ''}`} onClick={() => onSelectFolder(null)}>
          <span className={styles.expandIcon}>•</span>
          <span className={styles.folderIcon}>📁</span>
          <span className={styles.folderName}>All Documents</span>
          <span className={styles.docCount}>({documents.length})</span>
        </div>
        <div className={styles.folderRow} onClick={() => onSelectFolder('shared')}>
          <span className={styles.expandIcon}>•</span>
          <span className={styles.folderIcon}>↗️</span>
          <span className={styles.folderName}>Shared with me</span>
        </div>
        <div className={styles.folderRow} onClick={() => onSelectFolder('recent')}>
          <span className={styles.expandIcon}>•</span>
          <span className={styles.folderIcon}>🕐</span>
          <span className={styles.folderName}>Recent</span>
        </div>
        <div className={styles.divider} />
        {rootFolders.map(folder => renderFolder(folder))}
      </div>
    </Card>
  );
};

export default FolderTree;
