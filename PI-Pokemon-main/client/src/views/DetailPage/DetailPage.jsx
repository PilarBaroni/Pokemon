import axios from "axios";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react"
import styles from "../DetailPage/DetailPage.module.css"
import { NavLink } from "react-router-dom";
import LoadingScreen from "./Loading/Loading";

const DetailPage = () => {
  const {id}= useParams();
  const [pokemon,setPokemon]= useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const response = await axios(`http://localhost:3001/pokemons/${id}`);
        const { data } = response;

        if (data.name) {
          if (typeof data.types[0] === 'object') {
            data.types = data.types.map((type) => type.name);
          }

          setPokemon(data);
          setIsLoading(false); // Marcar como cargado una vez que los datos se hayan cargado
        } else {
          window.alert('No hay personajes con ese ID');
          setPokemon({});
          setIsLoading(false); // Marcar como cargado en caso de error
        }
      } catch (error) {
        console.error('Error al obtener los detalles del Pokémon', error);
        setPokemon({});
        setIsLoading(false); // Marcar como cargado en caso de error
      }
    };

    getPokemonDetails();
  }, [id]);

    if (isLoading) {
      return <LoadingScreen />; // Mostrar pantalla de carga mientras se carga
    }
  

   // Verificar que pokemon.types esté definido antes de usarlo
   const typesClass = pokemon?.types ? pokemon.types[0] : "";
  
  return (
    <div className={`${styles.container} ${styles[typesClass || 'default']}`}>
      <div className={styles.backButtonContainer}>
        <NavLink to="/home" className={styles.navlink}>
          <button>Back</button>
        </NavLink>
      </div>

      <div className={styles.imageContainer}>
        <img src={pokemon?.image} alt={pokemon?.name} />
      </div>

      <div className={styles.infoContainer}>
        <h2>
          {pokemon?.id < 10
            ? `#000${pokemon?.id}`
            : pokemon?.id < 100
            ? `#00${pokemon?.id}`
            : pokemon?.id < 1000
            ? `#0${pokemon?.id}`
            : `#${pokemon?.id}`}
        </h2>
        <h1>Name: {pokemon?.name}</h1>
        <p>Hp: {pokemon?.hp}</p>
        <p>Speed: {pokemon?.speed}</p>
        <p>Attack: {pokemon?.attack}</p>
        <p>Height: {pokemon?.height}</p>
        <p>Weight: {pokemon?.weight}</p>

        <div className={styles.typesContainer}>
          <div className={styles.typeDisplay}>
            <div className={styles.typeName}>
              <p>Type:</p>
              <h3>{pokemon?.types?.join(", ")}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;