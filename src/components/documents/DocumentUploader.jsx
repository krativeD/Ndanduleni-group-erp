import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './DocumentUploader.module.css';

const DocumentUploader = ({ folders, onUpload, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', folder: null, tags: '', status: 'draft' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData({ ...formData, name: file.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    
    const fileType = selectedFile.name.split('.').pop().toLowerCase();
    const docData = {
      ...formData,
      type: fileType,
      size: selectedFile.size,
      folder: formData.folder ? parseInt(formData.folder) : null,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      uploadedBy: 'Current User'
    };
    
    await onUpload(docData);
    setUploading(false);
    onCancel();
  };

  return (
    <Card className={styles.uploaderCard}>
      <h3>Upload Document</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.dropZone} onClick={() => document.getElementById('fileInput').click()}>
          <input type="file" id="fileInput" onChange={handleFileSelect} style={{ display: 'none' }} />
          <span className={styles.uploadIcon}>📤</span>
          <p>{selectedFile ? selectedFile.name : 'Click to select a file or drag and drop'}</p>
          {selectedFile && <span className={styles.fileSize}>{(selectedFile.size / 1024).toFixed(1)} KB</span>}
        </div>
        
        <Input label="Document Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        
        <select className={styles.select} value={formData.folder || ''} onChange={(e) => setFormData({...formData, folder: e.target.value || null})}>
          <option value="">No Folder</option>
          {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
        </select>
        
        <Input label="Tags (comma separated)" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="e.g., contract, important" />
        
        <select className={styles.select} value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
          <option value="draft">Draft</option><option value="review">Review</option><option value="published">Published</option>
        </select>
        
        <div className={styles.actions}>
          <Button type="button" variant="default" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="primary" loading={uploading}>Upload</Button>
        </div>
      </form>
    </Card>
  );
};

export default DocumentUploader;
