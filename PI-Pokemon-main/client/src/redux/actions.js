import { ORDER_ATTACK,
  ORDER_BY_NAME,
  SET_FILTER_BY_ORIGIN,
  SET_FILTER_BY_TYPE, 
  LOAD_POKEMON, 
  GET_ALL_POKEMONS,
  GET_ALL_TYPES } from "./actions-type";
import axios from "axios";

const endpoint = "http://localhost:3001";

export const allPokemons = () => {
  return async (dispatch) =>{ 
    try {
      const {data} = await axios.get(`${endpoint}/pokemons`);
      if(!data){
        throw Error ("The data does not arrive"); 
      }
         return dispatch ({
      type: GET_ALL_POKEMONS,
      payload: data
    });
      
    } catch (error) {
      console.log(error)
    }
  }
};
  

  export const allTypes = () =>{
    return async (dispatch) =>{ 
      try {
        const {data} = await axios.get(`${endpoint}/types`);
        if(!data){
          throw Error ("No llegan los datos de tipos"); 
        }
           return dispatch ({
        type: GET_ALL_TYPES,
        payload: data
      });
        
      } catch (error) {
        console.log(error)
      }
    }
  };

export const loadPokemon = (name) => {

    return async (dispatch) => { // Devuelve una función asíncrona que toma un argumento dispatch (función de Redux)
      if(name==="clean"){
        return dispatch({
          type: LOAD_POKEMON,
          payload:"",
        })
      }
      try {
        const { data } = await axios.get(`${endpoint}/pokemon`, { params: { name } }); // Realiza una solicitud GET a la API con el nombre proporcionado
  
        dispatch({ // Despacha una acción de Redux con el tipo LOAD_POKEMON y los datos de respuesta
          type: LOAD_POKEMON,
          payload: data,
        });
      } catch (error) { // Captura y maneja cualquier error que pueda ocurrir durante la solicitud
          // Muestra una alerta al usuario en caso de error
          return alert(`You have to write a name`);
      }
    };
  };

  export const setFilterByOrigin = (payload)=>{
    return{
      type: SET_FILTER_BY_ORIGIN,
      payload,
    };
  };
  
  export const setFilterByType = (types)=>{
    return{
      type: SET_FILTER_BY_TYPE,
      payload: types
    }
  }
  
  export const orderByName = (payload)=>{
    return{
      type: ORDER_BY_NAME,
      payload,
    }
  }