import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/company_logo.jpg';

function Bulk_create_teachers() {
  const [numTeachers, setNumTeachers] = useState(0);
  const [teachersData, setTeachersData] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleNumTeachersChange = (e) => {
    const num = Number(e.target.value);
    setNumTeachers(num);
    setTeachersData(Array.from({ length: num }, () => ({
      name: '',
      contact: '',
      email: '',
      password: '',
      schoolName: '',
      schoolUniqueId: '',
      city: ''
    })));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setTeachersData(prevState => {
      const newState = [...prevState];
      newState[index] = {
        ...newState[index],
        [name]: value,
      };
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/bulk-create-teachers', { teachers: teachersData });
      setSuccess(response.data.message);
      setError('');
      alert('Teachers created successfully');
      // Redirect to home page
      document.getElementById('redirect-link').click();
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error creating teachers');
      setSuccess('');
    }
  };

  return (
    <>
    <header className="w-full bg-gradient-to-r from-blue-800 to-blue-400 p-4 flex">
      <div className="container mx-auto flex items-center">
        <img src={companyLogo} alt="Company Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-white text-xl font-bold">Learn-Mate</h1>
      </div>
      <div className="mt-6 text-center">
        <Link to="/home-admin" className="bg-yellow-500 text-white py-2 px-2 rounded">
          Home
        </Link>
      </div>
    </header>
    <div className="container mx-auto py-6">
  <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
    <h1 className="text-2xl font-bold mb-4 text-center">Bulk Create Teachers</h1>
    <div className="mb-6">
      <label className="block mb-2">
        Number of Teachers to Create:
        <input
          type="number"
          value={numTeachers}
          onChange={handleNumTeachersChange}
          className="border p-2 rounded w-full"
          min="1"
        />
      </label>
    </div>

    {teachersData.length > 0 && (
      <form onSubmit={handleSubmit}>
        {teachersData.map((teacher, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-200 shadow-md rounded">
            <h2 className="text-xl font-bold mb-4 text-center bg-black text-white w-auto">Teacher {index + 1}</h2>
            <div className="mb-4">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={teacher.name}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Contact:
                <input
                  type="text"
                  name="contact"
                  value={teacher.contact}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={teacher.email}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Password:
                <input
                  type="password"
                  name="password"
                  value={teacher.password}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                School Name:
                <input
                  type="text"
                  name="schoolName"
                  value={teacher.schoolName}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                School Unique ID:
                <input
                  type="text"
                  name="schoolUniqueId"
                  value={teacher.schoolUniqueId}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                City:
                <input
                  type="text"
                  name="city"
                  value={teacher.city}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </form>
    )}

    <Link id="redirect-link" to="/home-admin" className="hidden" />
    {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
    {success && <div className="text-green-500 mt-4 text-center">{success}</div>}
  </div>
</div>


          </>
  );
}

export default Bulk_create_teachers;
