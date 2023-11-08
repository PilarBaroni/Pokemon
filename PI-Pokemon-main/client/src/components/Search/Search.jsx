import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPokemon } from "../../redux/actions";
import styles from "../Search/Search.module.css";


const Search = () => {
  const navigate = useNavigate(); // Importa el hook useNavigate de React Router para la navegación
  const dispatch = useDispatch(); // Obtiene la función de despacho de Redux
  const detailPokemon = useSelector((state) => state.detailPokemon); // Obtiene el detalle del Pokémon desde el estado de Redux

  useEffect(() => {
    // Utiliza un efecto para redirigir cuando se obtiene el detalle del Pokémon
    if (detailPokemon?.hasOwnProperty("id")) {
      navigate(`/detail/${detailPokemon.id}`, { replace: true });
    }
    return dispatch(loadPokemon("clean"));
  }, [detailPokemon, dispatch, navigate]);

  const [name, setName] = useState(""); // Crea un estado local para el nombre del Pokémon

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario

    // console.log(name); // Muestra el nombre del Pokémon en la consola
    dispatch(loadPokemon(name)); // Despacha la acción para cargar el Pokémon con el nombre proporcionado
  };

  const handleChange = (event) => {
    setName(event.target.value); // Actualiza el estado local del nombre cuando cambia el valor del input
  };
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={name}
        onChange={handleChange}
        type="text"
        placeholder="Pokemon name..."
      />
    </form>
  );
};

export default Search;
