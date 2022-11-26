import React from "react";
import { Link } from "react-router-dom";
import "./Main.css"

const Main = () => {
    return(
        <>  
            <div className="landingPage">
                <p className="enter">Entrar</p>
                <Link to ="/home">
                    <button className="pokeBoton"></button>
                </Link>
            </div>
        </>
    )
}

export default Main;