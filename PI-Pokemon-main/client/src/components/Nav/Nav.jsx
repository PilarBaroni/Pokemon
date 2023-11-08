import Search from "../Search/Search.jsx";
import { NavLink } from "react-router-dom";
import styles from "../Nav/Nav.module.css";
import imgPoke from "../../Imagenes/pokemon.webp";
import pokegif from "../../Imagenes/pokebola2.gif";

const Nav = () => {
  return (
    <div className={styles.nav}>
      <img src={imgPoke} alt="LandingPage2" className={styles.imgPok} />
      < img src={pokegif} alt="pokebola" className={styles.pokeg}/>
      <Search />

      <NavLink to="/form" className={styles.btn}>
        Create Pokémon
      </NavLink>

      <NavLink to="/about" className={styles.btn}>
        About
      </NavLink>
    </div>
  );
};

export default Nav;