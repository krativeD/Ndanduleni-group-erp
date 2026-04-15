import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTrash } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Trash = () => {
  const { trash, loading, restoreDocument, permanentDelete, emptyTrash } = useTrash();

  const handleRestore = (id) => {
    restoreDocument(id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Permanently delete this document? This cannot be undone.')) {
      permanentDelete(id);
    }
  };

  const handleEmptyTrash = () => {
    if (window.confirm('Permanently delete ALL items in trash? This cannot be undone.')) {
      emptyTrash();
    }
  };

  if (loading) return <Loader />;

  return (
    <Card className={styles.trashCard}>
      <div className={styles.header}>
        <h3>Trash</h3>
        {trash.length > 0 && (
          <Button variant="danger" size="small" onClick={handleEmptyTrash}>🗑️ Empty Trash</Button>
        )}
      </div>
      
      <p className={styles.trashHint}>Items in trash will be permanently deleted after 30 days.</p>
      
      {trash.length === 0 ? (
        <p className={styles.empty}>Trash is empty</p>
      ) : (
        <div className={styles.trashList}>
          {trash.map(item => (
            <div key={item.id} className={styles.trashItem}>
              <div className={styles.trashInfo}>
                <span className={styles.trashIcon}>📄</span>
                <div>
                  <span className={styles.trashName}>{item.name}</span>
                  <span className={styles.trashMeta}>Deleted: {item.deletedAt} by {item.deletedBy}</span>
                  <span className={styles.trashMeta}>Size: {(item.size / 1024).toFixed(1)} KB • Type: {item.type?.toUpperCase()}</span>
                </div>
              </div>
              <div className={styles.trashActions}>
                <Button size="small" variant="default" onClick={() => handleRestore(item.id)}>↩️ Restore</Button>
                <Button size="small" variant="danger" onClick={() => handleDelete(item.id)}>🗑️ Delete Forever</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Trash;
