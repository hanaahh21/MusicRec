import React from 'react'

const Bottombar = () => {
  return (
    <div className="bg-gray-900 text-white p-4 flex items-center justify-between fixed bottom-0 w-full shadow-lg z-40">
      {/* Playback Controls */}
      <div className="flex items-center space-x-4">
        <button className="text-blue-500 hover:text-blue-400">
          <span role="img" aria-label="previous">⏮️</span>
        </button>
        <button className="text-blue-500 hover:text-blue-400">
          <span role="img" aria-label="play">▶️</span>
        </button>
        <button className="text-blue-500 hover:text-blue-400">
          <span role="img" aria-label="pause">⏸️</span>
        </button>
        <button className="text-blue-500 hover:text-blue-400">
          <span role="img" aria-label="next">⏭️</span>
        </button>
      </div>

      {/* Track Information */}
      <div className="flex flex-col items-center">
        <div className="text-sm font-semibold">Track Title - Artist</div>
        <div className="text-xs text-gray-400">Album Name</div>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col items-center w-1/3">
        <input
          type="range"
          min="0"
          max="100"
          className="w-full"
        />
        <div className="text-xs text-gray-400">0:00 / 3:45</div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-2">
        <button className="text-blue-500 hover:text-blue-400">
          <span role="img" aria-label="volume">🔊</span>
        </button>
        <input
          type="range"
          min="0"
          max="100"
          className="w-24"
        />
      </div>

      {/* Additional Controls */}
      <div className="flex items-center space-x-4">
        <button className="text-blue-500 hover:text-blue-400">
          <span role="img" aria-label="shuffle">🔀</span>
        </button>
        <button className="text-blue-500 hover:text-blue-400">
          <span role="img" aria-label="repeat">🔁</span>
        </button>
      </div>
    </div>
  );
};

export default Bottombar;