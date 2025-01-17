import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt,faHome,faPencilSquare,faInfoCircle,faBriefcase,faLeaf} from '@fortawesome/free-solid-svg-icons';

function NavBar (){
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    
    return(
  <>
    <nav className="navbar">
      <h1 id="logo">HarvestIQ <FontAwesomeIcon icon={faLeaf} /></h1>
      <ul>
        <li><Link to="/Home" id="nav-link">Home <FontAwesomeIcon icon={faHome} /></Link></li>
        <li className="dropdown">
            <button onClick={toggleDropdown} onPointerOver={toggleDropdown} className="dropdown-toggle" id="nav-link">
              Services <FontAwesomeIcon icon={faBriefcase} />
            </button>
            {isOpen && (
              <ul className="dropdown-menu" onClick={toggleDropdown} onPointerLeave={toggleDropdown}>
                <li><Link to="/CropAnalysis" id="nav-link">Crop Analysis</Link></li>
                <li><Link to="/PriceAnalysis" id="nav-link">Price Analysis</Link></li>
                <li><Link to="/Schemes" id="nav-link">Schemes</Link></li>
              </ul>
            )}
          </li>
        <li><Link to="/Blogs" id="nav-link">Blogs <FontAwesomeIcon icon={faPencilSquare} /></Link></li>
        <li><Link to="/About" id="nav-link">About Us <FontAwesomeIcon icon={faInfoCircle} /></Link></li>
        <li><Link to="/" id="nav-link">Logout  <FontAwesomeIcon icon={faSignOutAlt} /></Link></li>
      </ul>
      </nav>
     </>
  );}
  export default NavBar;