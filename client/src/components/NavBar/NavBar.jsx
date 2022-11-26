import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
    return (
      <>
        <header className="navbar">
          <nav>
            <ul className="list">
              <li className="list-item">
                <NavLink exact to="/">
                  Main
                </NavLink>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
}

export default NavBar