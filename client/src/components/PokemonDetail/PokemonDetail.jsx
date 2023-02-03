import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { cleanPokemon, getPokemonDetail } from "../../actions";
import { Link } from "react-router-dom";
import "./PokemonDetail.css"

const PokemonDetail = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokemonDetail(props.match.params.id));
    return function(){
      dispatch(cleanPokemon())
    }
  }, [props.match.params.id, dispatch]);  

  const pokemonDetail = useSelector((state) => state.pokeDetail)

  return (
    <div className="principalContainer">
      <div className="pokemonsDetailStyled">
        <div className="pokemonDetailTitle2">DETALLE</div>
      </div>
      
      { (pokemonDetail.name) ?(
      <div className="detailContainer">
        <div>
          <img src={pokemonDetail.img} alt="pokemon" width={"350px"}></img>
        </div>

        <div>
            <h2 className="tituloEstadisticas">Estadisticas</h2>
            <p className="pokeNameDetail">{`Nombre: ${pokemonDetail.name}`}</p>
            <p className="pokeNameDetail">{`Id: ${props.match.params.id}`}</p>
            <p className="pokeNameDetail">{`Vida: ${pokemonDetail.life}`}</p>
            <p className="pokeNameDetail">{`Ataque: ${pokemonDetail.attack}`}</p>
            <p className="pokeNameDetail">{`Defensa: ${pokemonDetail.defense}`}</p>
            <p className="pokeNameDetail">{`Velocidad: ${pokemonDetail.speed}`}</p>
            <p className="pokeNameDetail">{`Altura: ${pokemonDetail.height}`}</p>
            <p className="pokeNameDetail">{`Peso: ${pokemonDetail.weight}`}</p>
        </div>

        <div>
        <h2 className="tituloEstadisticas">Tipo</h2>

        { (pokemonDetail.types) ?(pokemonDetail.types.map((type) => {
            return <p className="pokeNameDetail" key={type}>{type}</p>;
          })) :("") }

        <Link to ="/home">
        <button className="containerBotonDetail">Home</button>
        </Link>
        </div>
      </div>
        ) :("") }

    </div>
  );
};

export default PokemonDetail