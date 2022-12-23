import React from "react";
import "./Paginado.css"

const Paginado = ({ pokemons, pokesPerPage, fnPaginado, page }) => {
  const numberOfPages = [];
  for (let i = 1; i <= Math.ceil(pokemons / pokesPerPage); i++) {
    numberOfPages.push(i);
  }
  
  return (
    <>
      <div className="paginadoContainer">
        <div className="paginadoBotonContainer">
          {
            numberOfPages.map(num => {
              return (
              <button className={page !== num ? "paginadoBoton" : "botonSelect"} key={num} onClick={()=> fnPaginado(num) }>{num}</button>
            )})
          }
        </div>
      </div>
    </>
  );
};

export default Paginado