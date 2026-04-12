import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './RecruitmentPipeline.module.css';

const RecruitmentPipeline = () => {
  const stages = [
    { name: 'Applied', count: 12, color: '#6366f1' },
    { name: 'Screening', count: 8, color: '#3b82f6' },
    { name: 'Interview', count: 5, color: '#f59e0b' },
    { name: 'Offer', count: 2, color: '#10b981' },
    { name: 'Hired', count: 3, color: '#8b5cf6' }
  ];

  const candidates = [
    { id: 1, name: 'Thabo Molefe', position: 'Senior Cleaner', stage: 'Interview', applied: '2026-04-01' },
    { id: 2, name: 'Lerato Mokoena', position: 'Supervisor', stage: 'Screening', applied: '2026-04-05' },
    { id: 3, name: 'Sipho Ndlovu', position: 'Maintenance', stage: 'Applied', applied: '2026-04-08' },
    { id: 4, name: 'Nomsa Dube', position: 'Admin Assistant', stage: 'Offer', applied: '2026-03-28' }
  ];

  const getStageColor = (stage) => {
    const stageObj = stages.find(s => s.name === stage);
    return stageObj?.color || '#6366f1';
  };

  return (
    <Card className={styles.recruitmentCard}>
      <div className={styles.header}>
        <h3>Recruitment Pipeline</h3>
        <Button variant="primary" size="small">+ New Job</Button>
      </div>

      <div className={styles.pipeline}>
        {stages.map((stage, index) => (
          <React.Fragment key={stage.name}>
            <div className={styles.stage}>
              <div className={styles.stageHeader}>
                <span className={styles.stageDot} style={{ background: stage.color }}></span>
                <span className={styles.stageName}>{stage.name}</span>
              </div>
              <span className={styles.stageCount}>{stage.count}</span>
            </div>
            {index < stages.length - 1 && <div className={styles.stageArrow}>→</div>}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.candidatesSection}>
        <h4>Recent Candidates</h4>
        <div className={styles.candidateList}>
          {candidates.map(candidate => (
            <div key={candidate.id} className={styles.candidateItem}>
              <div className={styles.candidateInfo}>
                <span className={styles.candidateName}>{candidate.name}</span>
                <span className={styles.candidatePosition}>{candidate.position}</span>
              </div>
              <div className={styles.candidateMeta}>
                <span 
                  className={styles.candidateStage}
                  style={{ background: getStageColor(candidate.stage) + '20', color: getStageColor(candidate.stage) }}
                >
                  {candidate.stage}
                </span>
                <span className={styles.candidateDate}>{candidate.applied}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RecruitmentPipeline;
