import axios from "axios";
import {useParams} from "react-router-dom";
import { useState, useEffect } from "react"

const DetailPage = () => {
  const {id}= useParams();
  const [pokemon,setPokemon]= useState({});
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios(`http://localhost:3001/pokemons/${id}`);
        const { data } = response;
  
        if (data.name) {
          if(typeof data.types[0] === "object"){
            data.types = data.types.map((type)=>{
              return type.name
            })
            data.types= data.types.join(", ");
          }
          else {
            data.types= data.types.join(", ");
          }
          setPokemon(data);
        } else {
          window.alert('No hay personajes con ese ID');
          setPokemon({}); // Establecer el estado en un valor vacío o predeterminado en caso de error
        }
    };
  
    fetchData(); // Llama a la función asincrónica fetchData dentro de useEffect
  }, [id]);
  

  
    return (
      <div>
          <h2 > Name: {pokemon?.name}</h2>
          <h2>ID: {pokemon?.id}</h2>
          <img src={pokemon?.image} alt={pokemon?.name}/>
          <h2>Hp: {pokemon?.hp}</h2>
          <h2>Speed: {pokemon?.speed}</h2>
          <h2>Attack: {pokemon?.attack}</h2>
          <h2>Height: {pokemon?.height}</h2>
          <h2>Weight: {pokemon?.weight}</h2>
          <h2>Type: {pokemon?.types}</h2>
          
      </div>
    );
  };

  export default DetailPage;