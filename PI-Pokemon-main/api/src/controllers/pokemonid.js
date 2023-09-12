const URL = "https://pokeapi.co/api/v2/pokemon/";
const axios = require ("axios");

const pokemonid= async (req,res) => {
    try{ 
        // Obtengo el parámetro "id" de la solicitud
      const {idPokemon} = req.params;
      // Realizo una solicitud a la URL de la API de Pokémon con el ID proporcionado
      const {data} = await axios(URL+idPokemon)

     //Entra a la BDD
      if(isNaN(idPokemon)){
        const localPokemon = await Pokemon.findOne({
          where: { id: idPokemon },
          include: Type, // Incluye el tipo del Pokémon
        });  

        if (localPokemon) {
          // Si se encuentra en la base de datos local, devuelve los detalles locales
          return res.status(200).json(localPokemon);
        }
      }

        // Verifico si la respuesta no contiene el nombre del personaje
        if(!data.name) throw new Error("Faltan datos del personaje con ID: " + idPokemon );
        
        // Creo un objeto "character" con la información del personaje obtenida
        const character ={
            id: data.id,
            name:data.name,
            image: data.sprites.front_default,
            hp: data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
            attack: data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
            defense: data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
            speed: data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
            height: data.height,
            weight: data.weight,
            types: data.types.map((type)=>type.type.name)
        };

        // Responde con un estado 200 (éxito) y el objeto "character" como JSON
        return res.status(200).json(character);

        
    }  catch (error){
     // Manejo los errores
    // Si el mensaje de error incluye "ID", respondemos con un estado 404 (no encontrado)
    // De lo contrario, responde con un estado 500 (error interno del servidor)
            return error.message.includes("ID")
            ? res.status(404).send(error.message)
            : res.status(500).send(error.message)
        } 
}

module.exports = {
    pokemonid
};