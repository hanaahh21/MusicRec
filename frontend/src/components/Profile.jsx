
import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    photo: 'https://via.placeholder.com/150', // Placeholder image URL
  });

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
