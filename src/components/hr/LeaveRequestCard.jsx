import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './LeaveRequestCard.module.css';

const LeaveRequestCard = ({ requests, onApprove, onReject }) => {
  const getStatusBadge = (status) => {
    const badges = {
      pending: styles.statusPending,
      approved: styles.statusApproved,
      rejected: styles.statusRejected
    };
    return badges[status] || styles.statusPending;
  };

  const getTypeColor = (type) => {
    const colors = {
      'Annual': styles.typeAnnual,
      'Sick': styles.typeSick,
      'Unpaid': styles.typeUnpaid
    };
    return colors[type] || styles.typeAnnual;
  };

  return (
    <Card className={styles.leaveCard}>
      <div className={styles.header}>
        <h3>Leave Requests</h3>
        <Button variant="primary" size="small">+ New Request</Button>
      </div>

      <div className={styles.requestList}>
        {requests.map(request => (
          <div key={request.id} className={styles.requestItem}>
            <div className={styles.requestHeader}>
              <div className={styles.employeeInfo}>
                <span className={styles.employeeName}>{request.employee}</span>
                <span className={`${styles.leaveType} ${getTypeColor(request.type)}`}>
                  {request.type}
                </span>
              </div>
              <span className={`${styles.status} ${getStatusBadge(request.status)}`}>
                {request.status}
              </span>
            </div>
            
            <div className={styles.requestDetails}>
              <div className={styles.dateRange}>
                <span>📅 {request.start_date} - {request.end_date}</span>
                <span className={styles.days}>{request.days} days</span>
              </div>
              {request.reason && (
                <p className={styles.reason}>{request.reason}</p>
              )}
            </div>

            {request.status === 'pending' && (
              <div className={styles.actions}>
                <Button 
                  variant="success" 
                  size="small"
                  onClick={() => onApprove(request.id)}
                >
                  Approve
                </Button>
                <Button 
                  variant="danger" 
                  size="small"
                  onClick={() => onReject(request.id)}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LeaveRequestCard;
