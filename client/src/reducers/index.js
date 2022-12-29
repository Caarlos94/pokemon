import { GET_POKEMON, GET_POKEMON_DETAIL, ADD_POKEMON_BY_NAME, GET_TYPES, FILTER_BY_TYPE, FILTER_BY_ALPHABET, FILTER_BY_EXISTING, FILTER_BY_ATTACK, SHOW_ALL, CLEAN_POKEMON, FILTER_BY_SEARCH, EMPTY_ERROR } from '../actions/index'

const initialState = {
    allPokemons:[],
    pokemons: [],
    pokemonsFilter:[],
    types: [],
    pokeDetail: {},
    error: false,
}

const reducer = (state=initialState, action) => {
switch(action.type){

    case SHOW_ALL: 
    return {...state, pokemons: state.allPokemons}

    case EMPTY_ERROR: 
    return {...state, error: false}

    case GET_POKEMON:
    return {...state, pokemons: action.payload, allPokemons: action.payload, pokemonsFilter: action.payload}
    
    case ADD_POKEMON_BY_NAME:
        if(typeof action.payload === "string") { 
           return {...state, error: true }
        } else {    // antes de añadir el pokemon que busque si existe en el array de pokemons
                    // si existe que no lo añada    // si no existe que lo busque y lo añada
        const pokeFilt = state.pokemons.filter(poke => poke.name === action.payload.name)
        return { ...state,  
                    pokemons: (pokeFilt.length === 0) ?([...state.pokemons, action.payload]) :([...state.pokemons]),
                    allPokemons: (pokeFilt.length === 0) ?([...state.allPokemons, action.payload]) :([...state.allPokemons])
                }}

    case GET_POKEMON_DETAIL:
    return {...state, pokeDetail: action.payload} 

    case GET_TYPES:
    return {...state, types: action.payload}

    case CLEAN_POKEMON:
    return {...state, pokeDetail:{}}

    case FILTER_BY_SEARCH:
    return {...state, pokemons: state.pokemons.filter(
        poke => poke.name.includes(action.payload)
    )}

    case FILTER_BY_TYPE:
        const pokeFilter = state.pokemonsFilter.filter(poke => poke.types.includes(action.payload))
    return {...state, pokemons: pokeFilter, error: (pokeFilter.length === 0) ? true : null }

    case FILTER_BY_ALPHABET:  // HACER UN FILTRO POR ORDEN ALFABETICO
    if(action.payload === "AZ"){ 
        return {...state, allPokemons: [...state.allPokemons], pokemons: state.pokemons.sort((a, b)=>{
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0; 
    })}
    }
    else {
        return {...state, allPokemons: [...state.allPokemons], pokemons: state.pokemons.sort((a, b)=>{
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
        })}}

    case FILTER_BY_ATTACK:
    if(action.payload === "MA"){
        return {...state, allPokemons: [...state.allPokemons], pokemons: state.pokemons.sort((a, b)=>{
            if (a.attack < b.attack) return 1;
            if (a.attack > b.attack) return -1;
            return 0;
        })}
    }
    else {
        return {...state, allPokemons: [...state.allPokemons], pokemons: state.pokemons.sort((a, b)=>{
            if (a.attack > b.attack) return 1;
            if (a.attack < b.attack) return -1;
            return 0; 
        })}}

    case FILTER_BY_EXISTING:
    if(action.payload === "All") {
        return {...state, pokemons: state.allPokemons}}
    else if(action.payload === "Ex") {
        return {...state, pokemons: state.pokemonsFilter.filter( poke => poke.hasOwnProperty('created') !== true )}}
    else if(action.payload === "Cr") {
        const pokeFilter = state.pokemonsFilter.filter(poke => poke.created === true)
        return {...state, pokemons: pokeFilter, error: (pokeFilter.length === 0) ? true : null }}

    default:
        return{...state} 
}
}

export default reducer