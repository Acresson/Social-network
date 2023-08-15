import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAtom } from 'jotai';
import { jwtAtom } from '../atoms/atom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [jwtData, setJwtData] = useAtom(jwtAtom); // Use the atom and its setter
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const jsonResponse = await response.json();

        if (jsonResponse.jwt) {
          console.log('User registered successfully');
          console.log('JWT:', jsonResponse.jwt);
          // Update the JWT in the atom using the setter
          setJwtData({ ...jwtData, register: jsonResponse.jwt });
          console.log('JWT Atom:', jwtData); // Check the updated atom value
          navigate('/login');
        } else {
          console.error('JWT missing in response');
        }
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

 

  return (
    <div className="container">
      <Navbar />
      <h1 className="mt-4">Register</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
