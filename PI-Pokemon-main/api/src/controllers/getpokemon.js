const URL = "https://pokeapi.co/api/v2/pokemon/"; 
const axios = require("axios"); 
const{Pokemon,Type}= require ("../db");

const getPokemons = async (req, res) => { 
  try { 
    const { data } = await axios.get(`${URL}?limit=10`); // Obtención de datos de la API de Pokémon y limitación a 10 Pokémon

    const pokemonList = data.results; // Extracción de la lista de Pokémon de los datos obtenidos de la API
    
    const pokemonDetails = []; // Creación de un arreglo para almacenar los detalles de cada Pokémon

    for(let i=0;i<pokemonList.length;i++){
      let response = await axios(pokemonList[i].url);
      response=response.data;
      const character = { // Creación de un objeto 'character' con detalles específicos del Pokémon
        id: response.id,
        name: response.name,
        image: response.sprites.front_default,
        hp: response.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        attack: response.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defense: response.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        speed: response.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        height: response.height,
        weight: response.weight,
        types: response.types.map((type) => type.type.name)
      };
      pokemonDetails.push(character);
    }

    // Realiza una consulta a la base de datos para buscar todos los registros de Pokémon
    const dbPokemons = await Pokemon.findAll({
      // La opción "include" se utiliza para incluir relaciones relacionadas en la consulta
      include: {
          // Especifica el modelo relacionado, en este caso, "Type" para obtener información sobre los tipos de Pokémon
        model: Type,
        // Limita los atributos del modelo Type que se incluirán en el resultado, en este caso, solo el atributo "name"
        attributes: ["name"],
        // "through" se utiliza para especificar la tabla intermedia en relaciones muchos a muchos
        through: {
          // "attributes" se utiliza para limitar los atributos de la tabla intermedia en el resultado
          attributes: []
        }
      }
    });



    const combinedPokemons = [...pokemonDetails, ...dbPokemons]; // Combinación de datos de la base de datos y de la API

    res.status(200).json(combinedPokemons); // Devolución de una respuesta JSON con los datos combinados
  } catch (error) { 
    res.status(500).json({ message: error.message }); // Devolución de una respuesta de error con un código de estado 500 y un mensaje de error en formato JSON
  }
};

module.exports = { 
  getPokemons
};