// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import backgroundImage from '../assets/background.jpg';

// const Preferences = () => {
//   const [selectedArtists, setSelectedArtists] = useState([]);
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [showArtists, setShowArtists] = useState(false); // To toggle artist dropdown
//   const [showGenres, setShowGenres] = useState(false); // To toggle genre dropdown
//   const navigate = useNavigate();

//   const artistOptions = [
//     'Kings of Leon', 'The Black Keys', 'Justin Bieber', 'Coldplay', 'Radiohead', 
//     'Jack Johnson', 'Modest Mouse', 'Metallica', 'John Mayer', 'Metric'
//   ];

//   const genreOptions = [
//     'RnB', 'Rock', 'Pop', 'Metal', 'Electronic', 'Jazz', 'Punk', 'Country', 
//     'Folk', 'Reggae', 'Rap', 'Blues', 'New Age', 'Latin', 'World'
//   ];

//   const handleSelectionChange = (value, selected, setSelected) => {
//     if (selected.includes(value)) {
//       setSelected(selected.filter((item) => item !== value));
//     } else {
//       if (selected.length < 3) {
//         setSelected([...selected, value]);
//       } else {
//         alert('Limit reached. Please select up to 3 options.');
//       }
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (selectedArtists.length > 3 || selectedGenres.length > 3) {
//       alert('Please select a maximum of 3 artists and 3 genres.');
//       return;
//     }

//     const preferences = {
//       artists: selectedArtists,
//       genres: selectedGenres,
//     };

//     fetch('/api/preferences', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(preferences),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Success:', data);
//         navigate('/foryou', { state: { selectedArtists, selectedGenres } });
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div className="flex justify-center items-center h-screen" 
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div 
//         className="preferences-container p-6 max-w-md mx-auto bg-white rounded-lg shadow-md"
//         style={{
//           backgroundColor: 'rgba(255, 255, 255, 0.5)', 
//           backdropFilter: 'blur(10px)', 
//         }}
//       >

//         <h2 className="text-2xl font-bold mb-4">Tell us your preferences</h2>
//         <form onSubmit={handleSubmit}>

//           {/* Favorite Artist Selection */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Who are your favorite artists? (Select 3)
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowArtists(!showArtists)}
//                 className="w-full p-2 border border-gray-300 rounded bg-white text-left"
//               >
//                 {selectedArtists.length > 0 ? `${selectedArtists.length} selected` : 'Select artists'}
//               </button>
//               {showArtists && (
//                 <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
//                   {artistOptions.map((artist) => (
//                     <label key={artist} className="flex items-center p-2 hover:bg-gray-100">
//                       <input
//                         type="checkbox"
//                         value={artist}
//                         checked={selectedArtists.includes(artist)}
//                         onChange={() => handleSelectionChange(artist, selectedArtists, setSelectedArtists)}
//                         className="mr-2"
//                       />
//                       <span style={{ backgroundColor: selectedArtists.includes(artist) ? 'lightgreen' : 'transparent' }}>
//                         {artist}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Favorite Genre Selection */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               What are your favorite genres? (Select 3)
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowGenres(!showGenres)}
//                 className="w-full p-2 border border-gray-300 rounded bg-white text-left"
//               >
//                 {selectedGenres.length > 0 ? `${selectedGenres.length} selected` : 'Select genres'}
//               </button>
//               {showGenres && (
//                 <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
//                   {genreOptions.map((genre) => (
//                     <label key={genre} className="flex items-center p-2 hover:bg-gray-100">
//                       <input
//                         type="checkbox"
//                         value={genre}
//                         checked={selectedGenres.includes(genre)}
//                         onChange={() => handleSelectionChange(genre, selectedGenres, setSelectedGenres)}
//                         className="mr-2"
//                       />
//                       <span style={{ backgroundColor: selectedGenres.includes(genre) ? 'lightgreen' : 'transparent' }}>
//                         {genre}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Preferences;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';

const Preferences = () => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showArtists, setShowArtists] = useState(false); // To toggle artist dropdown
  const [showGenres, setShowGenres] = useState(false); // To toggle genre dropdown
  const navigate = useNavigate();

  const artistOptions = [
    'Kings of Leon', 'The Black Keys', 'Justin Bieber', 'Coldplay', 'Radiohead', 
    'Jack Johnson', 'Modest Mouse', 'Metallica', 'John Mayer', 'Metric'
  ];

  const genreOptions = [
    'RnB', 'Rock', 'Pop', 'Metal', 'Electronic', 'Jazz', 'Punk', 'Country', 
    'Folk', 'Reggae', 'Rap', 'Blues', 'New Age', 'Latin', 'World'
  ];

  const handleSelectionChange = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      if (selected.length < 3) {
        setSelected([...selected, value]);
      } else {
        alert('Limit reached. Please select up to 3 options.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user has selected 3 or fewer artists and genres
    if (selectedArtists.length > 3 || selectedGenres.length > 3) {
      alert('Please select a maximum of 3 artists and 3 genres.');
      return;
    }

    // Check if the user has selected at least 3 artists and 3 genres
    if (selectedArtists.length == 0 || selectedGenres.length == 0) {
      alert('Please select at least 3 artists and 3 genres.');
      return;
    }

    fetch('http://localhost:8001/trackinfo/', { // Replace with your actual API URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ artist_name: selectedArtists, genre_name: selectedGenres }),
    })
    
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);

        // Check if track_info is available
        if (data.track_info) {
          sessionStorage.setItem('saved_tracks', JSON.stringify(data.track_info));
            // Navigate to the "For You" page with selected preferences and track info
            navigate('/foryou', { state: { selectedArtists, selectedGenres, tracks: data.track_info } });
        } else {
            alert('No tracks found for the selected artists and genres.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
};


  return (
    <div className="flex justify-center items-center h-screen" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div 
        className="preferences-container p-6 max-w-md mx-auto bg-white rounded-lg shadow-md"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)', 
          backdropFilter: 'blur(10px)', 
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Tell us your preferences</h2>
        <form onSubmit={handleSubmit}>

          {/* Favorite Artist Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Who are your favorite artists? (Select 3)
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowArtists(!showArtists)}
                className="w-full p-2 border border-gray-300 rounded bg-white text-left"
              >
                {selectedArtists.length > 0 ? `${selectedArtists.length} selected` : 'Select artists'}
              </button>
              {showArtists && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
                  {artistOptions.map((artist) => (
                    <label key={artist} className="flex items-center p-2 hover:bg-gray-100">
                      <input
                        type="checkbox"
                        value={artist}
                        checked={selectedArtists.includes(artist)}
                        onChange={() => handleSelectionChange(artist, selectedArtists, setSelectedArtists)}
                        className="mr-2"
                      />
                      <span style={{ backgroundColor: selectedArtists.includes(artist) ? 'lightgreen' : 'transparent' }}>
                        {artist}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Favorite Genre Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What are your favorite genres? (Select 3)
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowGenres(!showGenres)}
                className="w-full p-2 border border-gray-300 rounded bg-white text-left"
              >
                {selectedGenres.length > 0 ? `${selectedGenres.length} selected` : 'Select genres'}
              </button>
              {showGenres && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
                  {genreOptions.map((genre) => (
                    <label key={genre} className="flex items-center p-2 hover:bg-gray-100">
                      <input
                        type="checkbox"
                        value={genre}
                        checked={selectedGenres.includes(genre)}
                        onChange={() => handleSelectionChange(genre, selectedGenres, setSelectedGenres)}
                        className="mr-2"
                      />
                      <span style={{ backgroundColor: selectedGenres.includes(genre) ? 'lightgreen' : 'transparent' }}>
                        {genre}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
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
    </div>
  );
};

export default Preferences;
