import { useState } from "react";
import axios from "axios";

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });
  
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
const handleInputChange = (event) => {
  const { name, value } = event.target;
  // Actualizamos el estado 'formData' para reflejar los cambios en los campos de entrada.
  setFormData({
    ...formData,
    [name]: value,
  });
};
const handleSubmit = async (event) => {
  event.preventDefault();

  // Crear un objeto con los datos del nuevo Pokémon
  const newPokemon = {
    name: formData.name,
    image: formData.image,
    hp: formData.hp,
    attack: formData.attack,
    defense: formData.defense,
    speed: formData.speed,
    height: formData.height,
    weight: formData.weight,
    types: selectedTypes,
  };

  try {
    // Enviar una solicitud POST al servidor para crear el Pokémon
    const response = await axios.post("http://localhost:3001/pokemons", newPokemon);

    // Verificar la respuesta del servidor
    if (response.status === 201) {
      console.log("Nuevo Pokémon creado con éxito:", response.data);
      // Puedes realizar acciones adicionales después de crear el Pokémon aquí
    }
  } catch (error) {
    console.error("Error al crear el Pokémon:", error);
    // Manejar errores de solicitud aquí
  }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input onChange={handleInputChange} type="text" id="name" name="name" required /><br /><br />

        <label htmlFor="image">Image URL: </label>
        <input onChange={handleInputChange} type="text" id="image" name="image" required /><br /><br />

        <label htmlFor="hp">HP: </label>
        <input onChange={handleInputChange} type="number" id="hp" name="hp" required /><br /><br />

        <label htmlFor="attack">Attack: </label>
        <input onChange={handleInputChange} type="number" id="attack" name="attack" required /><br /><br />

        <label htmlFor="defense">Defense: </label>
        <input onChange={handleInputChange} type="number" id="defense" name="defense" required /><br /><br />

        <label htmlFor="speed">Speed: </label>
        <input onChange={handleInputChange} type="number" id="speed" name="speed" /><br /><br />

        <label htmlFor="height">Height: </label>
        <input onChange={handleInputChange} type="number" id="height" name="height" /><br /><br />

        <label htmlFor="weight">Weight: </label>
        <input onChange={handleInputChange} type="number" id="weight" name="weight" /><br /><br />

        <label htmlFor="type">Type: </label>
        <div> 
        <select id="type"  multiple={true} onChange={handleTypeChange} value={selectedTypes}>
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

        <button type="sumbit">Crear Pokémon</button>
      </form>
    </div>
  );
};

export default FormPage;