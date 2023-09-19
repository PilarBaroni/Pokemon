const URL = "https://pokeapi.co/api/v2/pokemon/"; 
const axios = require("axios"); 
const{Pokemon,Type}= require ("../db");

const getPokemons = async (req, res) => { 
  try { 
    const { data } = await axios.get(`${URL}?limit=10`); // Obtención de datos de la API de Pokémon y limitación a 10 Pokémon

    const pokemonList = data.results; // Extracción de la lista de Pokémon de los datos obtenidos de la API

    const pokemonDetails = []; // Creación de un arreglo para almacenar los detalles de cada Pokémon

    await Promise.all(pokemonList.map(async (pokemon) => { // Uso de 'Promise.all' para realizar solicitudes en paralelo a la API para obtener detalles de cada Pokémon
      const response = await axios.get(pokemon.url); // Obtención de detalles de un Pokémon individual
      const data = response.data; // Extracción de los datos del Pokémon de la respuesta

      const character = { // Creación de un objeto 'character' con detalles específicos del Pokémon
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

      pokemonDetails.push(character); // Agregación del objeto 'character' al arreglo 'pokemonDetails'
    }));

    const dbPokemons = await Pokemon.findAll({ // Obtención de datos de la base de datos 
      include: {
        model: Type,
        attributes: ['name'],
        through: { attributes: [] }
      }
    });

    const combinedPokemons = [...dbPokemons, ...pokemonDetails]; // Combinación de datos de la base de datos y de la API

    res.status(200).json(combinedPokemons); // Devolución de una respuesta JSON con los datos combinados
  } catch (error) { 
    res.status(500).json({ message: error.message }); // Devolución de una respuesta de error con un código de estado 500 y un mensaje de error en formato JSON
  }
};

module.exports = { 
  getPokemons
};