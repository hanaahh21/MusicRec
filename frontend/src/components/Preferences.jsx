import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const artistOptions = ['Artist A', 'Artist B', 'Artist C', 'Artist D'];
  const genreOptions = ['Pop', 'Rock', 'Jazz', 'Hip-Hop'];

  const handleArtistChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    if (selected.length <= 3) {
      setSelectedArtists(selected);
    } else {
      alert('Please select up to 3 artists.');
    }
  };

  const handleGenreChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    if (selected.length <= 3) {
      setSelectedGenres(selected);
    } else {
      alert('Please select up to 3 genres.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedArtists.length < 1 || selectedGenres.length < 1) {
      alert('Please select at least 1 option for both artists and genres.');
      return;
    }

    // Handle the collected data (e.g., send to backend, update state, etc.)
    console.log('Selected Artists:', selectedArtists);
    console.log('Selected Genres:', selectedGenres);

    // Redirect user after submitting
    navigate('/foryou'); // Redirect to the desired page after form submission
  };

  return (
    <div className="preferences-container p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Tell us your preferences</h2>
      <form onSubmit={handleSubmit}>

        {/* Favorite Artist Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Who is your favorite artist? (Select 1-3)
          </label>
          <select
            multiple
            value={selectedArtists}
            onChange={handleArtistChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {artistOptions.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>

        {/* Favorite Genre Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What is your favorite genre? (Select 1-3)
          </label>
          <select
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Preferences;
