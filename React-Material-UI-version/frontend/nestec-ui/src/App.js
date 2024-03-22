import React from 'react';
import logo from './imgs/logo.png';
import './App.css';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      {/* app components */}
      <Navbar />
      <div className="logo-container"> {/* logo container */}
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <header className="App-header"> 
        <p>
          Empowering farmers, one harvest at a time.
        </p>
        <p>
          <strong>NESTEC</strong>
        </p>
      </header>
    </div>
  );
}

export default App;
