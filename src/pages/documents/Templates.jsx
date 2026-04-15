import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTemplates } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Templates = () => {
  const { templates, loading } = useTemplates();

  if (loading) return <Loader />;

  return (
    <Card className={styles.templatesCard}>
      <div className={styles.header}>
        <h3>Templates</h3>
        <Button variant="primary" size="small">+ Upload Template</Button>
      </div>
      <div className={styles.templateGrid}>
        {templates.map(t => (
          <div key={t.id} className={styles.templateItem}>
            <span className={styles.templateIcon}>📋</span>
            <span className={styles.templateName}>{t.name}</span>
            <span className={styles.templateMeta}>{t.category} • Used {t.usageCount} times</span>
            <Button size="small" variant="default">Use Template</Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Templates;
