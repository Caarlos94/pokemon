import { useState } from "react";
import {
  addPokemonsByName,
  showAll,
  filterBySearch,
  emptyError,
} from "../../actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ setPage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPokemonsByName(name.toLocaleLowerCase()));
    dispatch(filterBySearch(name));
    setName("");
    setPage(1);
  };

  const handleClick = () => {
    dispatch(showAll());
    dispatch(emptyError());
  };

  return (
    <div className="containerSearch">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          autoComplete="off"
          value={name}
          placeholder="Nombre"
          onChange={handleChange}
        ></input>
        <button className="containBoton" type="submit">
          Buscar
        </button>
      </form>
      <div>
        <button
          className="containBoton"
          type="submit"
          onClick={() => handleClick()}
        >
          Todos
        </button>
        <Link to={"/createPokemon"}>
          <button className="containBotonCreate" type="submit">
            Crear
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
