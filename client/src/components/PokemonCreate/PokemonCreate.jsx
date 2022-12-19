import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { InputCreate } from "../Styled";
import { createPokemon, addPokemonsByName } from "../../actions"; 
import { Link } from "react-router-dom";
import "./PokemonCreate.css"

const validate = (value, pokemons) => {
  const errors = {};
  if(value.name){
    let nombre = value.name.split(" ")
    if (!(/^[ a-zA-Z ]+$/).test(value.name) || !value.name || nombre.length >= 2)
      errors.name = "El nombre es incorrecto o vacio";
    if (pokemons.some((element) => element.name.toUpperCase() === value.name.toUpperCase()))
    errors.name = "Este pokemon ya existe";
    if (value.name.length > 12)
    errors.name = "El nombre no puede ser mayor a 12 caracteres";
  }
 if(value.life) {
  if (value.life < 1 || value.life > 500 || !Number.isInteger(parseFloat(value.life)))
    errors.life = "La vida debe tener un valor entre 1-500";
 }
 if(value.attack) {
  if (value.attack < 1 || value.attack > 750 || !Number.isInteger(parseFloat(value.attack)))
    errors.attack = "El ataque debe ser tener un valor entre 1-750";
 }
 if(value.defense) {
  if (value.defense < 1 || value.defense > 750 || !Number.isInteger(parseFloat(value.defense)))
    errors.defense = "La defensa debe tener un valor entre 1-750";
 }
 if(value.speed) {
  if (value.speed < 1 || value.speed > 500 || !Number.isInteger(parseFloat(value.speed)))
    errors.speed = "La velocidad debe tener un valor entre 1-500";
 }
 if(value.height) {
  if (value.height <= 0 || value.height > 50 || !Number.isInteger(parseFloat(value.height)))
    errors.height = "La altura debe tener un valor entre 1-50";
 }
 if(value.weight) {
  if (value.weight <= 0 || value.weight > 1000 )
    errors.weight = "El peso debe tener un valor entre 1-1000";
 }
 if(value.img) {
  if (!value.img)
    errors.img = "Campo vacio";
 }
 if(value.type.length > 0) {
  if (value.type.length === 0 || value.type.length > 2)
    errors.type = "Maximo 2 tipos";
    else {errors.type = false}
 }
  return errors;
};

const PokemonCreate = () => {

  const dispatch = useDispatch()

  const pokemons = useSelector(state => state.allPokemons)
  const tipos = useSelector(state => state.types)

  const [error, setError] = useState({
    name: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    type: [],
    });

  const [datos, setDatos] = useState({
    name: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    type: [],
  });

  const handleInputChange = (event) => {
    setDatos({ ...datos, [event.target.name]: event.target.value });
    setError(validate({...datos, [event.target.name]: event.target.value}, pokemons))
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createPokemon(datos))
    setTimeout(() => dispatch(addPokemonsByName(datos.name)), 100);
    alert("Pokemon creado") 
    setDatos({
      name: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      img: "",
      type: [],
    });
  };

  const handlerSelected = (event) => {
    if (!datos.type.includes(event.target.value)) {
      setDatos({...datos, type: [...datos.type, event.target.value]})
      setError(validate({...datos, type: [...datos.type, event.target.value]}, pokemons)) 
    }
  };

  const handlerClick = (tipo) => {
    setDatos({...datos, type: datos.type.filter(type => type !== tipo)})
    setError(validate({...datos, type: [datos.type]}, pokemons)) 
  }

  return (
    <div className="principalCreateContainer">
      <div className="pokemonDetailStyled">
        <div className="pokemonDetailTitle">CREAR POKEMON</div>
      </div>

      <div className="formContainer">
        <form className="form" onSubmit={(event) => handleSubmit(event)}>

          <div>
            <label htmlFor="name">Nombre</label>
            <InputCreate
              className={(error.name) ?"error" :"notError"}
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              onChange={(event) => handleInputChange(event)}
              value={datos.name}
            ></InputCreate>
          </div>
          {error.name && <p className="pStyled">{error.name}</p>}
          
          <div>
            <label htmlFor="life">Vida</label>
            <InputCreate
              className={(error.life) ?"error" :"notError"}
              type="number"
              id="life"
              name="life"
              onChange={(event) => handleInputChange(event)}
              value={datos.life}
            ></InputCreate>
          </div>
          {error.life && <p className="pStyled">{error.life}</p>}


          <div>
            <label htmlFor="attack">Ataque</label>
            <InputCreate
              className={(error.attack) ?"error" :"notError"}
              type="number"
              id="attack"
              name="attack"
              onChange={(event) => handleInputChange(event)}
              value={datos.attack}
            ></InputCreate>
          </div>
          {error.attack && <p className="pStyled">{error.attack}</p>}

          <div>
            <label htmlFor="defense">Defensa</label>
            <InputCreate
              className={(error.defense) ?"error" :"notError"}
              type="number"
              id="defense"
              name="defense"
              onChange={(event) => handleInputChange(event)}
              value={datos.defense}
            ></InputCreate>
          </div>
          {error.defense && <p className="pStyled">{error.defense}</p>}

          <div>
            <label htmlFor="speed">Velocidad</label>
            <InputCreate
              className={(error.speed) ?"error" :"notError"}
              type="number"
              id="speed"
              name="speed"
              onChange={(event) => handleInputChange(event)}
              value={datos.speed}
            ></InputCreate>
          </div>
          {error.speed && <p className="pStyled">{error.speed}</p>}

          <div>
            <label htmlFor="height">Altura</label>
            <InputCreate
              className={(error.height) ?"error" :"notError"}
              type="number"
              id="height"
              name="height"
              onChange={(event) => handleInputChange(event)}
              value={datos.height}
            ></InputCreate>
          </div>
          {error.height && <p className="pStyled">{error.height}</p>}

          <div>
            <label htmlFor="weight">Peso</label>
            <InputCreate
              className={(error.weight) ?"error" :"notError"}
              type="number"
              id="weight"
              name="weight"
              onChange={(event) => handleInputChange(event)}
              value={datos.weight}
            ></InputCreate>
          </div>
          {error.weight && <p className="pStyled">{error.weight}</p>}

          <div>
            <label htmlFor="img">Imagen</label>
            <InputCreate
              className={(error.img) ?"error" :"notError"}
              type="url"
              id="img"
              name="img"
              onChange={(event) => handleInputChange(event)}
              value={datos.img}
            ></InputCreate>
          </div>
          {error.img && <p className="pStyled">{error.img}</p>}

          <div className="typeContainer">
          <label>Tipo</label>
          <select
            className="orderBoton" 
            multiple={true} 
            name="type"
            onChange={(event) => handlerSelected(event)}
            >
            {tipos.map((tipo) => {
                return (
                  <option value={tipo} key={tipo}> {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
                  );
              })}
            </select>

          <button className="containerBoton" type="submit" disabled={!datos.name || !datos.type.length>0 || error.name || error.life || error.attack || error.defense || error.speed || error.height || error.weight || error.img || error.type}>Crear</button>
          
          </div>
            {error.type && <p className="pStyled">{error.type}</p>}

          <div>
            {datos.type.map(type => {
                return (
                    <button onClick={() => handlerClick(type)} key={type}>{type}</button>
                )
            })}
          </div>

        </form>
      </div>

      <div>
          <Link to ="/home">
            <button className="containerBoton">Home</button>
          </Link>
      </div>

    </div>

      

  );
};

export default PokemonCreate;