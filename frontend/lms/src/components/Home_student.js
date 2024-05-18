import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Student Information</h1>
      <div className="mb-6 p-4 bg-white shadow-md rounded">
        <p><strong>Name:</strong> {studentInfo.name}</p>
        <p><strong>Father's Name:</strong> {studentInfo.father}</p>
        <p><strong>Contact:</strong> {studentInfo.contact}</p>
        <p><strong>Email:</strong> {studentInfo.email}</p>
        <p><strong>academicYear:</strong> {studentInfo.academicYear}</p>
        <p><strong>dob:</strong> {studentInfo.dob}</p>
        <p><strong>schoolName:</strong> {studentInfo.schoolName}</p>
        <p><strong>studentId:</strong> {studentInfo.studentId}</p>
        <p><strong>city:</strong> {studentInfo.city}</p>

        

        

        {/* Add any other fields you need to display */}
      </div>

      <h1 className="text-2xl font-bold mb-4">My Courses</h1>
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
    </div>
  );
}

export default Home_student;
