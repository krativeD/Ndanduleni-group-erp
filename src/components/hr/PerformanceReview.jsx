import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './PerformanceReview.module.css';

const PerformanceReview = () => {
  const reviews = [
    { id: 1, employee: 'John Mbeki', position: 'Operations Manager', rating: 4.5, status: 'Completed', date: '2026-03-15' },
    { id: 2, employee: 'Sarah Ndlovu', position: 'Cleaner', rating: 4.8, status: 'Completed', date: '2026-03-10' },
    { id: 3, employee: 'Mike Khumalo', position: 'Maintenance', rating: 3.9, status: 'In Progress', date: '2026-04-01' },
    { id: 4, employee: 'Emily Zulu', position: 'HR Admin', rating: null, status: 'Scheduled', date: '2026-04-20' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'Completed': styles.statusCompleted,
      'In Progress': styles.statusProgress,
      'Scheduled': styles.statusScheduled
    };
    return badges[status] || styles.statusScheduled;
  };

  const renderStars = (rating) => {
    if (!rating) return <span className={styles.noRating}>Pending</span>;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className={styles.stars}>
        {[...Array(5)].map((_, i) => (
          <span key={i} className={styles.star}>
            {i < fullStars ? '★' : (i === fullStars && hasHalfStar ? '½' : '☆')}
          </span>
        ))}
        <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Card className={styles.performanceCard}>
      <div className={styles.header}>
        <h3>Performance Reviews</h3>
        <Button variant="primary" size="small">+ Schedule Review</Button>
      </div>

      <div className={styles.reviewList}>
        {reviews.map(review => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <div className={styles.employeeInfo}>
                <span className={styles.employeeName}>{review.employee}</span>
                <span className={styles.employeePosition}>{review.position}</span>
              </div>
              <span className={`${styles.status} ${getStatusBadge(review.status)}`}>
                {review.status}
              </span>
            </div>
            
            <div className={styles.reviewDetails}>
              {renderStars(review.rating)}
              <span className={styles.reviewDate}>📅 {review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PerformanceReview;
