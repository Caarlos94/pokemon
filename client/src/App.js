import './App.css';
import { Route } from "react-router-dom"
import Main from './components/Main/Main';
import Home from './components/Home/Home'
import About from './components/About/About';
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import axios from "axios"

// SE LE AVISA A AXIOS QUE TODAS LAS PETICIONES QUE SE HAGAN EMPIECEN UNA MISMA BASE URL
// axios.defaults.baseURL = "http://localhost:3001"
// axios.defaults.baseURL = "https://pokemon-production-07b2.up.railway.app"
//                           https://pokemonserver-a4tv.onrender.com
//                           https://pokemon-production-d92c.up.railway.app/

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={Main} />
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/about"} component={About} />
      <Route path={"/detail/:id"} component={PokemonDetail} />
      <Route path={"/createPokemon"} component={PokemonCreate} />
    </div>
  );
}

export default App;
