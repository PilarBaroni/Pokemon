const { Router } = require('express');
const router = Router();
const {pokemonid} = require ("../controllers/pokemonid");
const {getPokemons} = require ("../controllers/getpokemon");
const {pokemonName} = require ("../controllers/pokemonname");
const {postPokemon} = require ("../controllers/postPokemon");
const {getTypes} = require ("../controllers/pokemonTypes")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", (req,res)=>{
   getPokemons(req,res);
});

router.get("/pokemons/:idPokemon", (req,res)=>{
    pokemonid (req,res);
});

router.get("/pokemons/name", (req,res)=>{
    pokemonName(req,res);
});

router.get("/types", (req,res)=>{
    getTypes(req,res);
});

router.post("/pokemons", (req,res)=>{
    postPokemon(req,res);
});

module.exports = router;
