const { Router } = require("express")
const { getPokemon, getPokemonId, postPokemon, updatePokemon, deletePokemon } = require("../controllers/pokemon.controllers")

const router = Router()

router.get("/", getPokemon)
router.get("/:id", getPokemonId)
router.post("/", postPokemon)
router.patch("/:id", updatePokemon)
router.delete("/:id", deletePokemon)

module.exports = router