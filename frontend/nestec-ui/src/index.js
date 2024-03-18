import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './home/Home';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

function RootContainer() {
  const [currentPage, setCurrentPage] = useState('App'); // Initial page = 'App'

  // Function to switch to the Home page when (click App Landing Page)
  const goToHome = () => {
    setCurrentPage('Home');
  };

  // Function to switch back to the App page
  const goToApp = () => {
    setCurrentPage('App');
  };

  // Renders the current page based on state
  return (
    <React.StrictMode>
      {currentPage === 'App' ? <App goToHome={goToHome} /> : null}
      {currentPage === 'Home' ? <Home goToApp={goToApp} /> : null}
    </React.StrictMode>
  );
}

root.render(
  <RootContainer />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
