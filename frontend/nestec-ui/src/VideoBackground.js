import React from 'react';
import './VideoBackground.css'; // Import CSS file for styling

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src="app-bkg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoBackground;
