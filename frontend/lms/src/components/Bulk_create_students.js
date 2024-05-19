import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/company_logo.jpg';

function Bulk_create_students() {
  const [numStudents, setNumStudents] = useState(0);
  const [studentsData, setStudentsData] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleNumStudentsChange = (e) => {
    const num = Number(e.target.value);
    setNumStudents(num);
    setStudentsData(Array.from({ length: num }, () => ({
      name: '',
      father: '',
      contact: '',
      email: '',
      password: '',
      grade: '',
      dob: '',
      schoolName: '',
      schoolUniqueId: '',
      city: ''
    })));
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setStudentsData(prevState => {
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
      const response = await axios.post('http://localhost:5000/admin/bulk-upload-students', { students: studentsData });
      setSuccess(response.data.message);
      setError('');
      alert('Students uploaded successfully');
      // Redirect to home page
      document.getElementById('redirect-link').click();
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error uploading students');
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
    <h1 className="text-2xl font-bold mb-4 text-center">Bulk Upload Students</h1>
    <div className="mb-6">
      <label className="block mb-2 text-center">
        Number of Students to Create:
        <input
          type="number"
          value={numStudents}
          onChange={handleNumStudentsChange}
          className="border p-2 rounded"
          min="1"
        />
      </label>
    </div>

    {studentsData.length > 0 && (
      <form onSubmit={handleSubmit}>
        {studentsData.map((student, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-200 shadow-md rounded">
            <h2 className="text-xl font-bold mb-4 text-center bg-black text-white w-auto">Student {index + 1}</h2>
            <div className="mb-4">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={student.name}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Father's Name:
                <input
                  type="text"
                  name="father"
                  value={student.father}
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
                  value={student.contact}
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
                  value={student.email}
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
                  value={student.password}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Grade:
                <input
                  type="text"
                  name="grade"
                  value={student.grade}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border p-2 rounded w-full"
                  required
                />
              </label>
              <label className="block mb-2">
                Date of Birth:
                <input
                  type="date"
                  name="dob"
                  value={student.dob}
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
                  value={student.schoolName}
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
                  value={student.schoolUniqueId}
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
                  value={student.city}
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

export default Bulk_create_students;
