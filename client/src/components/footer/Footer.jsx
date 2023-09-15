import React from "react";
import Instagram from '../../assets/images/Instagram.svg';
import LinkedIn from '../../assets/images/LinkedIn.svg';
import Twitter from '../../assets/images/Twitter.svg';
import '../footer/Footer.css';

function Footer() {
  return (
    <div class="container px-0 mx-0 w-100">
  <footer className="footer">
    <p class="text-center h2 py-1">The Dating Lab</p>
    <ul class="nav justify-content-center pb-3 mb-3">
      <li class="nav-item"><a class="px-2" href="http://www.instagram.com"><img width="30" height="30" src={Instagram} className="navbar-icons" alt="Instagram icon" /></a></li>
      <li class="nav-item"><a class="px-2" href="http://www.twitter.com"><img width="30" height="30" src={Twitter} className="navbar-icons" alt="Instagram icon" /></a></li>
      <li class="nav-item"><a class="px-2" href="http://www.linkedin.com"><img width="30" height="30" src={LinkedIn} className="navbar-icons" alt="Instagram icon" /></a></li>
    </ul>
  </footer>
</div>
  )
}

export default Footer