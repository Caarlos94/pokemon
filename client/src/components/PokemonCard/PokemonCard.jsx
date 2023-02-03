import { Link } from 'react-router-dom';
import "./PokemonCard.css"

export default function PokemonCard({ name, type, img, id, idDb }) {
  type = type.split(", ");
  if(!id) id = idDb 
  return (
    <Link to = {`/detail/${id}`} style={{ textDecoration: 'none' }}>
      <div className='cardContainer'>
        <p className='pokeName'>{name}</p>
        <img src={img} alt="imagen" width={"150px"} height={"150px"}></img>
        <div className='pokeTypeContainer'>
          {type.map((type) => {
            return <p className='pokeType' key={type}>{type}</p>;
          })}
        </div>
      </div>
    </Link>
  );
}