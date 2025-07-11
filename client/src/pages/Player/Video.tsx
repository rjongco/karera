import React from 'react';
import YouTube from 'react-youtube'; // Import the React YouTube component

function Video() {
  // Options for the YouTube player
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  // Replace 'VIDEO_ID_HERE' with the actual YouTube video ID
  const videoId = 'Bbge1m5UwB8';

  return <YouTube 
    videoId={videoId} 
    opts={opts} 
    className="iframe-container"
  />;
}

export default Video;
