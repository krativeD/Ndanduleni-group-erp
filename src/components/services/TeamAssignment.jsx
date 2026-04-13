import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './TeamAssignment.module.css';

const TeamAssignment = ({ teams }) => {
  const getStatusBadge = (status) => {
    return status === 'active' ? styles.statusActive : styles.statusStandby;
  };

  return (
    <Card className={styles.teamCard}>
      <div className={styles.header}>
        <h3>Team Assignments</h3>
        <Button variant="primary" size="small">+ Create Team</Button>
      </div>

      <div className={styles.teamGrid}>
        {teams.map(team => (
          <div key={team.id} className={styles.teamItem}>
            <div className={styles.teamHeader}>
              <div>
                <span className={styles.teamName}>{team.name}</span>
                <span className={styles.teamLeader}>👑 {team.leader}</span>
              </div>
              <span className={`${styles.statusBadge} ${getStatusBadge(team.status)}`}>
                {team.status}
              </span>
            </div>

            <div className={styles.teamMembers}>
              <span className={styles.label}>Members:</span>
              <div className={styles.memberList}>
                {team.members.map((member, idx) => (
                  <span key={idx} className={styles.member}>{member}</span>
                ))}
              </div>
            </div>

            {team.current_job && (
              <div className={styles.currentJob}>
                <span className={styles.label}>Current Job:</span>
                <span className={styles.jobLocation}>{team.current_job}</span>
              </div>
            )}

            <div className={styles.equipment}>
              <span className={styles.label}>Equipment:</span>
              <div className={styles.equipmentList}>
                {team.equipment.map((eq, idx) => (
                  <span key={idx} className={styles.equipmentTag}>{eq}</span>
                ))}
              </div>
            </div>

            <div className={styles.teamActions}>
              <Button variant="default" size="small">Edit</Button>
              <Button variant="primary" size="small">Assign Job</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TeamAssignment;
