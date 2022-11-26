import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../PokemonCard/PokemonCard";
import pokeTitulo from "../../img/PokeLogo.png";
import Psyduck from "../../img/Psyduck.png";
import SearchBar from "../SearchBar/SearchBar";
import OrderBar from "../OrderBar/OrderBar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import { getPokemons, getTypes } from "../../actions";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar"
import "./Home.css"

const Home = () => {

  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);   //ESTADO GLOBAL CON LOS POKEMONS
  const pokemonTypes = useSelector((state)=> state.types)
  const error = useSelector((state) => state.error)
 
  useEffect(() => {      // EJECUTAMOS LA FUNCIÓN GETPOKEMONS CUANDO SE MONTA LE COMPONENTE
    if(pokemons.length === 0) {
      dispatch(getPokemons());
    }
    
    if(pokemonTypes.length === 0){
      dispatch(getTypes())
    }
  }, []);

  // PAGINADO **************************************************************************************
  const [page, setPages] = useState(1); // CREAMOS UN ESTADO PARA MANEJAR EL PAGINADO
  const pokesPerPage = 12
  const lastIndex =  page * pokesPerPage  // 1 * 12 = 12
  const firstIndex = lastIndex - pokesPerPage   // 12 - 12 = 0
  const currentePage = pokemons.slice(firstIndex, lastIndex);

  const fnPaginado = (page) => {   // FUNCIÓN PARA MODIFICAR EL ESTADO LOCAL PAGE
    setPages(page);
  };

  const [render, setRender] = useState()

  return (
    <>
        <div className="homeContainer">

        <NavBar></NavBar>

        {/* SE RENDERIZA LA IMAGEN DEL TÍTULO */}
        <img src={pokeTitulo} alt="imagen" width={"350px"}></img>

        {/* SE RENDERIZA LA SEARCHBAR */}
        <SearchBar 
          setRender={setRender}
          setPage={setPages}
          ></SearchBar>

        {/* SE RENDERIZA LA ORDERBAR */}
        <OrderBar
            pokemonTypes={pokemonTypes}
            setPage={setPages}
            setRender={setRender}
        ></OrderBar>

        {/* SE RENDERIZA EL PAGINADO */}
        <Paginado
            // key={pokemons.id}
            pokemons={pokemons.length}
            pokesPerPage={pokesPerPage}
            fnPaginado={fnPaginado}
        ></Paginado>

        {/* SE RENDERIZAN LAS TARJETAS POKEMON */}
        <div className="cardsContainer">
        {error ? (
            <div>
              <h2>No se encontraron coincidencias</h2>
              <img src={Psyduck} alt="imagen" width={"200px"}></img>
            </div> ) 
        : (pokemons.length > 0) ? (
        currentePage.map((pokemon) => (
            <PokemonCard
                key={pokemon.id} 
                id={pokemon.id}
                name={pokemon.name}
                type={pokemon.types}
                img={pokemon.img}
            ></PokemonCard>
          )))
          :(
            <div>
              <Loader></Loader>
            </div>
          )
        }
        </div>
      
      </div>
      
      
      <Footer></Footer>
    </>
  );
};;

export default Home;
