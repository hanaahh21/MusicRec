import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
const Recommended = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchType = searchParams.keys().next().value; // Get the search type (song, artist, etc.)
  const query = searchParams.get(searchType); // Get the user query
  
  
  // Simulated recommended songs data based on search type and query
    const recommendedSongs = [
      { id: 1, title: 'Song 1', artist: 'Artist A', genre: 'Pop' },
      { id: 2, title: 'Song 2', artist: 'Artist B', genre: 'Rock' },
      // Populate with real data
    ].filter((song) => song[searchType]?.toLowerCase().includes(query.toLowerCase()));
      
    
    
    return (
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Recommendations for {searchType}: "{query}"
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedSongs.map((song) => (
          <div key={song.id} className="song-item bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p>{song.artist}</p>
            <p className="text-gray-600">{song.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended