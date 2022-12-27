import React, { useState } from 'react';
import { addPokemonsByName, showAll, filterBySearch, emptyError } from '../../actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import "./SearchBar.css"

const SearchBar = ({ setRender, setPage }) => {

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPokemonsByName(name.toLocaleLowerCase()));
    dispatch(filterBySearch(name));
    setName("");
    setPage(1)
  };

  const handleClick = () => {
    dispatch(showAll())
    dispatch(emptyError())
    setRender("")
  };

   return (
       <div className='containerSearch'>
         <button className='containBoton' type="submit" onClick={() => handleClick()}>Todos</button>
         <form onSubmit={(event) => handleSubmit(event)}>
           <input className='input' type="text" autoComplete="off" value={name} placeholder="Nombre" onChange={(event) => handleChange(event)}></input>
          <button className='containBoton' type="submit">Buscar</button>
          <Link to = {"/createPokemon"}>
            <button className='containBotonCreate' type="submit">Crear</button>
          </Link>
         </form>
       </div>
   );
}

export default SearchBar