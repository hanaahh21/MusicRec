
// // import { useState } from 'react';
// // import axios from 'axios';

// // const Profile = () => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [profile, setProfile] = useState({
// //     name: 'John Doe',
// //     email: 'johndoe@example.com',
// //     photo: 'https://via.placeholder.com/150', // Placeholder image URL
// //   });

// //   const handleEditClick = () => {
// //     setIsEditing(!isEditing);
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setProfile((prevProfile) => ({
// //       ...prevProfile,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSaveClick = () => {
// //     setIsEditing(false);
// //     // Add save logic here, such as sending the updated profile to a backend server.
// //   };

// //   return (
// //     <div className="profile-container p-4 bg-white rounded shadow-md max-w-md mx-auto mt-10">
// //       <img
// //         src={profile.photo}
// //         alt="Profile"
// //         className="w-32 h-32 rounded-full mx-auto"
// //       />
// //       <div className="text-center mt-4">
// //         {isEditing ? (
// //           <input
// //             type="text"
// //             name="name"
// //             value={profile.name}
// //             onChange={handleInputChange}
// //             className="text-lg font-semibold border-b border-gray-300 text-center mb-2"
// //           />
// //         ) : (
// //           <h2 className="text-lg font-semibold">{profile.name}</h2>
// //         )}
// //         {isEditing ? (
// //           <input
// //             type="email"
// //             name="email"
// //             value={profile.email}
// //             onChange={handleInputChange}
// //             className="text-sm text-gray-600 border-b border-gray-300 text-center"
// //           />
// //         ) : (
// //           <p className="text-sm text-gray-600">{profile.email}</p>
// //         )}
// //         <button
// //           onClick={isEditing ? handleSaveClick : handleEditClick}
// //           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
// //         >
// //           {isEditing ? 'Save' : 'Edit Profile'}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const user_name = sessionStorage.getItem('username');
//   console.log(user_name);
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     photo: 'https://via.placeholder.com/150', // Placeholder image URL
//   });
//   useEffect(() => {
//   if (user_name) { // Ensure username is available
//     // Fetch user details based on logged-in username
//     axios.get(`http://sessionhost:8000/user/${user_name}`)
//       .then(response => { 
//         const userData = response.data;
//         setProfile({
//           name: `${userData.firstname} ${userData.lastname}`,
//           email: userData.email,
//           photo: userData.photo || 'https://via.placeholder.com/150', // Replace with actual photo URL if available
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching user details:', error);
//       });
//   }
// }, [user_name]);

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleSaveClick = () => {
//     setIsEditing(false);
//     // Add save logic here, such as sending the updated profile to a backend server.
//   };

//   return (
//     <div className="profile-container p-4 bg-white rounded shadow-md max-w-md mx-auto mt-10">
//       <img
//         src={profile.photo}
//         alt="Profile"
//         className="w-32 h-32 rounded-full mx-auto"
//       />
//       <div className="text-center mt-4">
//         {isEditing ? (
//           <input
//             type="text"
//             name="name"
//             value={profile.name}
//             onChange={handleInputChange}
//             className="text-lg font-semibold border-b border-gray-300 text-center mb-2"
//           />
//         ) : (
//           <h2 className="text-lg font-semibold">{profile.name}</h2>
//         )}
//         {isEditing ? (
//           <input
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleInputChange}
//             className="text-sm text-gray-600 border-b border-gray-300 text-center"
//           />
//         ) : (
//           <p className="text-sm text-gray-600">{profile.email}</p>
//         )}
//         <button
//           onClick={isEditing ? handleSaveClick : handleEditClick}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
//         >
//           {isEditing ? 'Save' : 'Edit Profile'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const user_id = sessionStorage.getItem('userID'); // Retrieve username
  console.log('Retrieved username:', user_id); // Log username for debugging

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    photo: 'https://via.placeholder.com/150', // Placeholder image URL
  });

  useEffect(() => {
    if (user_id) { // Ensure username is available
      // Fetch user details based on logged-in username
      axios.get(`http://localhost:8000/user/${user_id}`)
        .then(response => { 
          const userData = response.data;
          setProfile({
            name: `${userData.firstname} ${userData.lastname}`,
            email: userData.email,
            photo: userData.photo || 'https://via.placeholder.com/150', // Replace with actual photo URL if available
          });
        })
        .catch(error => {
          console.error('Error fetching user details:', error.response ? error.response.data : error.message);
        });
    }
  }, [user_id]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add save logic here, such as sending the updated profile to a backend server.
  };

  return (
    <div className="profile-container p-4 bg-white rounded shadow-md max-w-md mx-auto mt-10">
      <img
        src={profile.photo}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto"
      />
      <div className="text-center mt-4">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="text-lg font-semibold border-b border-gray-300 text-center mb-2"
          />
        ) : (
          <h2 className="text-lg font-semibold">{profile.name}</h2>
        )}
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="text-sm text-gray-600 border-b border-gray-300 text-center"
          />
        ) : (
          <p className="text-sm text-gray-600">{profile.email}</p>
        )}
        <button
          onClick={isEditing ? handleSaveClick : handleEditClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
      </div>
    </div>
  );
};

export default Profile;

