
import React, { useState } from 'react';
import './Navbar.css';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/AuthService';
import Logo from '../../assets/images/Capa_1.png';
import { useNavigate } from 'react-router-dom';

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
  return (
    <div className='navbar'>
        <div><a href="/"><img className='nav_logo' src={Logo} alt="Logo" /></a></div>
        <div className={`nav_items ${isOpen && "open"}`}>
            <a href="/register">Registrate</a>
            {!isLoggedIn && <a href="/login">Login</a>} 
            <a href="/#event-section">Nuestros Eventos</a>
            {isLoggedIn && (
              <a href="/" onClick={handleLogout}>Logout</a>
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