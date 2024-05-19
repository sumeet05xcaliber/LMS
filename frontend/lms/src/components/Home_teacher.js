import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home_teacher() {
  const [courses, setCourses] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem('userId');

        if (!userId) {
          throw new Error('User ID not found in local storage');
        }

        // Fetch courses
        const coursesResponse = await axios.get(`http://localhost:5000/teacher/courses/${userId}`);
        setCourses(coursesResponse.data.courses);

        // Fetch teacher info
        const infoResponse = await axios.get(`http://localhost:5000/teacher/info/${userId}`);
        setTeacherInfo(infoResponse.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mt-6 text-center">
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
          Logout
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Teacher Information</h1>
      <div className="mb-6 p-4 bg-white shadow-md rounded">
        <p><strong>Name:</strong> {teacherInfo.name}</p>
        <p><strong>Contact:</strong> {teacherInfo.contact}</p>
        <p><strong>Email:</strong> {teacherInfo.email}</p>
        <p><strong>School Name:</strong> {teacherInfo.schoolName}</p>
        <p><strong>School Unique ID:</strong> {teacherInfo.schoolUniqueId}</p>
        <p><strong>City:</strong> {teacherInfo.city}</p>
        {/* Add any other fields you need to display */}
      </div>

      <h1 className="text-2xl font-bold mb-4">Assigned Courses</h1>
      {courses.length === 0 ? (
        <div>No courses found.</div>
      ) : (
        courses.map(course => (
          <div key={course._id} className="mb-6 p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <p className="mb-2">{course.description}</p>
            <h3 className="text-lg font-semibold">Chapters</h3>
            <ul className="list-disc ml-6">
              {course.chapters.map(chapter => (
                <li key={chapter._id} className="mb-2">
                  <h4 className="text-md font-semibold">{chapter.title}</h4>
                  <ul className="list-decimal ml-4">
                    {chapter.lessons.map(lesson => (
                      <li key={lesson._id}>
                        <span>{lesson.title}</span>
                        <br />
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

      <div className="mt-6 text-center">
        <Link to="/view-all-students" className="bg-blue-500 text-white py-2 px-4 rounded">
          View All Students
        </Link>
      </div>
    </div>
  );
}

export default Home_teacher;
