import React from 'react';
import styles from "../Loading/Loading.module.css";

const LoadingScreen = () => {
  return (
    <div className={styles.loading}>
      <p className={styles.loadingText}>Loading Pokémon details</p>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingScreen;