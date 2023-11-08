import { NavLink } from "react-router-dom";
import styles from "../Card/Card.module.css";

const Card = ({ id, name, image, types }) => {

  if (!(typeof types[0] === "string")) {
        for (let i = 0; i < types.length; i++) {
        types[i] = types[i].name;
        }
    }

  // Verificar que pokemon.types esté definido antes de usarlo
  const typesClass = types ? types[0] : "";
    return (
        <div className={`${styles.containcard} ${styles[typesClass || "default"]}`}>
            <h2 className={styles.nombrePoke}>{name}</h2>

            <NavLink to={`/detail/${id}`} className={styles.navlk}>
                <img src={image} alt={name} className={styles.imagepoke} />
            </NavLink>

            <div className={styles.tpes2}>
            {types.map((type, index) => (
                <>
                  <h3 className={styles.tp}>{type}</h3>
                    {index < types.length - 1 && <span>, </span>} 
                </>
             ))}
            </div>
        
        </div>
    );
};

export default Card;
