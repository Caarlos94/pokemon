import React from "react";
import { Link } from "react-router-dom";
import "./Main.css"

const Main = () => {
    return(
        <>  
            <div className="landingPage">
                    <Link className="pokeBoton" to ="/home">
                </Link>
            </div>
        </>
    )
}

export default Main;