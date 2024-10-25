// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaPlay, FaTimes } from 'react-icons/fa';

// const Trending = () => {
//   const [trendingSongs, setTrendingSongs] = useState([]);
//   const [visibleDropdown, setVisibleDropdown] = useState(null);
//   const [similarTracks, setSimilarTracks] = useState({});
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   useEffect(() => {
//     // Fetch trending songs from backend
//     axios.get('http://localhost:8001/populartracks')  // Update with your actual URL
//       .then(response => {
//         setTrendingSongs(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching trending songs:", error);
//       });
//   }, []);

//   const toggleDropdown = (index, trackId) => {
//     if (visibleDropdown === index) {
//       setVisibleDropdown(null); // Hide the dropdown if it's already visible
//     } else {
//       // Fetch similar tracks if not already fetched
//       if (!similarTracks[trackId]) {
//         axios.post(`http://localhost:8001/getsimilartrack/${trackId}`, { top_n: 2 })  // Update with your actual URL
//           .then(response => {
//             setSimilarTracks(prev => ({ ...prev, [trackId]: response.data.similar_tracks }));
//           })
//           .catch(error => {
//             console.error("Error fetching similar tracks:", error);
//           });
//       }
//       setVisibleDropdown(index); // Show the dropdown for the clicked item
//     }
//   };

  
//   // Define multiple gradient options
//   const gradients = [
//     "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
//     "bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500",
//     "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300",
//     "bg-gradient-to-r from-indigo-400 indigo-teal-500 to-purple-700",
//   ];

//   const handleSongClick = (trackId) => {
//     const isLoggedIn = sessionStorage.getItem('userID'); // Check if the user is logged in
//     if (isLoggedIn) {
//       navigate(`/song/${trackId}`); // Redirect to the song page
//     } else {
//       navigate('/login'); // Redirect to the login page
//     }
//   };

//   const handleRelatedSongClick = (trackId) => {
//     const isLoggedIn = sessionStorage.getItem('userID'); // Check if the user is logged in
//     if (isLoggedIn) {
//       navigate(`/song/${trackId}`); // Redirect to the song detail page
//     } else {
//       navigate('/login'); // Redirect to the login page
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="trending-page flex-1 p-6 bg-gray-100">
//         <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Trending Songs</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {trendingSongs.map((song, index) => (
//             <div key={index} className="trending-card p-6 bg-white rounded-lg shadow-lg relative">
//               <h3 className="text-xl font-semibold mb-2">{song.track_name}</h3>
//               <p className="text-gray-600 mb-4">{song.artist} - {song.genre}</p>
//               <div className="flex space-x-4">
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                   onClick={() => handleSongClick(song.track_id)}
//                 >
//                   Go to Song
//                 </button>
//                 <div className="relative">
//                   <button
//                     className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
//                     onClick={() => toggleDropdown(index, song.track_id)}
//                   >
//                     Related Songs
//                   </button>
//                   {visibleDropdown === index && (
//                     <div className="dropdown-content absolute bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-10">
//                       {similarTracks[song.track_id]?.slice(0, 2).map((relatedSong, idx) => (
//                         <button
//                           key={idx}
//                           onClick={() => handleRelatedSongClick(relatedSong.track_id)}
//                           className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
//                         >
//                           {relatedSong.track_name}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Trending;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaTimes } from "react-icons/fa";

const Trending = () => {
  const [trendingSongs, setTrendingSongs] = useState([]); // Trending songs from backend
  const [similarTracks, setSimilarTracks] = useState({}); // Similar tracks from backend
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const [selectedSongId, setSelectedSongId] = useState(null); // Track which song's related songs to show
  const navigate = useNavigate();

  // Fetch trending songs from the backend
  useEffect(() => {
    axios.get('http://localhost:8001/populartracks')  // Update with your actual URL
      .then(response => {
        setTrendingSongs(response.data);
      })
      .catch(error => {
        console.error("Error fetching trending songs:", error);
      });
  }, []);

  // Define multiple gradient options
  const gradients = [
    "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
    "bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500",
    "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300",
    "bg-gradient-to-r from-indigo-400 indigo-teal-500 to-purple-700",
  ];

  const handleSongClick = (trackId) => {
    const isLoggedIn = sessionStorage.getItem("userID");
    if (isLoggedIn) {
      navigate(`/song/${trackId}`);
    } else {
      navigate("/login");
    }
  };

  const handleRelatedSongClick = (trackId) => {
    const isLoggedIn = sessionStorage.getItem("userID");
    if (isLoggedIn) {
      navigate(`/song/${trackId}`);
    } else {
      navigate("/login");
    }
  };

  const openModal = (trackId) => {
    setSelectedSongId(trackId);
    setIsModalOpen(true);

    // Fetch similar tracks if not already fetched
    if (!similarTracks[trackId]) {
      axios.post(`http://localhost:8001/getsimilartrack/${trackId}`, { top_n: 2 })
        .then(response => {
          setSimilarTracks(prev => ({ ...prev, [trackId]: response.data.similar_tracks }));
        })
        .catch(error => {
          console.error("Error fetching similar tracks:", error);
        });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSongId(null);
  };

  // return (
  //   <div className="flex h-screen w-full overflow-hidden ">
  //     <div className="flex flex-col p-6 bg-gray-100 rounded-3xl border">
  //       <h2 className="text-3xl font-bold mb-8 text-center text-gray-500">
  //         Trending Songs
  //       </h2>
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
  //         {trendingSongs.map((song, index) => {
  //           const randomGradient =
  //             gradients[Math.floor(Math.random() * gradients.length)];

  //           return (
  //             <div
  //               key={index}
  //               className={`trending-card p-6 rounded-lg shadow-lg relative ${randomGradient} h-40 transition-all duration-300 ease-in-out`}
  //             >
  //               <h3 className="text-xl text-center font-semibold text-white">
  //                 {song.track_name}
  //               </h3>
  //               <p className="text-gray-200 mb-4 text-center">
  //                 {song.artist} - {song.genre}
  //               </p>

  //               <div className="flex justify-center mb-2">
  //                 <button
  //                   className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
  //                   onClick={() => handleSongClick(song.track_id)}
  //                 >
  //                   <FaPlay />
  //                 </button>
  //               </div>

  //               <div className="text-xs text-white absolute bottom-2 left-0 right-0 text-center">
  //                 <button
  //                   className="hover:text-gray-300"
  //                   onClick={() => openModal(song.track_id)}
  //                 >
  //                   Related Songs
  //                 </button>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>

  //     {/* Modal for Related Songs */}
  //     {isModalOpen && selectedSongId && (
  //       <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex justify-center items-center z-50">
  //         <div className="bg-white bg-opacity-80 rounded-lg p-8 w-96 relative shadow-lg">
  //           <button
  //             className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
  //             onClick={closeModal}
  //           >
  //             <FaTimes className="text-xl" />
  //           </button>

  //           <h2 className="text-xl font-bold mb-4 text-center">
  //             Related Songs
  //           </h2>

  //           <div className="flex flex-col space-y-4">
  //             {similarTracks[selectedSongId]?.map((relatedSong, idx) => (
  //               <div
  //                 key={idx}
  //                 className="flex justify-between items-center bg-white rounded-lg shadow-md p-3 hover:bg-gray-100 transition-colors"
  //               >
  //                 <div className="text-gray-800 font-semibold">
  //                   {relatedSong.track_name}
  //                 </div>
  //                 <button
  //                   onClick={() => handleRelatedSongClick(relatedSong.track_id)}
  //                   className="text-blue-500 hover:text-blue-700"
  //                 >
  //                   <FaPlay className="text-lg" />
  //                 </button>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <div className="flex flex-col flex-1 p-6 bg-gray-100 rounded-3xl border m-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-500">
          Trending Songs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
          {trendingSongs.map((song, index) => {
            const randomGradient =
              gradients[Math.floor(Math.random() * gradients.length)];
            return (
              <div
                key={index}
                className={`trending-card p-6 rounded-lg shadow-lg relative ${randomGradient} h-40 transition-all duration-300 ease-in-out`}
              >
                <h3 className="text-xl text-center font-semibold text-white">
                  {song.track_name}
                </h3>
                <p className="text-gray-200 mb-4 text-center">
                  {song.artist} - {song.genre}
                </p>
                <div className="flex justify-center mb-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                    onClick={() => handleSongClick(song.track_id)}
                  >
                    <FaPlay />
                  </button>
                </div>
                <div className="text-xs text-white absolute bottom-2 left-0 right-0 text-center">
                  <button
                    className="hover:text-gray-300"
                    onClick={() => openModal(song.track_id)}
                  >
                    Related Songs
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && selectedSongId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white bg-opacity-80 rounded-lg p-8 w-96 relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Related Songs</h2>
            <div className="flex flex-col space-y-4">
              {similarTracks[selectedSongId]?.map((relatedSong, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white rounded-lg shadow-md p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-gray-800 font-semibold">
                    {relatedSong.track_name}
                  </div>
                  <button
                    onClick={() => handleRelatedSongClick(relatedSong.track_id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaPlay className="text-lg" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );  
};

export default Trending;
