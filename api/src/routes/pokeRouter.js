const { Router } = require('express')
const pokeRouter = Router()
const { Pokemon, Type } = require("../db")
const { pokemonFetchById, pokemonFetchByName, idAumentor, showPokemon } = require('./functions.js');
       
pokeRouter.get("/", async (req, res) => {   
    const { name } = req.query
    if(!name){ // SI NO HAY NAME MOSTRÁ LA INFO DE LA RUTA PRINCIPAL DE LOS PRIMEROS 12 POKEMONS
        try {          
            const funPokemon = idAumentor()
            const llamados = funPokemon.map(id => pokemonFetchById(id))
   
            const busqueda = await Pokemon.findAll({include:[{model:Type, attributes: ["name"], through: { attributes: [] }}]})
            busqueda.forEach(e => {
                let newArr = e.dataValues.types.map(element => element.name)
                e.dataValues.types = newArr.join(", ");
            })   
 
            Promise.all(llamados) 
            .then(values => values.map(element => {
                let types = element.types.map(tipo => tipo.type.name)
                return obj = {  
                    id: element.id,
                    name: element.name,
                    attack: element.stats[1].base_stat,
                    img: element.sprites.other.home.front_default,
                    types: types
                }      
            }))  
            .then(values => res.status(200).json(values.concat(busqueda))) 
        } catch (error) {
           res.status(400).send(error.message) 
        } 
    } else { // SI HAY NAME     
        try { // PRIMERO BUSCÁ ESE NAME EN LA BASE DE DATOS
            const busqueda = await Pokemon.findOne({ where: {name}, include:[{model:Type}]})
            // console.log(busqueda); // OBJETO
            // console.log(busqueda.types); // ESE OBJETO TIENE UN PROPIEDAD LLAMADA TYPES
            if(!busqueda) { // SI NO LO ENCUENTRA EN LA BASE DE DATOS, BUSCARLO EN LA API
                const result = await pokemonFetchByName(name)
                res.status(200).json(showPokemon(result))
            } else {     
                // SI ESTÁ EN LA BD LO MANDA 
                const tipos = busqueda.types.map(tipo => tipo.dataValues.name) // MAPEO LA PROPIEDAD TYPES ES UN ARREGLO DE OBJETOS
                console.log(tipos);                                            // CADA OBJETO TIENE UNA PROPIEDAD DATAVALUES QUE A SU VEZ 
                const newPokeWithTypes = { ...busqueda.dataValues, types: tipos.join(", ") };  // TIENE UNA PROPIEDAD LLAMADA NAME
                res.status(200).json(newPokeWithTypes)   
            }   
        } catch (error) { // NO ESTÁ NI EN LA BASE DE DATOS NI EN LA API
            res.status(200).json("ESE POKEMON NO EXISTE") 
        } 
    } 
})

pokeRouter.get("/:id", async (req, res) => { 
    const { id } = req.params 
    try { 
        const busqueda = await Pokemon.findAll({include:[{model:Type}]})
        const check = busqueda.find(poke => poke.id.toString() === id)
        if(!check) { 
            const result = await pokemonFetchById(id)
            res.status(200).json(showPokemon(result))
        } else {  
            const tipos = check.types.map(tipo => tipo.name)
            const newPokeWithTypes = { ...check.dataValues, types: tipos };
            res.status(200).json(newPokeWithTypes)  
        }
    } catch (error) {
        res.status(200).json("ESE ID DE POKEMON NO EXISTE") 
    } 
}) 
  
pokeRouter.post("/", async (req, res) => {
    try {
        const data = req.body;
        const { type } = req.body 
        const newPokemon = await Pokemon.create(data)
        const DatabaseTypes = await Type.findAll({ where: { name: type } })
        await newPokemon.addType(DatabaseTypes)
        res.status(200).json(newPokemon)
    } catch (error) {
        res.status(400).json(error.message)
    }
}) 

// pokeRouter.delete("/" , async(req, res) => {
//     try {
//         const { id } = req.body 
//         const poke = await Pokemon.findByPk(id)
//         await poke.destroy()
//         res.status(200)._construct.send(poke)
//     } catch (error) {
//         res.status(404).send(error.message)
//     }
// })

// pokeRouter.put("/:atributo", async(req, res) => {
//     const { atributo } = req.params
//     const { value } = req.query
//     try {
//         const newPoke = await Pokemon.update(
//             {[atributo]: value},
//             {where:{[atributo]:null}}
//         )
//         res.status(404).send(newPoke)
//     } catch (error) {
//         res.status(404).send(error.message)
//     }
// })

module.exports = pokeRouter;