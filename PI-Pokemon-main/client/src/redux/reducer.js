// Importamos las constantes para las acciones
import { ORDER_ATTACK,
  ORDER_BY_NAME,
  SET_FILTER_BY_ORIGIN,
  SET_FILTER_BY_TYPE,
  LOAD_POKEMON, 
  GET_ALL_POKEMONS,
  GET_ALL_TYPES } from "./actions-type";

// Definimos el estado inicial de nuestra aplicación
const initialState = {
  alPokemons: [],    // Almacena todos los pokemones
  alTypes: [],         
  pokemonsFilt: [],
  detailPokemon: {},
  pokemons:[],
  dbPokemons: [],
  apiPokemons: []

};

// Creamos el reducer que gestionará los cambios en el estado de la aplicación
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      const apiPokemons = action.payload.filter((pokemon) => !isNaN(pokemon.id));
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
        alTypes: action.payload
      };
      case LOAD_POKEMON:
        return {
            ...state,
            detailPokemon: action.payload
        }
        case SET_FILTER_BY_TYPE:
               
        const filteredType = state.alPokemons.filter(poke => poke.types.includes(action.payload));
      
        return {
            ...state,
            pokemons: action.payload === 'All' ? state.alPokemons : filteredType


        };
      case SET_FILTER_BY_ORIGIN:
            let originFilter = [];
          
            switch (action.payload) {
              case 'DataBase':
                originFilter = state.dbPokemons;
                break;
              case 'Api':
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
              const sortedPokemons = action.payload === 'Ascendant'
              ? state.pokemons.sort((a,b)=>{
                  if(a.name > b.name){
                      return 1;
                  }
                  if(b.name > a.name){
                      return -1;
                  }
                  return 0
              })
              
              : state.pokemons.sort((a,b)=>{
                  if(a.name >b.name){
                      return -1;
                  }
                  if(b.name > a.name){
                      return -1;
                  }
                  return 0;
              });
              
              return{
                  ...state,
                  pokemons: sortedPokemons,
              }
        case ORDER_ATTACK:
                const pokemonesAttack = state.pokemons;
                const sortedByAttack =
                  action.payload === 'Attack-ASC'
                    ? pokemonesAttack.sort((a, b) => {
                        if (a.attack > b.attack) {
                          return 1;
                        }
                        if (b.attack > a.attack) {
                          return -1;
                        }
                        return 0;
                      })
                    : pokemonesAttack.sort((a, b) => {
                        if (b.attack > a.attack) {
                          return 1;
                        }
                        if (a.attack > b.attack) {
                          return -1;
                        }
                        return 0;
                      });
                return { ...state, pokemons: sortedByAttack };
            
        
      default:
        return { ...state };
      }
};

export default reducer;