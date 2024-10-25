import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/background.jpg';

const Song = () => {
  const { trackId } = useParams(); // Capture the trackId from the URL
  const [song, setSong] = useState(null);
  const [similarSongs, setSimilarSongs] = useState([]);

  // Define multiple gradient options
  const gradients = [
    "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
    "bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500",
    "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300",
    "bg-gradient-to-r from-indigo-400 via-teal-500 to-purple-700",
  ];

  useEffect(() => {
    // Fetch song info
    axios.post(`http://localhost:8001/trackinfo_id/${trackId}`)
      .then(response => {
        console.log("Song Info:", response.data); // Add this line
        setSong(response.data.track_info[0]);
      })
      .catch(error => {
        console.error("Error fetching song details:", error);
      });

    // Fetch similar songs
    axios.post(`http://localhost:8001/getsimilartrack/${trackId}`, { top_n: 6 })
      .then(response => {
        console.log("Similar Songs:", response.data); // Add this line
        setSimilarSongs(response.data.similar_tracks);
      })
      .catch(error => {
        console.error("Error fetching similar tracks:", error);
      });
  }, [trackId]);

  const handlePlayPause = () => {
    window.open(song?.link, '_blank'); // Redirect to Spotify URL
  };

  const handleSearch = (songName) => {
    const searchUrl = `https://open.spotify.com/search/${encodeURIComponent(songName)}`;
    window.open(searchUrl, '_blank'); // Open the search URL in a new tab
  };

  return (
    <div className="song-page p-4 flex flex-col min-h-screen w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Song Details */}
      <div className="song-details mb-6 bg-white p-4 rounded-lg shadow-md opacity-90"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // White with 70% opacity; adjust last value for transparency
          backdropFilter: 'blur(10px)', // Adds a subtle blur for a glass effect
        }}
      >
        {song ? (
          <>
            <h1 className="text-3xl font-bold mb-2">{song.track_name}</h1>
            <p className="text-lg text-gray-700">{song.artist}</p>
            <p className="text-md text-gray-700 mb-4">{song.genre}</p>
            <p className="text-md text-gray-700 mb-4">{song.year}</p>
            <button
              onClick={handlePlayPause}
              className="mt-4 py-2 px-4 rounded-lg text-white font-bold bg-green-500"
            >
              Play song preview
            </button>
            <button
              onClick={() => handleSearch(song.track_name)}
              className="mt-4 py-2 px-4 rounded-lg text-white font-bold bg-blue-500 mt-2"
            >
              Search on Spotify
            </button>
          </>
        ) : (
          <p>Loading song details...</p>
        )}
      </div>

      {/* Similar Songs Section */}
      <div className="similar-songs mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <h2 className="text-2xl font-bold text-white mb-4 col-span-full">You Might Like</h2>
        {similarSongs.length > 0 ? (
          similarSongs.map((similarSong) => {
            // Randomly select a gradient for each song card
            const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

            return (
              <div
                key={similarSong.track_id}
                className={`similar-song p-4 relative ${randomGradient} rounded-lg shadow hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="p-2">
                  <h3 className="text-lg font-semibold">{similarSong.track_name}</h3>
                  <p className="text-gray-600">{similarSong.artist}</p>
                  <Link to={`/song/${similarSong.track_id}`} className="text-blue-800 hover:underline mt-2 block">
                    Go to Song
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading similar songs...</p>
        )}
      </div>
    </div>
  );
};

export default Song;
