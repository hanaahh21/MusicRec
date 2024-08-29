import React, { useState } from 'react';

const Trending = () => {
  const trendingSongs = [
    { title: "Trending Song 1", artist: "Artist 1", genre: "Genre 1", link: "/song1", related: ["Related Song 1A", "Related Song 1B"] },
    { title: "Trending Song 2", artist: "Artist 2", genre: "Genre 2", link: "/song2", related: ["Related Song 2A", "Related Song 2B"] },
    // Add more trending songs here
    { title: "Trending Song 1", artist: "Artist 1", genre: "Genre 1", link: "/song1", related: ["Related Song 1A", "Related Song 1B"] },
    { title: "Trending Song 2", artist: "Artist 2", genre: "Genre 2", link: "/song2", related: ["Related Song 2A", "Related Song 2B"] },
    // Add more trending songs here
    { title: "Trending Song 1", artist: "Artist 1", genre: "Genre 1", link: "/song1", related: ["Related Song 1A", "Related Song 1B"] },
    { title: "Trending Song 2", artist: "Artist 2", genre: "Genre 2", link: "/song2", related: ["Related Song 2A", "Related Song 2B"] },
    // Add more trending songs here
    { title: "Trending Song 1", artist: "Artist 1", genre: "Genre 1", link: "/song1", related: ["Related Song 1A", "Related Song 1B"] },
    { title: "Trending Song 2", artist: "Artist 2", genre: "Genre 2", link: "/song2", related: ["Related Song 2A", "Related Song 2B"] },
    // Add more trending songs here
    { title: "Trending Song 1", artist: "Artist 1", genre: "Genre 1", link: "/song1", related: ["Related Song 1A", "Related Song 1B"] },
    
  ];

  const [visibleDropdown, setVisibleDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (visibleDropdown === index) {
      setVisibleDropdown(null); // Hide the dropdown if it's already visible
    } else {
      setVisibleDropdown(index); // Show the dropdown for the clicked item
    }
  };

  return (
    <div className="trending-page p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Trending Songs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingSongs.map((song, index) => (
          <div key={index} className="trending-card p-6 bg-white rounded-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-2">{song.title}</h3>
            <p className="text-gray-600 mb-4">{song.artist} - {song.genre}</p>
            <div className="flex space-x-4">
              <a href={song.link} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Go to Song</a>
              <div className="relative">
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                  onClick={() => toggleDropdown(index)}
                >
                  Related Songs
                </button>
                {visibleDropdown === index && (
                  <div className="dropdown-content absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-10">
                    {song.related.map((relatedSong, idx) => (
                      <a href="#" key={idx} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">{relatedSong}</a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
