import './Navbar.css'

// function Navbar() {
//     return (
//         <div>
//             <nav class="navbar navbar-expand-lg">
//                 <div class="container-fluid">
//                     <a class="navbar-brand" href="#"><img src="tu-logo.png" alt="Logo" /></a>
//                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span>
//                     </button>
                   
//                     <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//                         <div class="navbar-nav">
//                             <a class="nav-link" href="#">Register</a>
//                             <hr />
//                             <a class="nav-link" href="#">Login</a>
//                             <hr />
//                             <a class="nav-link" href="#">Events</a>
//                             <hr />
//                             <a class="nav-link" href="#">Contact us</a>

//                         </div>
//                     </div>
//                 </div>
//             </nav>
//             <div id="menu" class="collapse" />
//         </div>
//     );
// }
// export default Navbar;
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='navbar'>
        <div className='nav_logo'><img src="tu-logo.png" alt="Logo" /></div>
        <div className={`nav_items ${isOpen && "open"}`}>
            <a href="#">Registrate</a>
            <span></span>
            <a href="#">Login</a>
            <span></span>
            <a href="#">Contáctanos</a>
            <span></span>
            <a href="#">Eventos</a>
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
