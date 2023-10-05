import React from "react";
import Instagram from '../../assets/images/Instagram.svg';
import LinkedIn from '../../assets/images/LinkedIn.svg';
import Twitter from '../../assets/images/Twitter.svg';
import '../footer/Footer.css';

function Footer() {
  return (
    <div className="footer-container">
  <footer className="footer">
    <p className="footer-logo">Email: info@examlple.com</p>
    <p className="footer-logo">Movil: 600 000 000</p>
    <div className="footer-links">
      <div className="nav-item"><a href="http://www.instagram.com"><img width="30" height="30" src={Instagram} className="navbar-icons" alt="Instagram icon" /></a></div>
      <div className="nav-item"><a href="http://www.twitter.com"><img width="30" height="30" src={Twitter} className="navbar-icons" alt="Instagram icon" /></a></div>
      <div className="nav-item"><a href="http://www.linkedin.com"><img width="30" height="30" src={LinkedIn} className="navbar-icons" alt="Instagram icon" /></a></div>
    </div>
  </footer>
</div>
  )
}

export default Footer;