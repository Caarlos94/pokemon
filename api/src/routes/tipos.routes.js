const { Router } = require("express")
const { getTipos, getTipoId, postTipo, updateTipo, deleteTipo } = require("../controllers/tipos.controllers")

const router = Router()

router.get("/", getTipos)
router.get("/:id", getTipoId)
router.post("/", postTipo)
router.put("/:id", updateTipo)
router.delete("/:id", deleteTipo)

module.exports = router