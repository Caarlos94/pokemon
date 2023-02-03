import { useState } from "react";
import { useSelector } from 'react-redux';
import { InputCreate } from "../Styled";
import { Link } from "react-router-dom";
import axios from "axios"
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
 if(value.tipos.length > 0) {
  if (value.tipos.length === 0 || value.tipos.length > 2)
    errors.tipos = "Maximo 2 tipos";
    else {errors.tipos = false}
 }
  return errors;
};

const PokemonCreate = () => {
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
    tipos: [],
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
    tipos: [],
  });

  const handleInputChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setError(validate({...datos, [e.target.name]: e.target.value}, pokemons))
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('pokemons', datos)
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
      tipos: [],
    });
  };

  const handlerSelected = (e) => {
    if (!datos.tipos.includes(e.target.value)) {
      setDatos({...datos, tipos: [...datos.tipos, e.target.value]})
      setError(validate({...datos, tipos: [...datos.tipos, e.target.value]}, pokemons)) 
    }
  };

  const handlerClick = (tipo) => {
    setDatos({...datos, tipos: datos.tipos.filter(tipos => tipos !== tipo)})
    setError(validate({...datos, tipos: [datos.tipos]}, pokemons)) 
  }

  return (
    <div className="principalCreateContainer">
      <div className="pokemonDetailStyled">
        <div className="pokemonDetailTitle">CREAR POKEMON</div>
      </div>

      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>

          <div>
            <label htmlFor="name">Nombre:</label>
            <InputCreate
              className={(error.name) ?"error" :"notError"}
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={datos.name}
            ></InputCreate>
          </div>
          {error.name && <p className="pStyled">{error.name}</p>}
          
          <div>
            <label htmlFor="life">Vida:</label>
            <InputCreate
              className={(error.life) ?"error" :"notError"}
              type="number"
              id="life"
              name="life"
              onChange={handleInputChange}
              value={datos.life}
            ></InputCreate>
          </div>
          {error.life && <p className="pStyled">{error.life}</p>}


          <div>
            <label htmlFor="attack">Ataque:</label>
            <InputCreate
              className={(error.attack) ?"error" :"notError"}
              type="number"
              id="attack"
              name="attack"
              onChange={handleInputChange}
              value={datos.attack}
            ></InputCreate>
          </div>
          {error.attack && <p className="pStyled">{error.attack}</p>}

          <div>
            <label htmlFor="defense">Defensa:</label>
            <InputCreate
              className={(error.defense) ?"error" :"notError"}
              type="number"
              id="defense"
              name="defense"
              onChange={handleInputChange}
              value={datos.defense}
            ></InputCreate>
          </div>
          {error.defense && <p className="pStyled">{error.defense}</p>}

          <div>
            <label htmlFor="speed">Velocidad:</label>
            <InputCreate
              className={(error.speed) ?"error" :"notError"}
              type="number"
              id="speed"
              name="speed"
              onChange={handleInputChange}
              value={datos.speed}
            ></InputCreate>
          </div>
          {error.speed && <p className="pStyled">{error.speed}</p>}

          <div>
            <label htmlFor="height">Altura:</label>
            <InputCreate
              className={(error.height) ?"error" :"notError"}
              type="number"
              id="height"
              name="height"
              onChange={handleInputChange}
              value={datos.height}
            ></InputCreate>
          </div>
          {error.height && <p className="pStyled">{error.height}</p>}

          <div>
            <label htmlFor="weight">Peso:</label>
            <InputCreate
              className={(error.weight) ?"error" :"notError"}
              type="number"
              id="weight"
              name="weight"
              onChange={handleInputChange}
              value={datos.weight}
            ></InputCreate>
          </div>
          {error.weight && <p className="pStyled">{error.weight}</p>}

          <div>
            <label htmlFor="img">Imagen:</label>
            <InputCreate
              className={(error.img) ?"error" :"notError"}
              type="url"
              id="img"
              name="img"
              onChange={handleInputChange}
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
            onChange={handlerSelected}
            >
            {tipos.map((tipo) => {
                return (
                  <option value={tipo} key={tipo}> {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
                  );
              })}
            </select>

          <button className="containerBoton" type="submit" disabled={!datos.name || !datos.tipos.length>0 || error.name || error.life || error.attack || error.defense || error.speed || error.height || error.weight || error.img || error.tipos}>Crear</button>
          
          </div>
            {error.tipos && <p className="pStyled">{error.tipos}</p>}

          <div>
            {datos.tipos.map(tipos => {
                return (
                    <button onClick={() => handlerClick(tipos)} key={tipos}>{tipos}</button>
                )
            })}
          </div>

        </form>
      </div>

      <div>
          <Link to ="/home">
            <button className="containerBoton botonHome">Home</button>
          </Link>
      </div>

    </div>
  );
};

export default PokemonCreate;