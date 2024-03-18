// VideoComponent.js

import React from 'react';

function VideoComponent() {
  return (
    <div className="video-container">
      <video autoPlay muted loop>
        <source src="../img/app-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoComponent;
