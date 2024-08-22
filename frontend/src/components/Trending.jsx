import React from 'react'

const Trending = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trending</h2>
      {/* Placeholder for trending content */}
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold">Trending Song 1</h3>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold">Trending Artist 1</h3>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-semibold">Trending Genre 1</h3>
        </div>
        {/* Add more trending content here */}
      </div>
    </div>
  )
}

export default Trending