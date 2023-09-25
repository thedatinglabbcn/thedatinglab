import React, { useState } from 'react';
import './Navbar.css';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/AuthService';
import Logo from '../../assets/images/Capa_1.png';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = AuthService();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    auth.logout().then(res => {
      localStorage.removeItem('auth_token');
      Swal.fire({
        title: '¡Sesión cerrada!',
        text: '¡Hasta pronto!',
        icon: 'success',
        confirmButtonColor: '#ED696B',
        customClass: {
          popup: 'custom-swal-background',
          confirmButton: 'custom-swal-button',
        }
      }).then(() => {
        // Redirige a la página deseada
        navigate('/');
      });

      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  };

  const authToken = localStorage.getItem('auth_token');
  const isLoggedIn = !!authToken;

  const closeMenu = () => {
    setIsOpen(false);

  };

  return (
    <div className='navbar'>
      <div><Link to="/"><img className='nav_logo' src={Logo} alt="Logo" /></Link></div>
      <div className={`nav_items ${isOpen && "open"}`}>
        {isLoggedIn ? (
          <>
            <a href="#event-section" onClick={closeMenu}>Nuestros eventos</a>
            <a href="/" onClick={handleLogout}>Cerrar sesión</a>
          </>
        ) : (
          <>
            <Link to="/register">Registrarse</Link>
            <Link to="/login">Iniciar sesión</Link>
            <a href="#event-section" onClick={closeMenu}>Nuestros eventos</a>
          </>
        )}
      </div>
      <div className={`nav_toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Navbar;