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

    const typesPromisesArr = types.map(async(type)=>{
      const [foundType] = await Type.findOrCreate({
        where:{type},
        default:{type}
      })
      return foundType;
    });
    const foundTypes = await Promise.all(typesPromisesArr)
  
    // Relaciona el nuevo Pokémon con los tipos indicados
    await newPokemon.addTypes(foundTypes);

    return res.status(201).json(newPokemon);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postPokemon
};