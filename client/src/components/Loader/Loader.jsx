import React from "react";
import LoaderGif from "../../img/LoaderGif.gif"

const Loader = () => {
    return(
        <>
        <h3>Cargando ... </h3>
        <img src={LoaderGif} alt="Loader" width={"200px"} />
        </>
    )
}

export default Loader