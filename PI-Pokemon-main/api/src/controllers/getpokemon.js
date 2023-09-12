const URL = "https://pokeapi.co/api/v2/pokemon/";
const axios = require ("axios");

const getPokemons = async (req, res) => {
  try {
    // Realizar una solicitud a la API para obtener una lista de Pokémon
    const { data } = await axios.get(`${URL}?limit=10`); // Limitamos a 10 Pokémon por ejemplo
    const pokemonList = data.results;

    // Crear un arreglo para almacenar los detalles de cada Pokémon
    const pokemonDetails = [];

    // Realizar solicitudes individuales para obtener detalles de cada Pokémon
    await Promise.all(pokemonList.map(async (pokemon) => {
      const response = await axios.get(pokemon.url);
      const data = response.data;

      // Crear el objeto "character" con los detalles del Pokémon
      const character ={
        id: data.id,
        name:data.name,
        image: data.image,
        hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        speed: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type)=>type.type.name)
    };

      // Agregar el objeto "character" al arreglo de detalles
      pokemonDetails.push(character);
    }));

    res.status(200).json(pokemonDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
  module.exports = {
    getPokemons
  };