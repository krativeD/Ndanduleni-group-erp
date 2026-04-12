import React from 'react';
import styles from './Loader.module.css';

export const SequentialLoader = () => (
  <div className={styles.sequential}>
    <div className={styles.square}></div>
    <div className={styles.square}></div>
    <div className={styles.square}></div>
    <div className={styles.square}></div>
  </div>
);

export const OrbitalLoader = () => (
  <div className={styles.orbitalContainer}>
    <div className={styles.orbital}>
      <div className={styles.orbitalSquare}></div>
    </div>
  </div>
);

export const LoadingText = ({ text = 'Loading' }) => (
  <span className={styles.loadingText}>{text}</span>
);

const Loader = () => (
  <div className={styles.loader}>
    <OrbitalLoader />
    <LoadingText text="Loading" />
  </div>
);

export default Loader;
