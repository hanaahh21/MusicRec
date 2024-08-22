import React from 'react'


const Foryou = () => {
  return (
    <div>
    <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
    {/* Placeholder for recommended songs */}
    <div className="space-y-4">
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">Song 1</div>
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">Song 2</div>
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">Song 3</div>
      {/* Add more recommended songs here */}
    </div>
  </div>
  )
}

export default Foryou