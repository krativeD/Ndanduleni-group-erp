import React from 'react';
import Layout from '../../components/common/Layout';
import LeadPipeline from '../../components/crm/LeadPipeline';
import DealCard from '../../components/crm/DealCard';
import { useLeads, useDeals } from '../../hooks/useCRM';
import Loader from '../../components/common/Loader';
import styles from './CRMStyles.module.css';

const Leads = () => {
  const { leads, loading: leadsLoading } = useLeads();
  const { deals, loading: dealsLoading } = useDeals();

  const handleLeadClick = (lead) => {
    console.log('Lead clicked:', lead);
  };

  if (leadsLoading || dealsLoading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1>Leads & Pipeline</h1>
        </div>

        <div className={styles.pipelineSection}>
          <LeadPipeline leads={leads} onLeadClick={handleLeadClick} />
        </div>

        <div className={styles.dealsSection}>
          <DealCard deals={deals} />
        </div>
      </div>
    </Layout>
  );
};

export default Leads;
