import { useDispatch, useSelector } from "react-redux";
import {
  filterByAlphabet,
  filterByType,
  filterByExisting,
  filterByAttack,
} from "../../actions";
import "./OrderBar.css";

const OrderBar = ({ setPage, setRender }) => {
  const dispatch = useDispatch();
  const tipos = useSelector((state) => state.types);

  const handleFilterByType = (e) => {
    dispatch(filterByType(e.target.value));
    setPage(1);
  };

  const handleFilterByAlphabet = (e) => {
    dispatch(filterByAlphabet(e.target.value));
    setRender(e.target.value);
    setPage(1);
  };

  const handleFilterByAttack = (e) => {
    dispatch(filterByAttack(e.target.value));
    setRender(e.target.value);
    setPage(1);
  };

  const handleFilterByExisting = (e) => {
    dispatch(filterByExisting(e.target.value));
    setRender(e.target.value);
    setPage(1);
  };

  return (
    <div className="containerOrder">
      <div className="containerOrderSearch">
        <div>
          <select
            className="orderBoton"
            name="types"
            value="value"
            onChange={(e) => handleFilterByType(e)}
          >
            <option value="selecciona">Filtrar por Tipo</option>
            {tipos.map((tipo) => {
              return (
                <option value={tipo} key={tipo}>
                  {" "}
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <select
            className="orderBoton"
            name="alphabet"
            value=""
            onChange={handleFilterByAlphabet}
          >
            <option value="selecciona">Ordenar por Alfabeto</option>
            <option value="AZ">Orden (A-Z)</option>
            <option value="ZA">Orden (Z-A)</option>
          </select>
        </div>

        <div>
          <select
            className="orderBoton"
            name="attack"
            value=""
            onChange={handleFilterByAttack}
          >
            <option value="selecciona">Ordenar por Ataque</option>
            <option value="MA">+ Ataque</option>
            <option value="LA">- Ataque</option>
          </select>
        </div>

        <div>
          <select
            className="orderBoton"
            name="existing"
            value=""
            onChange={handleFilterByExisting}
            disabled={true}
          >
            <option value="selecciona">Mostrar Pokemons</option>
            <option value="All">Todos</option>
            <option value="Ex">Existentes</option>
            <option value="Cr">Creados</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderBar;
