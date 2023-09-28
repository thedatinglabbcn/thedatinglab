import React from 'react';
import './NavbarLogin.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendar, faUser, faHouse } from '@fortawesome/free-solid-svg-icons';

const NavbarLogin = () => {
  const location = useLocation();
  const {profileId} = useParams();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (

    
    <div className="navbar-login">
       <Link to="/">
        <div className={`nav-icon ${isActive('/') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faHouse} />
        </div>
      </Link>
      <Link to="/matches">
        <div className={`nav-icon ${isActive('/matches') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </Link>
      <Link to="/event">
        <div className={`nav-icon ${isActive('/event') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faCalendar} />
        </div>
      </Link>
      <Link to={`/profile/${profileId}`}>
        <div className={`nav-icon ${isActive('/profile') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogin;
