import { useState } from "react";

const FormPage = () => {
// Creamos un estado 'selectedTypes' para rastrear los tipos seleccionados.
const [selectedTypes, setSelectedTypes] = useState([]);

// Esta función se ejecuta cada vez que cambia la selección en la lista desplegable.
const handleTypeChange = (event) => {
  // Obtenemos todas las opciones en la lista desplegable.
  const options = event.target.options;

  // Creamos un array 'selectedValues' para almacenar los valores seleccionados.
  const selectedValues = [];

  // Recorremos todas las opciones de la lista.
  for (let i = 0; i < options.length; i++) {
    // Si una opción está marcada como seleccionada (checkbox marcado).
    if (options[i].selected) {
      // Agregamos el valor de esa opción al array 'selectedValues'.
      selectedValues.push(options[i].value);
    }
  }

  // Actualizamos el estado 'selectedTypes' concatenando los nuevos valores seleccionados.
  // Esto significa que estamos agregando los nuevos valores a la lista existente en lugar de reemplazarla.
  setSelectedTypes(selectedTypes.concat(selectedValues));
};
  return (
    <div>
      <form >
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" required /><br /><br />

        <label htmlFor="image">Image: </label>
        <input type="text" id="image" required /><br /><br />

        <label htmlFor="hp">HP: </label>
        <input type="number" id="hp" required /><br /><br />

        <label htmlFor="attack">Attack: </label>
        <input type="number" id="attack" required /><br /><br />

        <label htmlFor="defense">Defense: </label>
        <input type="number" id="defense" required /><br /><br />

        <label htmlFor="speed">Speed: </label>
        <input type="number" id="speed" /><br /><br />

        <label htmlFor="height">Height: </label>
        <input type="number" id="height" /><br /><br />

        <label htmlFor="weight">Weight: </label>
        <input type="number" id="weight" /><br /><br />

        <label htmlFor="type">Type: </label>
        <div> 
        <select id="type" multiple={true} onChange={handleTypeChange} value={selectedTypes}>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select><br /><br />
        </div>
        <div>
          <p>Seleccionado(s): {selectedTypes.join(", ")}</p>
        </div>

        <button type="button" >Crear Pokémon</button>
      </form>
    </div>
  );
};

export default FormPage;