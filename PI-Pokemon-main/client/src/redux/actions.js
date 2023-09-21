import { FILTER, ORDER, GET_ALL_POKEMONS,GET_ALL_TYPES } from "./actions-type";
import axios from "axios";

const endpoint = "http://localhost:3001";

export const allPokemons = () => {
  return async (dispatch) =>{ 
    try {
      const {data} = await axios.get(`${endpoint}/pokemons`);
      if(!data){
        throw Error ("No llegan los datos"); 
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