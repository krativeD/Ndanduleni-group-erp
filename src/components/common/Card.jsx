import React from 'react';
import styles from './Card.module.css';

const Card = ({ children, className = '', padding = 'lg', ...props }) => {
  return (
    <div 
      className={`${styles.card} ${styles[`padding-${padding}`]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
