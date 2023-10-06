import React, { useState } from 'react';
import './Navbar.css';
import { AuthService } from '../../service/AuthService';
import Logo from '../../assets/images/logo-dating-lab.svg';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = AuthService();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    auth.logout().then(res => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('profile_id');
      localStorage.removeItem('id');
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
      <div><Link to="/"><img className='nav_logo' src={Logo} alt="The Dating Lab Logo" /></Link></div>
      <div className={`nav_items ${isOpen && "open"}`}>
        {isLoggedIn ? (
          <>
            <Link to="/event" onClick={closeMenu}>Nuestros eventos</Link>
            <Link to="/" onClick={handleLogout}>Cerrar sesión</Link>
            <Link to="/faqs" onClick={closeMenu}>Preguntas frecuentes</Link>
          </>
        ) : (
          <>
            <Link to="/register">Registrarse</Link>
            <Link to="/login">Iniciar sesión</Link>
            <a href="#event-section" onClick={closeMenu}>Nuestros eventos</a>
            <Link to="/faqs" onClick={closeMenu}>Preguntas frecuentes</Link>
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