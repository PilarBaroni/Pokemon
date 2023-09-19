const URL = "https://pokeapi.co/api/v2/pokemon/"; 
const axios = require("axios"); 
const { Pokemon, Type } = require('../db'); 

const pokemonid = async (req, res) => { // Definición de la función 'pokemonid' para manejar una solicitud HTTP
  try { // Inicio de un bloque 'try' para manejar errores
    const { idPokemon } = req.params; // Obtención del parámetro "idPokemon" de la solicitud
    
    if (isNaN(idPokemon)) { // Verificación si el "idPokemon" no es un número (suponemos que se refiere al ID en la base de datos)
      const localPokemon = await Pokemon.findOne({
        where: { id: idPokemon },
        include: Type, // Inclusión del tipo del Pokémon
      });

      if (localPokemon) {
        return res.status(200).json(localPokemon); // Si se encuentra en la base de datos local, devuelve los detalles locales
      }
    }

    const { data } = await axios.get(`${URL}${idPokemon}`); // Realización de una solicitud HTTP a la API de Pokémon para obtener detalles

    if (!data.name) { // Verificación si la respuesta no contiene el nombre del Pokémon
      throw new Error("Faltan datos del personaje con ID: " + idPokemon);
    }

    const character = { // Creación de un objeto "character" con la información del Pokémon obtenida
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
      attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
      defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
      speed: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
      height: data.height,
      weight: data.weight,
      types: data.types.map((type) => type.type.name)
    };

    return res.status(200).json(character); // Responder con un estado 200 (éxito) y el objeto "character" como JSON

  } catch (error) { 
    return error.message.includes("ID")
      ? res.status(404).send(error.message) // Si el mensaje de error incluye "ID", responder con un estado 404 (no encontrado)
      : res.status(500).send(error.message); // De lo contrario, responder con un estado 500 (error interno del servidor)
  }
};

module.exports = {
  pokemonid
};