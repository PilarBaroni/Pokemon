// Importamos las constantes para las acciones
import {
  ORDER_ATTACK,
  ORDER_BY_NAME,
  SET_FILTER_BY_ORIGIN,
  SET_FILTER_BY_TYPE,
  LOAD_POKEMON,
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
} from "./actions-type";

// Definimos el estado inicial de nuestra aplicación
const initialState = {
  alPokemons: [], // Almacena todos los pokemones
  alTypes: [],
  pokemonsFilt: [],
  detailPokemon: {},
  pokemons: [],
  dbPokemons: [],
  apiPokemons: [],
};

// Creamos el reducer que gestionará los cambios en el estado de la aplicación
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      const apiPokemons = action.payload.filter(
        (pokemon) => !isNaN(pokemon.id)
      );
      const dbPokemons = action.payload.filter((pokemon) => isNaN(pokemon.id));
      return {
        ...state,
        pokemons: action.payload,
        alPokemons: action.payload, // Muestra todos los Pokémon sin filtrar
        apiPokemons: apiPokemons, // Opcional: Puedes guardar los Pokémon de la API en un campo separado si es necesario.
        dbPokemons: dbPokemons, // Opcional: Puedes guardar los Pokémon de la base de datos en un campo separado si es necesario.
      };

    case GET_ALL_TYPES:
      return {
        ...state,
        alTypes: action.payload,
      };
    case LOAD_POKEMON:
      return {
        ...state,
        detailPokemon: action.payload,
      };
    case SET_FILTER_BY_TYPE:
      const filteredType = state.alPokemons.filter((poke) =>
        poke.types.includes(action.payload)
      );

      return {
        ...state,
        pokemons: action.payload === "All" ? state.alPokemons : filteredType,
      };

    case SET_FILTER_BY_ORIGIN:
      let originFilter = [];

      switch (action.payload) {
        case "DataBase":
          originFilter = state.dbPokemons;
          break;
        case "Api":
          originFilter = state.apiPokemons;
          break;
        default:
          originFilter = state.alPokemons;
      }
      return {
        ...state,
        pokemons: originFilter,
      };

      case ORDER_BY_NAME:
        // Obtiene el tipo de orden del payload
        const orderBy = action.payload;
        
        // Crea una copia del array de pokemons para no modificar el estado original
        let sortedPokemons = [...state.pokemons];
      
        // Utiliza el valor de "orderBy" para determinar el tipo de orden
        // El valor de "orderBy" debe ser "0", "1", "2", o "3" según la selección del usuario
        sortedPokemons.sort((a, b) => {
          if (orderBy === "0") {
            // Ordenar por nombre A-Z
            return a.name.localeCompare(b.name); // Utiliza localeCompare para ordenar alfabéticamente
          } else if (orderBy === "1") {
            // Ordenar por nombre Z-A
            return b.name.localeCompare(a.name); // Invierte el orden para Z-A
          }  else if (orderBy === "2") {
            // Ordenar por ataque ascendente
            return a.attack - b.attack; // Resta para ordenar numéricamente
          } else if (orderBy === "3") {
            // Ordenar por ataque descendente
            return b.attack - a.attack; // Resta para ordenar numéricamente, invierte el orden
          }
        });
        return {
          ...state,
          pokemons: sortedPokemons,
        };

    default:
      return { ...state };
  }
};

export default reducer;
