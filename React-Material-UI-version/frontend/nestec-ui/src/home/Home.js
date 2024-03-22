import React from 'react';
import logo from '../imgs/logo.png';
import Navbar from './Navbar-Home';
import VideoComponent from './VideoComponent';
import './Home.css';

function home() {
  return (
    <div className="Home">
      {/* home components */}
      <Navbar />
      <div className="logo-container"> {/* logo container */}
        <img src={logo} className="Home-logo" alt="logo" />
      </div>
      <header className="Home-header">
	<h1>NESTEC</h1>
      </header>
      {/* Additional Body Content */}
      <div className="body-content">
	{/* Video Component */}
	<VideoComponent />
      </div>
    </div>
  );
}
