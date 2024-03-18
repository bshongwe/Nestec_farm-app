import React from 'react';
import logo from '../imgs/logo.png';
import Navbar from '../Navbar';

function home() {
  return (
    <div className="Home">
      {/* home components */}
      <Navbar />
      <div className="logo-container"> {/* logo container */}
        <img src={logo} className="Home-logo" alt="logo" />
      </div>
      <header className="Home-header">
        <p>
	  <strong>NESTEC</strong>
        </p>
      </header>
    </div>
  );
}
