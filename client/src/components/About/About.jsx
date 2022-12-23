import React from "react";
import { Link } from "react-router-dom";
import "./About.css"

const About = () => {
    return (
      <div className="aboutPage">
        <div className="containerAbout">
          <h2 className="titulo">¡Bienvenid@ al PI de Pokemon!</h2>
          <p className="textoAbout">
            Esta App fue desarrollada como Proyecto Individual consumiendo
            la <a target="_blank" className="enlaceAbout" rel="noreferrer" href="https://pokeapi.co/">PokeApi</a> y utilizando las tecnologías 
            aprendidas en la carrera de Full Stack Developer de <a className="enlaceAbout" rel="noreferrer" target="_blank" href="https://www.soyhenry.com/">SoyHenry</a>.
          </p>
          <p className="textoAbout">
            Las tecnologias usadas para este proyecto fueron <b>Sequelize</b>{" "}
            para el manejo de base de datos, <b>Node.js, Express</b> para
            implementar el back end, <b>React</b>
            con <b>Redux</b> para el desarrollo del front end y CSS Modules para
            el estilizado de la App.
          </p>
          <button className="botonAbout">
            <Link to="/home">Regresar</Link>
          </button>
        </div>
      </div>
    );
}

export default About