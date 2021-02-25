import React, { useState, useRef } from 'react';
import './style/app.scss';

import Player from './components/Player';
import Song from './components/Song';
import data from './data';
import Library from './components/Library';
import Nav from './components/Nav';


function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
});
  const [libraryStatus, setLibraryStatus] = useState(false);

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration || 0;
  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration) * 100)
  setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animation})
}

const songEndHandler = async () => {
  let currentIndex = songs.findIndex(song => song.id === currentSong.id);
  await setCurrentSong(songs[currentIndex + 1] || songs[0]);
  if(isPlaying) audioRef.current.play();
};

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player 
        songs={songs}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying} 
        isPlaying={isPlaying} 
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library 
        setSongs={setSongs}
        songs={songs} 
        currentSong={currentSong} 
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
        />
      <audio 
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler} 
          ref={audioRef} 
          src={currentSong.audio} 
          onEnded={songEndHandler}
      >
      </audio>
    </div>
  );
}

export default App;
