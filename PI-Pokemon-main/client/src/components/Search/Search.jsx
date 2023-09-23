import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName, setFilter } from "../../redux/actions"
import { NavLink } from "react-router-dom";

const Search = () => {
  const [name, setName] = useState("");                               // CONSEGUIMOS MEDIANTE UN STATE EL NAME QUE SE ESTA BUSCANDO
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const updatedName = event.target.value;                           // MIENTRAS CAMBIA EL INPUT TAMBIEN LO HACE EL NAME
    setName(updatedName);

    if (updatedName.length === 0) {
      // Cambiar la propiedad filter del estado global a false
      dispatch(setFilter(false)); //                                // EN EL CASO DE QUE SE BORRE EL NAME, SETEAR EN FALSE EL FILTER
    }
  };

  const searchName = () => {
    dispatch(getName(name));                               // FUNCION PARA HACER DISPATCH DE LA ACTION QUE CONSIGUE EL POKEMON
  };

  return (
    <div>
      <div >
        <input
          type="search"
          value={name}
          onChange={handleChange}
          placeholder="Pokemon Name"
        />
        <button onClick={searchName}>
          Find Pokémon
        </button>
      </div>
      <div>
        <NavLink to="/form">
          <button>
          Create a Pokemon
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Search;