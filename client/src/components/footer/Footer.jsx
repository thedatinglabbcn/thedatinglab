import React from "react";
import Instagram from '../../assets/images/Instagram.svg';
import LinkedIn from '../../assets/images/LinkedIn.svg';
import Twitter from '../../assets/images/Twitter.svg';
import '../footer/Footer.css';

function Footer() {
  return (
    <div class="footer-container">
  <footer className="footer">
    <p class="footer-logo">The Dating Lab</p>
    <div class="footer-links">
      <div class="nav-item"><a href="http://www.instagram.com"><img width="30" height="30" src={Instagram} className="navbar-icons" alt="Instagram icon" /></a></div>
      <div class="nav-item"><a href="http://www.twitter.com"><img width="30" height="30" src={Twitter} className="navbar-icons" alt="Instagram icon" /></a></div>
      <div class="nav-item"><a href="http://www.linkedin.com"><img width="30" height="30" src={LinkedIn} className="navbar-icons" alt="Instagram icon" /></a></div>
    </div>
  </footer>
</div>
  )
}

export default Footer