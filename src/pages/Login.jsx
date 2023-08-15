import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAtom } from 'jotai'; // Import useAtom hook
import { jwtAtom } from '../atoms/atom'; // Import your atom
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwtData, setJwtData] = useAtom(jwtAtom);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      identifier: username,
      password
    };

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const jsonResponse = await response.json();

        if (jsonResponse.jwt) {
          console.log('User logged in successfully');
          console.log('JWT:', jsonResponse.jwt);
          Cookies.set('jwt-login', jsonResponse.jwt);
          setJwtData({ ...jwtData, login: jsonResponse.jwt, id: jsonResponse.user.id });
          navigate('/homepage');
        } else {
          console.error('JWT missing in response');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
