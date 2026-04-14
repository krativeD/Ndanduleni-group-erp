import React from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import styles from './SalesStyles.module.css';

const Pipeline = () => {
  const stages = [
    { name: 'Lead', count: 12, value: 145000, color: '#8b5cf6' },
    { name: 'Qualified', count: 8, value: 98000, color: '#3b82f6' },
    { name: 'Proposal', count: 5, value: 76000, color: '#f59e0b' },
    { name: 'Negotiation', count: 3, value: 45000, color: '#ef4444' },
    { name: 'Closed Won', count: 7, value: 125000, color: '#10b981' }
  ];

  const totalValue = stages.reduce((sum, s) => sum + s.value, 0);
  const totalCount = stages.reduce((sum, s) => sum + s.count, 0);

  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}><h1>Sales Pipeline</h1></div>
        <div className={styles.pipelineStats}>
          <Card className={styles.statCard}><span>Total Opportunities</span><h2>{totalCount}</h2></Card>
          <Card className={styles.statCard}><span>Pipeline Value</span><h2>R {totalValue.toLocaleString()}</h2></Card>
        </div>
        <Card className={styles.pipelineCard}>
          <div className={styles.pipeline}>
            {stages.map((stage, idx) => (
              <div key={idx} className={styles.stage}>
                <div className={styles.stageHeader} style={{ borderColor: stage.color }}>
                  <span>{stage.name}</span>
                  <span style={{ background: stage.color }}>{stage.count}</span>
                </div>
                <div className={styles.stageValue}>R {stage.value.toLocaleString()}</div>
                <div className={styles.stageBar}><div style={{ width: `${(stage.value / totalValue) * 100}%`, background: stage.color }}></div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Pipeline;
