import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAtom } from 'jotai';
import { jwtAtom } from '../atoms/atom';

const Home = () => {
  const [jwtData] = useAtom(jwtAtom);
  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtData.login}`
        },
        body: JSON.stringify({
          text: newPostText,
          user: jwtData.id
        })
      });
  
      if (response.ok) {
        console.log('Post created successfully');
        setNewPostText('');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Homepage</h1>
      {jwtData.login ? (
        <div>
        <input
          type="text"
          placeholder="Write a post..."
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <button onClick={handleCreatePost}>Post</button>
      </div>
      ) : (
        <p>
          Welcome on My Social Network. This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.
        </p>
      )}
    </div>
  );
};

export default Home;
