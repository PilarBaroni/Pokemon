// Importamos las constantes para las acciones
import { FILTER, ORDER,LOAD_POKEMON, GET_ALL_POKEMONS,GET_ALL_TYPES } from "./actions-type";

// Definimos el estado inicial de nuestra aplicación
const initialState = {
  allPokemons: [],    // Almacena todos los pokemones
  types: [],         
  pokemonsFilt: [],
  detailPokemon: {},

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
      case LOAD_POKEMON:
        return {
            ...state,
            detailPokemon: action.payload
        }
      case FILTER:
        // Desestructuramos los valores type y origin de action.payload
        const { type, origin } = action.payload;
  
        // Filtramos los Pokémon por tipo
        const allPokemonsFilteredByType = state.allPokemons.filter(
          (pokemon) => pokemon.type === type
        );
  
        let filteredPokemons = [];
  
        // Comprobamos si el tipo es "ALL" para decidir si aplicar el filtro por tipo
        if (type === "ALL") {
          filteredPokemons = state.allPokemons; // No aplicamos filtro por tipo
        } else {
          filteredPokemons = allPokemonsFilteredByType; // Aplicamos filtro por tipo
        }
  
        let filteredPokemonsByOrigin = [];
  
        // Comprobamos el origen y filtramos por IDs numéricos o no numéricos
        if (origin === "API") {
          filteredPokemonsByOrigin = filteredPokemons.filter(
            (pokemon) => !isNaN(pokemon.id) // Filtramos por IDs numéricos (API)
          );
        } else {
          filteredPokemonsByOrigin = filteredPokemons.filter(
            (pokemon) => isNaN(pokemon.id) // Filtramos por IDs no numéricos (DB)
          );
        }
  
        return {
          ...state,
          pokemonsApi: filteredPokemonsByOrigin,
        };
        
      default:
        return { ...state };
      }
};

export default reducer;