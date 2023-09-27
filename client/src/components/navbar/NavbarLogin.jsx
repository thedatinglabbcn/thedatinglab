import React from 'react';
import './NavbarLogin.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';

const NavbarLogin = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar-login">
      <Link to="/matches">
        <div className={`nav-icon ${isActive('/matches') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </Link>
      <Link to="/dates">
        <div className={`nav-icon ${isActive('/dates') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faCalendar} />
        </div>
      </Link>
      <Link to="/profile">
        <div className={`nav-icon ${isActive('/profile') ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faUser} />
        </div>
      </Link>
    </div>
  );
};

export default NavbarLogin;
