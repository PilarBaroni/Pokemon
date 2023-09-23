import Search from "../Search/Search"
import { NavLink } from "react-router-dom";
import {
  toggleFilter,
  setFilterPokemons,
  setFilters,
  setPage,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const Nav = () => {
  const filters = useSelector((state) => state.filters); // setea las prop de los filtrod
  const pokemons = useSelector((state) => state.alPokemons); // todos los pokemons
  const [valueDrop, setValueDrop] = useState(""); // valor del input de types
  const [activeDrop, setActiveDrop] = useState(false); // CON ESTE STATE SABEMOS SI EL CLIENTE TOCO EL BOTON PARA HACER DISPLAY DE LOS TYPES
  const [typesData, setTypesData] = useState([]); // estado para guardar los types y mapearlos
  const dispatch = useDispatch();

  let filteredPokes = [...pokemons]; // copia de todos los pokemons

  useEffect(() => {
    // USAMOS USEEFFECT PARA CONSEGUIR LOS TYPES
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/types/");
        const typesArray = response.data;
        setTypesData(typesArray);
      } catch (error) {
        alert("Error al cargar los tipos de pokémon:", error);
      }
    };
    fetchTypes();
  }, []);

  // FUNCION PARA APLICAR LOS FILTROS

  const applyFilters = () => {
    let filteredAndSortedPokemon = [...filteredPokes]; // Crear una copia del arreglo

    if (filters.byType) { //entro al byType del objeto filters del state
      filteredAndSortedPokemon = filteredAndSortedPokemon.filter((pokemon) => {// si esta activo byType filtramos los pokemons que tienen el mismo tipo
                                                                    
        if (Array.isArray(pokemon.types)) {
         // VALOR QUE EL VALUE DEL DROP
          const typeNames = pokemon.types.map((type) => {
            if (typeof type === "string") {
              return type;
            } else if (typeof type === "object" && type.name) { 
              return type.name;
            }
            return null;
          });
          return typeNames.includes(valueDrop);
        }
        return false;
      });
      dispatch(setPage(0)); // SETEAMOS EL PAGE EN 0 (1) PARA NO GENERAR ERRORES
    }

    if (filters.byApi) {
      // Filtrar por la propiedad "created" igual a false
      filteredAndSortedPokemon = filteredAndSortedPokemon.filter(
        //si esta en true traemos a los pokemons de la api
        (pokemon) => !pokemon.created
      );
    }

    if (filters.byDB) {
      // Filtrar por la propiedad "created" igual a false
      filteredAndSortedPokemon = filteredAndSortedPokemon.filter(
        // SI EL FILTER BYAPI ES TRUE, HAY QUE TRAER LOS API POKEMONS
        (pokemon) => pokemon.created
      );
      dispatch(setPage(0)); // AL HABER GENERALMENTE POCOS POKEMONS CREADOS SETEAMOS EN 0 LA PAGE
    }

    if (filters.byAttack) {
      // SI BY ATTACK ES TRUE HAY QUE TRAER LOS POKEMONS ORDENADOS POR SU NIVEL DE ATAQUE
      if (filters.descendente) {
        // Ordenar por ataque en orden descendente
        filteredAndSortedPokemon.sort((a, b) => b.attack - a.attack);
      } else if (filters.ascendente) {
        // Ordenar por ataque en orden ascendente
        filteredAndSortedPokemon.sort((a, b) => a.attack - b.attack);
      } else {
        filteredAndSortedPokemon.sort((a, b) => b.attack - a.attack);
      }
    }

    if (filters.alfabetic) {
      // ORDENAR ALFABEETICAMENTE
      if (filters.descendente) {
        // Ordenar alfabéticamente en orden descendente
        filteredAndSortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.ascendente) {
        // Ordenar alfabéticamente en orden ascendente
        filteredAndSortedPokemon.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        // Si solo el filtro alfabético está activado, ordenar alfabéticamente
        filteredAndSortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    if (!filters.alfabetic && !filters.byAttack) {
      if (filters.ascendente) {
        filteredAndSortedPokemon.reverse();
      }
    }

    dispatch(setFilterPokemons(filteredAndSortedPokemon)); // LUEGO DE PASAR POR TODOS LOS FILTROS, HACEMOS DISPATCH DE COMO QUEDO EL ARRAY DE POKEMONS
  };

  //! setea los filtros en falso
  const handleSetFiltersInactive = () => {
    dispatch(setFilters());
  };

  // FUNCION PARA QUE CUANDO SE HAGA CLICK SOBRE ALGUN TYPE SETEAR EL TYPE COMO EL VALUE DEL DROP
  const show = (name) => {
    setValueDrop(name);
  };

  // FUNCION PARA SETEAR EN TRUE O FALSE EL DROP (ABIERTO O CERRADO)
  const activateDrop = () => {
    setActiveDrop(!activeDrop);
  };

  return (
    <div>
      <div >
        <div >
  
          <button>
            <NavLink to="/home">
              <button>Home</button>
            </NavLink>
          </button>
        </div>
        <div>
          <div >
            <Search />
          </div>
          <div >
            <div >
              <h2>Filter by:</h2>
              <button
                disabled={filters.byDB}
                onClick={() => dispatch(toggleFilter("byApi"))} // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
              >
                API Pokemons
              </button>
              <button
                disabled={filters.byApi}
                onClick={() => dispatch(toggleFilter("byDB"))} // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
              >
                Created Pokemons
              </button>
              <div
                onClick={activateDrop}
              >
                <input
                  type="text"
                 
                  placeholder="Types"
                  readOnly
                  value={valueDrop}
                />
                <div >
                  {typesData.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => {
                        show(type.name);
                        dispatch(toggleFilter("byType")); // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                      }}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div >
              <h2>Sort by:</h2>
              <div >
                <button

                  disabled={filters.byAttack}
                  onClick={() => dispatch(toggleFilter("alfabetic"))} // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                >
                  Alphabetical order
                </button>
                <button
      
                  onClick={() => dispatch(toggleFilter("byAttack"))} // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                  disabled={filters.alfabetic}
                >
                  Attack
                </button>
                <button
     
                  onClick={() => {
                    dispatch(toggleFilter("ascendente")); // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                    if (filters.descendente) {
                      // ADEMAS SETEAMOS EL OTRO EN FALSO
                      dispatch(toggleFilter("descendente"));
                    }
                  }}
                >
                  Ascending
                </button>

                <button
                  onClick={() => {
                    dispatch(toggleFilter("descendente")); // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                    if (filters.ascendente) {
                      // ADEMAS SETEAMOS EL OTRO EN FALSO
                      dispatch(toggleFilter("ascendente"));
                    }
                  }}
                >
                  Descending
                </button>
              </div>
            </div>
            <div>
              <div>
                <button onClick={applyFilters}>Aplicar Filtros</button>{" "}
                {/* EJECUTAMOS LA FUNCION APPLY FILTERS */}
              </div>
              <div >
                <button
                  onClick={() => {
                    handleSetFiltersInactive(); //SETEA TODOS LOS FILTROS EN FALSE Y BORRA EL VALUE DEL DROP
                    setValueDrop("");
                  }}
                >
                  Borrar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;