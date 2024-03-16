import React from 'react';
import logo from './imgs/logo.png';
import './App.css';
import VideoBackground from './VideoBackground';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      {/* app components */}
      <Navbar />
      <VideoBackground />
      <div className="logo-container"> {/* logo container */}
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <header className="App-header"> 
        <p>
          Empowering farmers, one harvest at a time.
        </p>
        <a
          className="App-link"
          href="https://ernestshong.tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nestec Agriculture App
        </a>
      </header>
    </div>
  );
}

export default App;
