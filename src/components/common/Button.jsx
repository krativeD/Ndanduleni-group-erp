import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'default', 
  block = false, 
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const classes = [
    styles.btn,
    styles[`btn-${variant}`],
    block ? styles['btn-block'] : '',
    loading ? styles['btn-loading'] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={classes} 
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner}></span>
      ) : children}
    </button>
  );
};

export default Button;
