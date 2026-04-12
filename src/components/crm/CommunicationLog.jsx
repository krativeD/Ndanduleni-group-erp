import React from 'react';
import Card from '../common/Card';
import styles from './CommunicationLog.module.css';

const CommunicationLog = ({ communications }) => {
  const getChannelIcon = (channel) => {
    const icons = {
      'Phone': '📞',
      'Email': '📧',
      'Meeting': '🤝'
    };
    return icons[channel] || '💬';
  };

  const getDirectionClass = (direction) => {
    return direction === 'inbound' ? styles.inbound : styles.outbound;
  };

  return (
    <Card className={styles.communicationCard}>
      <div className={styles.header}>
        <h3>Recent Communications</h3>
      </div>

      <div className={styles.communicationList}>
        {communications.map(comm => (
          <div key={comm.id} className={styles.communicationItem}>
            <div className={styles.communicationHeader}>
              <div className={styles.contactInfo}>
                <span className={styles.channelIcon}>{getChannelIcon(comm.channel)}</span>
                <div>
                  <span className={styles.contactName}>{comm.contact}</span>
                  <span className={styles.companyName}>{comm.company}</span>
                </div>
              </div>
              <span className={`${styles.direction} ${getDirectionClass(comm.direction)}`}>
                {comm.direction}
              </span>
            </div>
            <p className={styles.summary}>{comm.summary}</p>
            <div className={styles.footer}>
              <span>👤 {comm.user}</span>
              <span>📅 {comm.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CommunicationLog;
