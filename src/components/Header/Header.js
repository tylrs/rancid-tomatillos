import React from "react";
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'


const Header = ({path}) => {
  return (
    <header>
       <div>
      { path === "/favorites" ?
        <NavLink to="/">
          <FontAwesomeIcon className="icon" icon={faBackward} />
        </NavLink> : <FontAwesomeIcon className="icon-none" icon={faHeart} />
 }
        </div>
        <NavLink to="/">
          <h1>Rancid Tomatillos</h1>
        </NavLink>

      { path !== "/favorites"  ?
        <NavLink to="/favorites">
          <FontAwesomeIcon className="icon" icon={faHeart} />
        </NavLink> : <FontAwesomeIcon className="icon-none" icon={faHeart} />
 }
    </header>
 
  ) 
}

export default Header;
