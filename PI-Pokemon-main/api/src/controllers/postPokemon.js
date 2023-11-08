const { Pokemon, Type } = require('../db');

const postPokemon = async (req, res) => {
  try {
    // Obtiene los datos del cuerpo de la solicitud
    const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

    if (!name || !image || !hp || !attack || !defense || !types)
      return res.status(401).json({ message: "Faltan datos" });

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

    // Itera sobre los tipos uno por uno y espera cada promesa
    for (const type of types) {
      // Busca un tipo existente o crea uno nuevo si no existe
      const [foundType] = await Type.findOrCreate({
        where: { name: type },
        defaults: { name: type },
      });

      // Relaciona el nuevo Pokémon con el tipo encontrado/creado
      await newPokemon.addType(foundType);
    }

    // Responde con un código de estado 201 (creado) y los datos del nuevo Pokémon
    return res.status(201).json(newPokemon);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postPokemon
};