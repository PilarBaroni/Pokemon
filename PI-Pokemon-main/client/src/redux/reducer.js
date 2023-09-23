// Importamos las constantes para las acciones
import { GET_ALL_POKEMONS, GET_NAME, SET_FILTER,FILTER_POKEMONS,SET_FILTERS_INACTIVE,TOGGLE_FILTER, INCREMENT_PAGE,DECREMENT_PAGE,SET_ERROR, SET_PAGE} from "./actions-type";   


// Definimos el estado inicial de nuestra aplicación
const initialState = {
  alPokemons: [],    // Almacena todos los pokemones sin filtros
  pokemonsName: [], // pokemon por nombre, si esta en true significa que se busco un pokemon por nombre
  filter: false,
  error:null,
  filters: {
    // FILTROS Y ORDENAMIENTOS
    byAttack: false,                                                  // Si está en true es que el filtro está activo
    alfabetic: false,                                                 // Si está en true es que el filtro está activo
    ascendente: false,                                                // Si está en true es que el filtro está activo
    descendente: true,                                                // Si está en true es que el filtro está activo
    byApi: false,                                                     // Si está en true es que el filtro está activo
    byDB: false,                                                      // Si está en true es que el filtro está activo
    byType: false,                                                    // Si está en true es que el filtro está activo
  },
  filtersActive: false,                                               // Si está en true es que algún filtro está activo
  filteredPokemons: [],                                               // almacena los pokemones con filtro
  paginado: 0,                                                      // paginado
};


// Creamos el reducer que gestionará los cambios en el estado de la aplicación
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        alPokemons: action.payload,
        error: null,
      }; 
      case GET_NAME:
        return {
          ...state,
          filter: true,
          pokemonsName: action.payload,
          error: null,
        };
        case SET_FILTER:
          return { 
            ...state, 
            filter: action.payload, 
            error: null 
          };
    
        case SET_ERROR:
          return { 
            ...state, 
            error: action.payload 
          };

      case TOGGLE_FILTER:
         if (action.payload === "byType") {               // EN CASO DE QUE SEA BYTYPE SIEMPRE SETEAR EN TRUE, NO INTERCALAR
           return {
            ...state,
               filters: {
                 ...state.filters,
                 [action.payload]: true,
                },
        };
      }
      return {
         ...state,
        filters: {
          ...state.filters,
          [action.payload]: !state.filters[action.payload],
        },
      };

    case FILTER_POKEMONS:
      return {
        ...state,
        error: null,
        filtersActive: true,
        filteredPokemons: action.payload,
      };

    case SET_FILTERS_INACTIVE:
      return {
        ...state,
        filtersActive: false,
        error: null,
        filters: {
          byAttack: false,
          alfabetic: false,
          ascendente: false,
          descendente: true,
          byApi: false,
          byDB: false,
          byType: false,
        },
      };

    case INCREMENT_PAGE:
      return {
        ...state,
        paginado: state.paginado + 1,
      };

    case SET_PAGE:
      return {
        ...state,
        paginado: action.payload,
      };

    case DECREMENT_PAGE:
      return {
        ...state,
        paginado: state.paginado - 1,
      };
        
      default:
        return { ...state };
      }
};

export default reducer;