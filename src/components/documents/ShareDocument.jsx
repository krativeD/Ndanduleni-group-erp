import React, { useState } from 'react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import styles from './ShareDocument.module.css';

const ShareDocument = ({ document, onShare, onClose }) => {
  const [emails, setEmails] = useState(document.shared?.join(', ') || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
    await onShare(document.id, emailList);
    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <Card className={styles.shareCard}>
        <h3>Share "{document.name}"</h3>
        <form onSubmit={handleSubmit}>
          <Input label="Email addresses (comma separated)" value={emails} onChange={(e) => setEmails(e.target.value)} placeholder="colleague@ndanduleni.co.za" />
          <p className={styles.hint}>People with access: {document.shared?.length || 0}</p>
          <div className={styles.actions}>
            <Button type="button" variant="default" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" loading={loading}>Share</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ShareDocument;
