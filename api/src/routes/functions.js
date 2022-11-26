const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const getType = async () => {
    let response = await fetch(`https://pokeapi.co/api/v2/type`); // RETORNA UN OBJETO
    let commits = await response.json(); // leer respuesta del cuerpo y devolver como JSON
    return commits
}

const pokemonFetchById = async (id) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let commits = await response.json(); // leer respuesta del cuerpo y devolver como JSON
    return commits
}

const pokemonFetchByName = async (name) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let commits = await response.json(); // leer respuesta del cuerpo y devolver como JSON
    return commits
}

// EJEMPLO CON PROMESA
// const pokemonFetchByName = (name) => {
//     fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
//         then(response => response.json())
//         then(value => console.log(value))
//         return pro
// }

// var promResuelta = Promise.resolve(33);
// var thenProm = promResuelta.then(función(valor){
//   console.log("ésto será invocado cuando acabe el stack principal. El valor recibido y devuelto es: " + valor);
//   return valor;
// });

const showPokemon = (pokemon) => {
    const type = pokemon.types.map(element => element.type.name) 
    return poke = {
        id: pokemon.id,
        name: pokemon.name,
        attack: pokemon.stats[1].base_stat,
        img: pokemon.sprites.other.dream_world.front_default,
        types: type,
        life: pokemon.stats[0].base_stat, 
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        height:pokemon.height,
        weight: pokemon.weight
    }
}

let idAumentor = () => {
    let arr = []
    for (let i=1; i<=40; i++){
      arr.push(i)
    }
    return arr
  }

//   const infoPokes = async () => {
//     const funPokemon = idAumentor()
//     const llamados = funPokemon.map(id => pokemonFetchById(id))
//     Promise.all(llamados)
//     .then(values => values.map(element => {
//         let types = element.types.map(tipo => tipo.type.name)
//         return obj = {
//             id: element.id,
//             name: element.name,
//             attack: element.stats[1].base_stat,
//             img: element.sprites.other.home.front_default,
//             types: types
//         }    
//     }))  
//     .then(values => console.log("hllas"))
//     return values
//   }

//   const pokemonFetchByName = async (name) => {
//     let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
//     let commits = await response.json(); // leer respuesta del cuerpo y devolver como JSON
//     return commits
// }

module.exports = {
    getType,
    pokemonFetchById,
    pokemonFetchByName,
    showPokemon,
    idAumentor,
}