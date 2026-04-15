import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTrash } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Trash = () => {
  const { trash, loading, restoreDocument, permanentDelete } = useTrash();

  if (loading) return <Loader />;

  return (
    <Card className={styles.trashCard}>
      <h3>Trash</h3>
      <p className={styles.trashHint}>Items in trash will be permanently deleted after 30 days.</p>
      <div className={styles.trashList}>
        {trash.map(item => (
          <div key={item.id} className={styles.trashItem}>
            <span>📄 {item.name}</span>
            <span>Deleted: {item.deletedAt} by {item.deletedBy}</span>
            <div className={styles.trashActions}>
              <Button size="small" variant="default" onClick={() => restoreDocument(item.id)}>↩️ Restore</Button>
              <Button size="small" variant="danger" onClick={() => permanentDelete(item.id)}>🗑️ Delete</Button>
            </div>
          </div>
        ))}
        {trash.length === 0 && <p className={styles.empty}>Trash is empty</p>}
      </div>
    </Card>
  );
};

export default Trash;
