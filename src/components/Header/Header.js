import React from "react";
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header>
  <NavLink to="/">
      <h1>Rancid Tomatillos</h1>
  </NavLink>
  {/* <NavLink to="/favorites" /> */}
    </header>
  )
}

export default Header;
