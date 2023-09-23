import { GET_ALL_POKEMONS, GET_NAME, SET_FILTER,FILTER_POKEMONS,SET_FILTERS_INACTIVE,TOGGLE_FILTER,SET_ERROR, SET_PAGE} from "./actions-type";
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
  


  //obtener por nombre
export const getName = (name) => {
  return async function (dispatch) {
    try {
      const getDetails = await axios.get(
        `${endpoint}/pokemon/?name=${name}`
      );
      return dispatch({
        type: GET_NAME,
        payload: getDetails.data,
      });
    } catch (error) {
      alert("Pokemon not found");
    }
  };
};

// setear el filter en false
export const setFilter = (set) => {
  return async function (dispatch) {
    try {
      dispatch({ 
        type: SET_FILTER, 
        payload: set 
      });
    } catch (error) {
      alert(error);
    }
  };
};


// setea todos los filters 
export const toggleFilter = (filterName) => ({
  type: TOGGLE_FILTER,
  payload: filterName,
});


// pokemons filtrados
export const setFilterPokemons = (filtered) => {
  return async function (dispatch) {
    try {
      dispatch({ 
        type: FILTER_POKEMONS, payload: filtered
       });
    } 
    catch (error) {
      alert(error);
    }
  };
};


// setea todos los filtros en false
export const setFilters = () => {
  return {
    type: SET_FILTERS_INACTIVE,
  };
};

// setea un error 
export const setError = (set) => {
  return async function (dispatch) {
    try {
      dispatch({ 
        type: SET_ERROR, payload: set 
      });
    } catch (error) {
      alert(error);
    }
  };
};


// setear pagina
export const setPage = (nro) => ({
  type: SET_PAGE,
  payload: nro,
});