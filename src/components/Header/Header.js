import React from "react";
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
  return (
    <header>

  <NavLink to="/">
  <FontAwesomeIcon icon={faBackward} />
  </NavLink>
  <NavLink to="/">
  <h1>Rancid Tomatillos</h1>
  </NavLink>
  <NavLink to="/favorites">
  <FontAwesomeIcon icon={faHeart} />
  </NavLink>
    </header>
  )
}

export default Header;
