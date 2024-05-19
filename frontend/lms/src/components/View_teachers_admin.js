import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function View_teachers_admin() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/view-all-teachers');
        setTeachers(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching teachers');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
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
        to="/home-admin"
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded inline-block"
      >
        Back to Home
      </Link>
      
      <h1 className="text-2xl font-bold mb-4">All Teachers</h1>
      {teachers.length === 0 ? (
        <div>No teachers found.</div>
      ) : (
        teachers.map(teacher => (
          <div key={teacher._id} className="mb-6 p-4 bg-white shadow-md rounded">
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Contact:</strong> {teacher.contact}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>School Name:</strong> {teacher.schoolName}</p>
            <p><strong>City:</strong> {teacher.city}</p>
            <h3 className="text-lg font-semibold">Courses</h3>
            {teacher.courses.length === 0 ? (
              <div>No courses assigned.</div>
            ) : (
              teacher.courses.map(course => (
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

export default View_teachers_admin;
