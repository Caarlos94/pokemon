import { useEffect, useState } from "react";
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
import NavBar from "../NavBar/NavBar";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const tipos = useSelector((state) => state.types);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(getPokemons());
    if (!tipos.length) dispatch(getTypes());
  }, []);

  // PAGINADO **************************************************************************************
  const [page, setPages] = useState(1);
  const pokesPerPage = 12;
  const lastIndex = page * pokesPerPage; // 1 * 12 = 12
  const firstIndex = lastIndex - pokesPerPage; // 12 - 12 = 0
  const currentePage = pokemons.slice(firstIndex, lastIndex);
  const fnPaginado = (page) => {
    setPages(page);
  };

  const [render, setRender] = useState();

  return (
    <>
      <div className="homeContainer">
        <NavBar></NavBar>

        {/* SE RENDERIZA LA IMAGEN DEL TÍTULO */}
        <div className="imgContainer">
          <img src={pokeTitulo} alt="imagen" className="pokeimagen"></img>
        </div>

        {/* SE RENDERIZA LA SEARCHBAR */}
        <SearchBar setRender={setRender} setPage={setPages}></SearchBar>

        {/* SE RENDERIZA LA ORDERBAR */}
        <OrderBar setPage={setPages} setRender={setRender}></OrderBar>

        {/* SE RENDERIZA EL PAGINADO */}
        <Paginado
          // key={pokemons.id}
          pokemons={pokemons.length}
          pokesPerPage={pokesPerPage}
          fnPaginado={fnPaginado}
          page={page}
        ></Paginado>

        {/* SE RENDERIZAN LAS TARJETAS POKEMON */}
        <div className="cardsContainer">
          {error ? (
            <div className="psyduck">
              <h2>No se encontraron coincidencias</h2>
              <img src={Psyduck} alt="imagen" width={"200px"}></img>
            </div>
          ) : pokemons.length > 0 ? (
            currentePage.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                idDb={pokemon.id}
                id={pokemon.idBusqueda}
                name={pokemon.name}
                type={pokemon.tipos}
                img={pokemon.img}
              ></PokemonCard>
            ))
          ) : (
            <div>
              <Loader></Loader>
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Home;
