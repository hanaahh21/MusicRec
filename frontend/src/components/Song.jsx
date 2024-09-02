import React, { useState, useRef } from 'react';

const Song = ({ song, similarSongs }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="song-page p-4">
      {/* Song Details */}
      <div className="song-details mb-6">
        <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
        <p className="text-lg text-gray-700">{song.artist}</p>
        <p className="text-md text-gray-500 mb-4">{song.album}</p>

        {/* Audio Player */}
        <audio ref={audioRef} src={song.audioUrl} />

        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className={`py-2 px-4 rounded-lg text-white font-bold ${isPlaying ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {isPlaying ? 'Pause' : 'Play'} Song
        </button>
      </div>

      {/* Similar Songs Section */}
      <div className="similar-songs mt-8">
        <h2 className="text-2xl font-bold mb-4">you might like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {similarSongs.map((similarSong) => (
            <div key={similarSong.id} className="similar-song bg-white p-4 rounded-lg shadow">
              <img
                src={similarSong.imageUrl}
                alt={similarSong.title}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{similarSong.title}</h3>
              <p className="text-gray-600">{similarSong.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Song;