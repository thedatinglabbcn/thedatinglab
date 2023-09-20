import './Navbar.css'
import React, { useState } from 'react';

import Swal from 'sweetalert2';
import { AuthService } from '../../service/AuthService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = AuthService();
 
  const handleLogout = (e) => {
    e.preventDefault();
   
    auth.logout().then(res => {
      localStorage.removeItem('auth_token');
      
      Swal.fire({
        title: '¡Cierre de sesión exitoso!',
        text: '¡Hasta pronto!',
        icon: 'success',
      });
      
      console.log(res);
    }).catch(err => {
      Swal.fire({
        title: '¡Error!',
        text: '¡No se pudo cerrar sesión!',
        icon: 'error',
      });
      console.log(err);
    });
};

const authToken = localStorage.getItem('auth_token');
  const isLoggedIn = !!authToken;
  return (
    <div className='navbar'>
        <div className='nav_logo'><img src="tu-logo.png" alt="Logo" /></div>
        <div className={`nav_items ${isOpen && "open"}`}>
            <a href="/register">Registrate</a>
            <span></span>
            <a href="/login">Login</a>
            <span></span>
            <a href="#">Contáctanos</a>
            <span></span>
            <a href="#">Eventos</a>
            <span></span>
            {isLoggedIn && (
            <a href="/login" onClick={handleLogout} >
              Logout</a>
            )}

        </div>
        <div className={`nav_toggle ${isOpen && "open"}`} onClick={ () => setIsOpen(!isOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div> 
    </div>
  );
}

export default Navbar;
