import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByAlphabet, filterByType, filterByExisting, filterByAttack } from '../../actions';
import "./OrderBar.css"

const OrderBar = ({ setPage, setRender }) => {
  
  const dispatch = useDispatch()
  const tipos = useSelector(state => state.types)

  const handleFilterByType = (event) => {
    dispatch(filterByType(event.target.value))
    setRender(event.target.value);
    setPage(1)
  };

  const handleFilterByAlphabet = (event) => {
    dispatch(filterByAlphabet(event.target.value))
    setRender(event.target.value)
    setPage(1)
  };

  const handleFilterByAttack = (event) => {
    dispatch(filterByAttack(event.target.value))
    setRender(event.target.value);
    setPage(1)
  };

  const handleFilterByExisting = (event) => {
    dispatch(filterByExisting(event.target.value))
    setRender(event.target.value);
    setPage(1)
  };

  return (
    <>
      <div className='containerOrder'>
        <div className='containerOrderSearch'>
          <div>
            <select
            className='orderBoton' 
            name="types"
            value="value"
            onChange={(e) => handleFilterByType(e)}>
              <option value="selecciona">Filtrar por Tipo</option>
            {tipos.map((tipo) => {
                return (
                  <option value={tipo} key={tipo}> {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
                  );
              })}
            </select>
          </div> 

          <div>
            <select
            className='orderBoton' 
            name="alphabet"
            value=""
            onChange={(e) => handleFilterByAlphabet(e)}>
              <option value="selecciona">Ordenar por Alfabeto</option>
              <option value="AZ">Orden (A-Z)</option>
              <option value="ZA">Orden (Z-A)</option>
            </select>
          </div>

          <div>
            <select
            className='orderBoton' 
            name="attack"
            value=""
            onChange={(e) => handleFilterByAttack(e)}>
              <option value="selecciona">Ordenar por Ataque</option>
              <option value="MA">+ Ataque</option>
              <option value="LA">- Ataque</option>
            </select>
          </div>

          <div>
            <select
            className='orderBoton'
            name="existing"
            value=""
            onChange={(e) => handleFilterByExisting(e)}>
              <option value="selecciona">Mostrar Pokemons</option>
              <option value="All">Todos</option>
              <option value="Ex">Existentes</option>
              <option value="Cr">Creados</option>
            </select>
          </div>
        </div>

      </div>
    </>
  );
};

export default OrderBar