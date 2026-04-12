import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './LeadPipeline.module.css';

const LeadPipeline = ({ leads, onLeadClick }) => {
  const stages = [
    { id: 'new', name: 'New', color: '#8b5cf6' },
    { id: 'qualified', name: 'Qualified', color: '#3b82f6' },
    { id: 'proposal', name: 'Proposal', color: '#f59e0b' },
    { id: 'negotiation', name: 'Negotiation', color: '#ef4444' },
    { id: 'closed-won', name: 'Closed Won', color: '#10b981' }
  ];

  const getLeadsByStage = (stageId) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const formatCurrency = (value) => {
    return `R ${value.toLocaleString()}`;
  };

  return (
    <Card className={styles.pipelineCard}>
      <div className={styles.header}>
        <h3>Lead Pipeline</h3>
        <Button variant="primary" size="small">+ New Lead</Button>
      </div>

      <div className={styles.pipeline}>
        {stages.map(stage => (
          <div key={stage.id} className={styles.stageColumn}>
            <div className={styles.stageHeader} style={{ borderColor: stage.color }}>
              <span className={styles.stageName}>{stage.name}</span>
              <span className={styles.stageCount} style={{ background: stage.color }}>
                {getLeadsByStage(stage.id).length}
              </span>
            </div>
            
            <div className={styles.stageLeads}>
              {getLeadsByStage(stage.id).map(lead => (
                <div 
                  key={lead.id} 
                  className={styles.leadCard}
                  onClick={() => onLeadClick(lead)}
                >
                  <div className={styles.leadName}>{lead.name}</div>
                  <div className={styles.leadCompany}>{lead.company}</div>
                  <div className={styles.leadValue}>{formatCurrency(lead.value)}</div>
                  <div className={styles.leadFooter}>
                    <span className={styles.leadProbability}>{lead.probability}%</span>
                    <span className={styles.leadOwner}>{lead.owner}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.stageTotal}>
              Total: {formatCurrency(getLeadsByStage(stage.id).reduce((sum, l) => sum + l.value, 0))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeadPipeline;
