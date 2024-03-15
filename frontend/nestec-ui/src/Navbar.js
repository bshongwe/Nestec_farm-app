import React from 'react';
import './Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
	<li><a href="#app-demo">Nestec Demo</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
