import React from 'react';
import Layout from '../../components/common/Layout';
import ActivityTimeline from '../../components/crm/ActivityTimeline';
import CommunicationLog from '../../components/crm/CommunicationLog';
import TaskReminder from '../../components/crm/TaskReminder';
import { useActivities, useCommunications } from '../../hooks/useCRM';
import Loader from '../../components/common/Loader';
import styles from './CRMStyles.module.css';

const Activities = () => {
  const { activities, loading: activitiesLoading } = useActivities();
  const { communications, loading: commsLoading } = useCommunications();

  if (activitiesLoading || commsLoading) return <Layout><Loader /></Layout>;

  const pendingTasks = activities.filter(a => a.status === 'pending' && (a.type === 'task' || a.type === 'call'));

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Activities</h1>
        </div>

        <div className={styles.activitiesGrid}>
          <div className={styles.mainSection}>
            <ActivityTimeline activities={activities} />
          </div>
          <div className={styles.sideSection}>
            <TaskReminder tasks={pendingTasks} />
            <CommunicationLog communications={communications} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Activities;
