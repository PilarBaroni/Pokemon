const axios = require ("axios");
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const pokemonName = async (req, res) => {
  const {name} = req.query;
    try {
      // Obtener el nombre de la consulta (query param)
      if (!name) {
        return res.status(400).json({ message: "Debe proporcionar un nombre de Pokémon." });
      }
  
      // Convertir el nombre de la consulta a minúsculas para hacer una búsqueda insensible a mayúsculas y minúsculas
      const lowercaseNameQuery = name.toLowerCase();
  
      try {
        // Construir la URL de la API de Pokémon con el nombre proporcionado
        const pokemonAPIUrl = `${API_URL}/${lowercaseNameQuery}`;
  
        // Realizar una solicitud a la URL construida
        const { data } = await axios.get(pokemonAPIUrl);
        
         
        // Crear el objeto "character" con los detalles del Pokémon
        let pokemon = data.filter(nombre => nombre.name.toLowerCase() === lowercaseNameQuery);
        
         pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
          attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
          defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
          speed: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type) => type.type.name),
        };
        // Responder con el Pokémon encontrado
        res.status(200).json(pokemon);
      } catch (error) {
        // Si no se encuentra en la API, buscar en la base de datos
        const foundPokemon = pokemonDatabase.find(
          (pokemon) => pokemon.name.toLowerCase() === lowercaseNameQuery
        );
  
        if (foundPokemon) {
          // Si se encuentra en la base de datos, responder con los datos
          res.status(200).json(foundPokemon);
        } else {
          // Si no se encuentra en ninguna parte, responder con un mensaje de error
          res.status(404).json({ message: "Pokémon no encontrado." });
        }
      }
    } catch (error) {
      // Manejar otros errores
      res.status(500).json({ message: "Error interno del servidor." });
    }
  };

  module.exports ={
    pokemonName
  };