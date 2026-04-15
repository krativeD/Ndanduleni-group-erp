import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useWorkflows } from '../../hooks/useDocuments';
import Loader from '../../components/common/Loader';
import styles from './DocumentsStyles.module.css';

const Workflows = () => {
  const { workflows, loading, updateWorkflowStatus } = useWorkflows();

  const getStatusBadge = (status) => {
    const badges = { 'in-progress': styles.statusProgress, 'completed': styles.statusCompleted };
    return badges[status] || styles.statusProgress;
  };

  if (loading) return <Loader />;

  return (
    <Card className={styles.workflowsCard}>
      <div className={styles.header}>
        <h3>Document Workflows</h3>
        <Button variant="primary" size="small">+ New Workflow</Button>
      </div>
      <div className={styles.workflowList}>
        {workflows.map(w => (
          <div key={w.id} className={styles.workflowItem}>
            <div>
              <span className={styles.workflowName}>{w.name}</span>
              <span className={styles.workflowDoc}>{w.document}</span>
            </div>
            <div className={styles.workflowProgress}>
              <span>Step: {w.currentStep}</span>
              <span>Assigned: {w.assignedTo}</span>
              <span>Due: {w.dueDate}</span>
            </div>
            <span className={`${styles.statusBadge} ${getStatusBadge(w.status)}`}>{w.status}</span>
            {w.status === 'in-progress' && (
              <Button size="small" variant="success" onClick={() => updateWorkflowStatus(w.id, 'completed')}>Complete</Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Workflows;
