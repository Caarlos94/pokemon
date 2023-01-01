export const GET_POKEMON = "GET_POKEMON"
export const GET_TYPES = "GET_TYPES"
export const ADD_POKEMON_BY_NAME = "ADD_POKEMON_BY_NAME"
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL"
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"
export const FILTER_BY_ALPHABET = "FILTER_BY_ALPHABET"
export const FILTER_BY_EXISTING = "FILTER_BY_EXISTING"
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK"
export const FILTER_BY_SEARCH = "FILTER_BY_SEARCH"
export const CLEAN_POKEMON = "CLEAN_POKEMON"
export const CLEAN_TYPES = "CLEAN_TYPES"
export const SHOW_ALL = "SHOW_ALL"
export const EMPTY_ERROR = "EMPTY_ERROR"

export const getPokemons = () => {
    return function (dispatch) {
        fetch(`https://pokemon-production-d92c.up.railway.app/pokemons`)
        .then(response => response.json())
        .then((data) => dispatch({type: GET_POKEMON, payload: data}))
    }
}

export const addPokemonsByName = (name) => {
    return function (dispatch) {
        fetch(`https://pokemon-production-d92c.up.railway.app/pokemons?name=${name}`)
        .then(response => response.json())
        .then((data) => dispatch({type: ADD_POKEMON_BY_NAME, payload: data}))
    }
}

export const getTypes = () => {
    return function (dispatch) {
        fetch(`https://pokemon-production-d92c.up.railway.app/types`)
        .then(response => response.json())
        .then((data) => dispatch({type: GET_TYPES, payload: data}))
    }
}

export const getPokemonDetail = (id) => {
    return function (dispatch) {
        fetch(`https://pokemon-production-d92c.up.railway.app/pokemons/${id}`)
        .then(response => response.json())
        .then((data) => dispatch({type: GET_POKEMON_DETAIL, payload: data}))
    }
} 

export const createPokemon = (dataForm) => {
    return function (dispatch){
        fetch('https://pokemon-production-d92c.up.railway.app/pokemons', {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(dataForm),
        })
    }
}

export const cleanPokemon = () => {
    return {type: CLEAN_POKEMON}
}

export const emptyError = () => {
    return {type: EMPTY_ERROR}
}

export const showAll = () => {
    return {type: SHOW_ALL}
}

export const filterBySearch = (name) => {
    return {type: FILTER_BY_SEARCH, payload: name}
}

export const filterByType = (type) => {
    return {type: FILTER_BY_TYPE, payload: type}
}

export const filterByAlphabet = (order) => {
    return {type: FILTER_BY_ALPHABET, payload: order}
}

export const filterByExisting = (option) => {
    return {type: FILTER_BY_EXISTING, payload: option}
}

export const filterByAttack = (option) => {
    return {type: FILTER_BY_ATTACK, payload: option}
}