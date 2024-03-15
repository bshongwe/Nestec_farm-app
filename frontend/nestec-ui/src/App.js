import React from 'react';
import logo from './imgs/logo.png';
import './App.css';
import VideoBackground from './VideoBackground';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <VideoBackground />
      <Navbar />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
