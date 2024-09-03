import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const artistOptions = [
    'Kings of Leon', 'The Black Keys', 'Justin Bieber', 'Coldplay', 'Radiohead', 
    'Jack Johnson', 'Modest Mouse', 'Metallica', 'John Mayer', 'Metric'
  ];
  
  const genreOptions = [
    'RnB', 'Rock', 'Pop', 'Metal', 'Electronic', 'Jazz', 'Punk', 'Country', 
    'Folk', 'Reggae', 'Rap', 'Blues', 'New Age', 'Latin', 'World'
  ];

  const handleSelectionChange = (event, setSelected, type) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    if (selected.length <= 3) {
      setSelected(selected);
    } else {
      alert(`Please select up to 3 ${type}.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedArtists.length < 1 || selectedGenres.length < 1) {
      alert('Please select at least 1 option for both artists and genres.');
      return;
    }

    // Save preferences to sessionStorage or pass it as needed
    sessionStorage.setItem('selectedArtists', JSON.stringify(selectedArtists));
    sessionStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));

    // Redirect to the "For You" page
    navigate('/foryou', { state: { selectedArtists, selectedGenres } });
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
            onChange={(e) => handleSelectionChange(e, setSelectedArtists, 'artists')}
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
            onChange={(e) => handleSelectionChange(e, setSelectedGenres, 'genres')}
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
