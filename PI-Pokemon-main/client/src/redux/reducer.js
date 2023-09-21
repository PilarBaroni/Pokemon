// Importamos las constantes para las acciones
import { FILTER, ORDER, GET_ALL_POKEMONS,GET_ALL_TYPES } from "./actions-type";

// Definimos el estado inicial de nuestra aplicación
const initialState = {
  allPokemons: [],    // Almacena todos los pokemones
  types: [],         
  pokemons: []
};

// Creamos el reducer que gestionará los cambios en el estado de la aplicación
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        pokemons: action.payload
      };

    case GET_ALL_TYPES:
      return {
        ...state,
        allTypes: action.payload
      };

    default:
      return { ...state };
  }
};

export default reducer;