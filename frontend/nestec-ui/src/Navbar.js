import React from 'react';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Nestec</a></li>
        <li><a href="#contact">Contact Us</a></li>
	<li><a href="#account">Account</a></li>
	<li><a href="./home/home-2">App Landing Page</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
