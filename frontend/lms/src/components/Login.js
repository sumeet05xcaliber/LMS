import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bglogo from '../assets/bgimage.jpg';
import companyLogo from '../assets/company_logo.jpg';

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
    <div className="flex flex-col h-screen bg-gray-100 bg-cover bg-center" style={{backgroundImage: `url(${bglogo})`}}>
      <header className="w-full bg-gradient-to-r from-blue-800 to-blue-400 p-4">
      <div className="container mx-auto flex items-center">
        <img src={companyLogo} alt="Company Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-white text-xl font-bold">Learn-Mate</h1>
      </div>
    </header>
      <div className="flex justify-center items-center flex-grow">
        <div className="w-full max-w-md">
          <form className=" bg-blue-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl mb-4 text-center text-white"><span className='bg-yellow-500 px-2 py-2 rounded-lg'>Login</span></h2>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
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
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
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
                className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${userType === 'admin' && 'opacity-50'}`}
                type="button"
                onClick={() => setUserType('admin')}
                disabled={userType === 'admin'}
              >
                Admin
              </button>
              <button
                className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${userType === 'teacher' && 'opacity-50'}`}
                type="button"
                onClick={() => setUserType('teacher')}
                disabled={userType === 'teacher'}
              >
                Teacher
              </button>
              <button
                className={`bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${userType === 'student' && 'opacity-50'}`}
                type="button"
                onClick={() => setUserType('student')}
                disabled={userType === 'student'}
              >
                Student
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
