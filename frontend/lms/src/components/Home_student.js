import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/company_logo.jpg';
function Home_student() {
  const [courses, setCourses] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem('userId');

        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        // Fetch courses
        const coursesResponse = await axios.get(`http://localhost:5000/student/courses/${userId}`);
        setCourses(coursesResponse.data.courses);

        // Fetch student info
        const infoResponse = await axios.get(`http://localhost:5000/student/info/${userId}`);
        setStudentInfo(infoResponse.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <header className="w-full bg-gradient-to-r from-blue-800 to-blue-400 p-4 flex">
      <div className="container mx-auto flex items-center">
        <img src={companyLogo} alt="Company Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-white text-xl font-bold">Learn-Mate</h1>
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="bg-yellow-500 text-white py-2 px-2 rounded">
          Logout
        </Link>
      </div>
    </header>
    <div className="container mx-auto py-6">
      
      
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="px-6 py-4">
    <h1 className="text-2xl font-bold mb-4 text-center">Student Information</h1>
    <div className="mb-6 p-4 bg-gray-50 rounded">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p><strong className="text-gray-700">Name:</strong> <span className="text-gray-900">{studentInfo.name}</span></p>
        </div>
        <div>
          <p><strong className="text-gray-700">Father's Name:</strong> <span className="text-gray-900">{studentInfo.father}</span></p>
        </div>
        <div>
          <p><strong className="text-gray-700">Contact:</strong> <span className="text-gray-900">{studentInfo.contact}</span></p>
        </div>
        <div>
          <p><strong className="text-gray-700">Email:</strong> <span className="text-gray-900">{studentInfo.email}</span></p>
        </div>
        <div>
          <p><strong className="text-gray-700">Academic Year:</strong> <span className="text-gray-900">{studentInfo.academicYear}</span></p>
        </div>
        <div>
          <p><strong className="text-gray-700">Date of Birth:</strong> <span className="text-gray-900">{studentInfo.dob}</span></p>
        </div>
        <div>
          <p><strong className="text-gray-700">School Name:</strong> <span className="text-gray-900">{studentInfo.schoolName}</span></p>
        </div>
        <div>
          <p><strong className="text-gray-700">Student ID:</strong> <span className="text-gray-900">{studentInfo.studentId}</span></p>
        </div>
        <div>
          <p><strong className="text-gray-700">City:</strong> <span className="text-gray-900">{studentInfo.city}</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
<br></br>

<div className="container mx-auto">
  <h1 className="text-2xl font-bold mb-4 text-center">My Courses</h1>
  <div className="flex flex-wrap justify-center">
    {courses.length === 0 ? (
      <div>No courses found.</div>
    ) : (
      courses.map(course => (
        <div key={course._id} className="mb-6 mr-6 p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-2">{course.title}</h2>
          <p className="mb-4">{course.description}</p>
          <h3 className="text-lg font-semibold">Chapters</h3>
          <ul className="list-disc ml-6">
            {course.chapters.map(chapter => (
              <li key={chapter._id} className="mb-2">
                <h4 className="text-md font-semibold">{chapter.title}</h4>
                <ul className="list-decimal ml-4">
                  {chapter.lessons.map(lesson => (
                    <li key={lesson._id}>
                      <span>{lesson.content}</span>
                      <br />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))
    )}
  </div>
</div>

    </div>
      </>
  );
}

export default Home_student;
