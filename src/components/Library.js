import React from 'react';
import LibrarySong from './LibrarySong';
import Song from './Song';

const Library = ({songs, currentSong, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                <LibrarySong 
                    id={song.id}
                    songs={songs}
                    song={song} 
                    currentSong={currentSong} 
                    setCurrentSong={setCurrentSong} 
                    key={song.id}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setSongs={setSongs}
                />
                ))}
            </div>
        </div>
    )
}

export default Library