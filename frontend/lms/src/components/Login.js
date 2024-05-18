import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/auth/${userType}-login`, {
        email: username,
        password: password
      });

      console.log(response.data.message); // Log the login message

      // Store user ID in local storage
      localStorage.setItem('userId', response.data.userId);

      // Navigate to the respective home page based on user type
      if (userType === 'admin') {
        navigate('/home-admin');
      } else if (userType === 'teacher') {
        navigate('/home-teacher');
      } else if (userType === 'student') {
        navigate('/home-student');
      }

      // Reset username and password fields after successful login
      setUsername('');
      setPassword('');
    } catch (error) {
      alert("Invalid credentials");
      console.error('Login error:', error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-4">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${userType === 'admin' && 'opacity-50'}`}
              type="button"
              onClick={() => setUserType('admin')}
              disabled={userType === 'admin'}
            >
              Admin
            </button>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${userType === 'teacher' && 'opacity-50'}`}
              type="button"
              onClick={() => setUserType('teacher')}
              disabled={userType === 'teacher'}
            >
              Teacher
            </button>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${userType === 'student' && 'opacity-50'}`}
              type="button"
              onClick={() => setUserType('student')}
              disabled={userType === 'student'}
            >
              Student
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
