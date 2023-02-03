const { Router } = require("express")
const rutaPokemon = require('./routes/pokemon.routes.js');
const rutaTipos = require('./routes/tipos.routes.js');

const router = Router()

router.use('/pokemons', rutaPokemon);
router.use('/tipos', rutaTipos);

module.exports = router;