import { NavLink } from "react-router-dom";
import styles from "../Card/Card.module.css";

const Card = ({id,name,image,types})=>{

    if (!(typeof types[0]=== "string")){
        for(let i = 0; i<types.length;i++){
            types[i]= types[i].name
        }
    }

       // Verificar que pokemon.types esté definido antes de usarlo
   const typesClass = types ? types[0] : "";
    return (
        <div className={`${styles.containcard} ${styles[typesClass || 'default']}`}>
            <h2 className={styles.nombrePoke}>{name}</h2>

            <NavLink  to={`/detail/${id}`} className={styles.navlk}> 
              <img src={image} alt={name} className={styles.imagepoke}/>
            </NavLink>
           <div >
                {
                    types.map(type=>{
                        return (
                            <h3>{type}</h3>
                        )
                    })
                }
           </div>
        
        </div>
    );
}

export default Card;