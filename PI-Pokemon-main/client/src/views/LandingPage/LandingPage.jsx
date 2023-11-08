import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "../LandingPage/LandingPage.module.css";
import img1 from "../../Imagenes/pika1.gif";

const LandingPage = () => {
  return (
    <div className={styles.container}>
        <div className={`${styles.imgContainer} ${styles.fadeIn}`}>
            <img src={img1} alt="LandingPage2" className={styles.fadeInRight} />
        </div>
        <h1 className={`${styles.title} ${styles.scaleIn}`}>
            Pokédex
        </h1>
        <NavLink to="/home">
        <button
            className={`${styles.playButton} ${styles.scaleIn}`}
            
        >
            Let's Play!
        </button>
        </NavLink>
        <div className={`${styles.authorContainer} ${styles.slideInUp}`}>
            <h3>Made with ❤ by <a href="https://www.linkedin.com/in/pilar-baroni-3b4650281/" target="_blank" rel="noreferrer" className={styles.link}>Pilar Baroni</a></h3>
        </div>
    </div>
);
};

export default LandingPage;