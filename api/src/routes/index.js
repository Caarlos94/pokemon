const { Router } = require('express');
const { Type } = require("../db.js"); 
const { getType } = require('./functions.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokeRouter = require('./pokeRouter.js');

const router = Router();
      
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokeRouter);

router.get("/types", async (req, res) => { 
    try {  
        const fn = await getType()
        const typesArr = fn.results.map(type => type.name)
        console.log(typesArr);
        typesArr.forEach(async (tipo) => {
              await Type.findOrCreate({where: {name: tipo}})
        }) 
        res.status(200).json(typesArr)

    } catch (error) {
       res.status(400).send(error.message) 
    }
}) 

module.exports = router;