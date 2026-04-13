import React from 'react';
import Layout from '../../components/common/Layout';
import TeamAssignment from '../../components/services/TeamAssignment';
import { useTeams } from '../../hooks/useServices';
import Loader from '../../components/common/Loader';
import styles from './ServicesStyles.module.css';

const Teams = () => {
  const { teams, loading, error } = useTeams();

  if (loading) return <Layout><Loader /></Layout>;
  if (error) return <Layout><div className={styles.error}>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Team Management</h1>
        </div>
        <TeamAssignment teams={teams} />
      </div>
    </Layout>
  );
};

export default Teams;
