import React from 'react';
import Card from '../common/Card';
import styles from './DealCard.module.css';

const DealCard = ({ deals }) => {
  const formatCurrency = (value) => {
    return `R ${value.toLocaleString()}`;
  };

  const getStageBadge = (stage) => {
    const badges = {
      'closed-won': styles.stageWon,
      'negotiation': styles.stageNegotiation,
      'proposal': styles.stageProposal
    };
    return badges[stage] || styles.stageDefault;
  };

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(d => d.stage === 'closed-won').length;

  return (
    <Card className={styles.dealCard}>
      <div className={styles.header}>
        <h3>Active Deals</h3>
        <div className={styles.summary}>
          <span>{deals.length} deals • {wonDeals} won</span>
          <span className={styles.totalValue}>{formatCurrency(totalValue)}</span>
        </div>
      </div>

      <div className={styles.dealList}>
        {deals.map(deal => (
          <div key={deal.id} className={styles.dealItem}>
            <div className={styles.dealInfo}>
              <span className={styles.dealName}>{deal.name}</span>
              <span className={styles.dealClient}>{deal.client}</span>
            </div>
            <div className={styles.dealMeta}>
              <span className={styles.dealValue}>{formatCurrency(deal.value)}</span>
              <span className={`${styles.dealStage} ${getStageBadge(deal.stage)}`}>
                {deal.stage.replace('-', ' ')}
              </span>
            </div>
            <div className={styles.dealFooter}>
              <span>👤 {deal.owner}</span>
              <span>📅 {deal.close_date}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DealCard;
