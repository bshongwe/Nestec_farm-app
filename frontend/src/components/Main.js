import React from 'react';
import { Route } from 'react-router-dom';
import Home from '.src/components/pages/Home';
import Dashboard from '.src/components/pages/Dashboard';
import Profile from '.src/components/pages/Profile';
import Login from '.src/components/pages/Login';
import Register from '.src/components/pages/Register';

const Main = () => {
  return (
    <main style={{ marginTop: '58px' }}>
      {/* Video Background */}
      <video autoPlay loop muted style={{ position: 'fixed', minWidth: '100%', minHeight: '100%', zIndex: '-1' }}>
        <source src="/your_video_url.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container">
        {/* Main content goes here */}
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </main>
  );
}

export default Main;

