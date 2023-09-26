import Search from "../Search/Search.jsx";
import { NavLink } from "react-router-dom";
import styles from "../Nav/Nav.module.css";
import imgPoke from "../../Imagenes/pokemon.webp";

const Nav = () => {
  return (
    <div className={styles.nav}>
      <img src={imgPoke} alt="LandingPage2" className={styles.imgPok} />
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