import React from "react";
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'


const Header = ({path}) => {
  console.log('hello', path)
  return (
    <header>
      { path === "/favorites" &&
        <NavLink to="/">
          <FontAwesomeIcon className="icon" icon={faBackward} />
        </NavLink> }

        <NavLink to="/">
        <h1>Rancid Tomatillos</h1>
        </NavLink>

      { path !== "/favorites"  && 
        <NavLink to="/favorites">
          <FontAwesomeIcon className="icon" icon={faHeart} />
        </NavLink> }
    </header>
  ) 
}

export default Header;
