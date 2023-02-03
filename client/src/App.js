import { Route } from "react-router-dom"
import Main from './components/Main/Main';
import Home from './components/Home/Home'
import About from './components/About/About';
import PokemonDetail from './components/PokemonDetail/PokemonDetail'
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import "./App.css"
import axios from "axios"

// axios.defaults.baseURL = "http://localhost:3000/"
axios.defaults.baseURL = "https://pokemon94.up.railway.app/"

function App() {
  return (
    <div>
      <Route exact path={"/"} component={Main} />
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/about"} component={About} />
      <Route path={"/detail/:id"} component={PokemonDetail} />
      <Route path={"/createPokemon"} component={PokemonCreate} />
    </div>
  );
}

export default App;
