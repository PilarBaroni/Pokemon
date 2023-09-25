const { Pokemon, Type } = require('../db');

const postPokemon = async (req, res) => {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
    /* console.log(name); */    
    if (!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types)
     res.status(401).json({ message: "Faltan datos" });

    // Crea el nuevo Pokémon en la base de datos
    const newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    // Crea un array de promesas para buscar o crear los tipos del Pokémon
    const typesPromisesArr = types.map(async (type) => {
      // Busca un tipo existente o crea uno nuevo si no existe
      const [foundType] = await Type.findOrCreate({
        where: {name: type },
        defaults: { name: type }
      });
      
      return foundType;
    });

    // Espera a que todas las promesas de tipos se resuelvan y devuelve los tipos encontrados/creados
    const foundTypes = await Promise.all(typesPromisesArr);

    // Relaciona el nuevo Pokémon con los tipos indicados
    await newPokemon.addTypes(foundTypes);

    // Responde con un código de estado 201 (creado) y los datos del nuevo Pokémon
    return res.status(201).json(newPokemon);
  } catch (error) {
    
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postPokemon
};