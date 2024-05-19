import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewAllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/teacher/view-all-students');
        setStudents(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <Link 
        to="/home-teacher"
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded inline-block"
      >
        Back to Home
      </Link>
      
      <h1 className="text-2xl font-bold mb-4">All Students</h1>
      {students.length === 0 ? (
        <div>No students found.</div>
      ) : (
        students.map(student => (
          <div key={student._id} className="mb-6 p-4 bg-white shadow-md rounded">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Father's Name:</strong> {student.father}</p>
            <p><strong>Contact:</strong> {student.contact}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Grade:</strong> {student.grade}</p>
            <p><strong>Academic Year:</strong> {student.academicYear}</p>
            <p><strong>Student ID:</strong> {student.uniqueStudentId}</p>
            <p><strong>School Name:</strong> {student.schoolName}</p>
            <p><strong>City:</strong> {student.city}</p>
            <h3 className="text-lg font-semibold">Courses</h3>
            {student.courses.length === 0 ? (
              <div>No courses assigned.</div>
            ) : (
              student.courses.map(course => (
                <div key={course.courseId} className="mb-4">
                  <h4 className="text-md font-bold">{course.title}</h4>
                  <p>{course.description}</p>
                  <ul className="list-disc ml-6">
                    {course.chapters.map(chapter => (
                      <li key={chapter.chapterId}>
                        <h5 className="text-md font-semibold">{chapter.title}</h5>
                        <ul className="list-decimal ml-4">
                          {chapter.lessons.map(lesson => (
                            <li key={lesson.lessonId}>
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
        ))
      )}
    </div>
  );
}

export default ViewAllStudents;
