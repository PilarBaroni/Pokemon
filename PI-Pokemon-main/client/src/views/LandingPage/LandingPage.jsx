import React from 'react';
import { NavLink } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div>
      <NavLink to="/home"> 
      <button >Ingresar a la Home Page</button>
      </NavLink>
    </div>
  );
};


export default LandingPage;