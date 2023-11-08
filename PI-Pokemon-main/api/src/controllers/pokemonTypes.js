const axios = require('axios');
const {Type} = require('../db');


const getTypes = async(req, res)=>{
    try {
         
        const dbTypes = await Type.findAll();
        // Verifica si la base de datos está vacía
        if(dbTypes.length===0){
            // Si la base de datos está vacía, obtiene los tipos de la API
            const apiResponse = await axios.get('https://pokeapi.co/api/v2/type');
            const apiTypes = apiResponse.data.results;
        
            // Guarda los tipos de la API en la base de datos
            await Type.bulkCreate(apiTypes.map((type) => ({ name: type.name })));

            // Vuelve a consultar los tipos de la base de datos
            const updatedDbTypes = await Type.findAll();
            return res.status(200).json(updatedDbTypes);
        }
        
        else{
            return res.status(200).json(dbTypes);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Ocurrió un error al obtener los tipos de Pokémon' });
    }
}

module.exports ={
    getTypes
} ;