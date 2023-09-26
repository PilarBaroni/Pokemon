import React from 'react';
import style from "../About/About.module.css";
import imgYo from "../../Imagenes/yo.jpg";
import { NavLink } from 'react-router-dom';

const About =()=>{
  return (
    <div className={style.container}>
      <header>
        <NavLink to="/home">Home</NavLink>
        <h1>About Me</h1>
      </header>
      <main>
        <section className={style.aboutsection}>
          <h2 className={style.h2}>Who Am I</h2>
          <p>I'm a passionate individual dedicated to learning and creating.</p>
        </section>
        <section className={style.personalinfo}>
          <h2 className={style.h2}>Personal Information</h2>
          <div className={style.profile}>
            <img className={style.profileimage} src= {imgYo} alt="Imagen"/>
            <h3>Rocio Pilar Baroni</h3>
            <p>Studying to become a web developer</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Rocio Pilar Baroni. All rights reserved.</p>
      </footer>
    </div>
  );
}


export default About;