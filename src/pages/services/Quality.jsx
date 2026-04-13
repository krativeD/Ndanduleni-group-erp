import React from 'react';
import Layout from '../../components/common/Layout';
import QualityChecklist from '../../components/services/QualityChecklist';
import ClientFeedback from '../../components/services/ClientFeedback';
import { useQualityChecks, useFeedback } from '../../hooks/useServices';
import Loader from '../../components/common/Loader';
import styles from './ServicesStyles.module.css';

const Quality = () => {
  const { checks, loading: checksLoading } = useQualityChecks();
  const { feedback, loading: feedbackLoading } = useFeedback();

  if (checksLoading || feedbackLoading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Quality Control</h1>
        </div>

        <div className={styles.qualityGrid}>
          <QualityChecklist checks={checks} />
          <ClientFeedback feedback={feedback} />
        </div>
      </div>
    </Layout>
  );
};

export default Quality;
