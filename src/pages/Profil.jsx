import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { jwtAtom } from '../atoms/atom';
import Navbar from '../components/Navbar';

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [jwtData] = useAtom(jwtAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtData.login}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    if (jwtData.login) {
      fetchUserData();
    }
  }, [jwtData.login]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:1337/api/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtData.login}`
        },
        body: JSON.stringify({
          username: newUsername,
          description: newDescription
        })
      });
  
      if (response.ok) {
        const updatedResponse = await fetch('http://localhost:1337/api/users/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtData.login}`
          }
        });
  
        if (updatedResponse.ok) {
          const updatedUserData = await updatedResponse.json();
          setUserData(updatedUserData);
          setNewUsername('');
          setNewDescription('');
        } else {
          console.error('Failed to fetch updated user data');
        }
      } else {
        console.error('Failed to update user profile');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    <div>
      <Navbar />
      <h1>Profil</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Description: {userData.description}</p>
          <form onSubmit={handleUpdateProfile}>
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="New Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profil;
