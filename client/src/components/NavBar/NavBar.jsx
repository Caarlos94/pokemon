import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
        <header className="navbar">
          <nav>
            <ul className="list">
              <li className="list-item">
                <Link to="/">Main</Link>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>
    </>
  );
};

export default NavBar;
