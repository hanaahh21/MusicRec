import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/background.jpg';


const AddSong = () => {
  // Define state for each field in the form
  const [songData, setSongData] = useState({
    track_id: '', // Make sure to include track_id if needed
    name: '',
    artist: '',
    spotify_preview_url: '',
    spotify_id: '',
    tags: '',
    genre: '',
    year: '',
    duration_ms: '',
    danceability: '',
    energy: '',
    key: '',
    loudness: '',
    mode: '',
    speechiness: '',
    acousticness: '',
    instrumentalness: '',
    liveness: '',
    valence: '',
    tempo: '',
    time_signature: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to backend
    axios.post('http://localhost:8001/add_track', songData)
      .then(response => {
        alert('Song added successfully!');
        // Reset the form
        setSongData({
          track_id: '',
          name: '',
          artist: '',
          spotify_preview_url: '',
          spotify_id: '',
          tags: '',
          genre: '',
          year: '',
          duration_ms: '',
          danceability: '',
          energy: '',
          key: '',
          loudness: '',
          mode: '',
          speechiness: '',
          acousticness: '',
          instrumentalness: '',
          liveness: '',
          valence: '',
          tempo: '',
          time_signature: ''
        });
      })
      .catch(error => {
        console.error('Error adding song:', error);
        alert('Failed to add song');
      });
  };

  return (
    <div className='flex justify-center items-center min-h-screen'
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      <div className="p-4 bg-white rounded shadow-lg max-w-lg min-h-screen mx-auto"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // White with 70% opacity; adjust last value for transparency
      backdropFilter: 'blur(10px)', // Adds a subtle blur for a glass effect
    }}
    >
      <h2 className="text-xl font-bold mb-4">Add New Song</h2>
      <form onSubmit={handleSubmit}>

        {/* Generate form fields dynamically */}
        {Object.keys(songData).map((field, index) => (
          <div className="mb-3" key={index}>
            <label className="block text-sm font-medium mb-1 capitalize" htmlFor={field}>
              {field.replace('_', ' ')}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={songData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder={`Enter ${field.replace('_', ' ')}`}
              required
            />
          </div>
        ))}

        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
          Add Song
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddSong;
