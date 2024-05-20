import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import companyLogo from '../assets/company_logo.jpg';

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
            <div className="container mx-auto py-6 flex justify-center">
  <div className="max-w-5xl w-full md:w-2/3">
    <h1 className="text-2xl font-bold mb-4 text-center">
      <span className='bg-gray-300 rounded-lg px-2 py-2'>
      All Teachers
        </span></h1>
    {teachers.length === 0 ? (
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 mb-6">No teachers found.</div>
    ) : (
      teachers.map((teacher) => (
        <div key={teacher._id} className="bg-white shadow-md rounded-lg overflow-hidden p-4 mb-6">
          <div className="bg-gray-200 rounded-lg p-4 mb-4">
            <p><strong className="text-gray-700">Name:</strong> <span className="text-gray-900">{teacher.name}</span></p>
            <p><strong className="text-gray-700">Contact:</strong> <span className="text-gray-900">{teacher.contact}</span></p>
            <p><strong className="text-gray-700">Email:</strong> <span className="text-gray-900">{teacher.email}</span></p>
            <p><strong className="text-gray-700">School Name:</strong> <span className="text-gray-900">{teacher.schoolName}</span></p>
            <p><strong className="text-gray-700">City:</strong> <span className="text-gray-900">{teacher.city}</span></p>
          </div>
          <h3 className="text-lg font-semibold">Courses</h3>
          {teacher.courses.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 mb-4">No courses assigned.</div>
          ) : (
            teacher.courses.map((course) => (
              <div key={course.courseId} className="mb-4">
                <h4 className="text-md font-bold">{course.title}</h4>
                <p>{course.description}</p>
                <ul className="list-disc ml-6">
                  {course.chapters.map((chapter) => (
                    <li key={chapter.chapterId} className="mt-2">
                      <h5 className="text-md font-semibold">{chapter.title}</h5>
                      <ul className="list-decimal ml-4">
                        {chapter.lessons.map((lesson) => (
                          <li key={lesson.lessonId} className="mt-1">
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
</div>

        </>
  );
}

export default View_teachers_admin;
