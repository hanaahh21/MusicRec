import React, { useState } from 'react';

const Foryou = () => {
  const [activeSong, setActiveSong] = useState(null);

  const handleSongClick = (song) => {
    setActiveSong(activeSong === song ? null : song);
    // Trigger any action here, like playing the song or navigating to a detailed view
    console.log(`Clicked on ${song}`);
  };

  const handleRelatedSongClick = (relatedSong) => {
    // Handle the related song click, like playing it or navigating to its details
    console.log(`Playing related song: ${relatedSong}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
      <div className="flex space-x-4">
        {/* Songs displayed side by side */}
        <div className="relative">
          <div
            className="p-4 bg-gray-800 text-white rounded-lg shadow-md cursor-pointer"
            onClick={() => handleSongClick('Song 1')}
          >
            Song 1
          </div>
          {activeSong === 'Song 1' && (
            <div className="absolute top-full mt-2 bg-gray-700 rounded-lg shadow-md">
              <div
                onClick={() => handleRelatedSongClick('Related Song 1A')}
                className="p-2 bg-gray-800 text-white rounded-t-lg cursor-pointer hover:bg-gray-600"
              >
                Related Song 1A
              </div>
              <div
                onClick={() => handleRelatedSongClick('Related Song 1B')}
                className="p-2 bg-gray-800 text-white cursor-pointer hover:bg-gray-600"
              >
                Related Song 1B
              </div>
              <div
                onClick={() => handleRelatedSongClick('Related Song 1C')}
                className="p-2 bg-gray-800 text-white rounded-b-lg cursor-pointer hover:bg-gray-600"
              >
                Related Song 1C
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="p-4 bg-gray-800 text-white rounded-lg shadow-md cursor-pointer"
            onClick={() => handleSongClick('Song 2')}
          >
            Song 2
          </div>
          {activeSong === 'Song 2' && (
            <div className="absolute top-full mt-2 bg-gray-700 rounded-lg shadow-md">
              <div
                onClick={() => handleRelatedSongClick('Related Song 2A')}
                className="p-2 bg-gray-800 text-white rounded-t-lg cursor-pointer hover:bg-gray-600"
              >
                Related Song 2A
              </div>
              <div
                onClick={() => handleRelatedSongClick('Related Song 2B')}
                className="p-2 bg-gray-800 text-white cursor-pointer hover:bg-gray-600"
              >
                Related Song 2B
              </div>
              <div
                onClick={() => handleRelatedSongClick('Related Song 2C')}
                className="p-2 bg-gray-800 text-white rounded-b-lg cursor-pointer hover:bg-gray-600"
              >
                Related Song 2C
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="p-4 bg-gray-800 text-white rounded-lg shadow-md cursor-pointer"
            onClick={() => handleSongClick('Song 3')}
          >
            Song 3
          </div>
          {activeSong === 'Song 3' && (
            <div className="absolute top-full mt-2 bg-gray-700 rounded-lg shadow-md">
              <div
                onClick={() => handleRelatedSongClick('Related Song 3A')}
                className="p-2 bg-gray-800 text-white rounded-t-lg cursor-pointer hover:bg-gray-600"
              >
                Related Song 3A
              </div>
              <div
                onClick={() => handleRelatedSongClick('Related Song 3B')}
                className="p-2 bg-gray-800 text-white cursor-pointer hover:bg-gray-600"
              >
                Related Song 3B
              </div>
              <div
                onClick={() => handleRelatedSongClick('Related Song 3C')}
                className="p-2 bg-gray-800 text-white rounded-b-lg cursor-pointer hover:bg-gray-600"
              >
                Related Song 3C
              </div>
            </div>
          )}
        </div>
        {/* Add more songs similarly */}
      </div>
    </div>
  );
};

export default Foryou;
