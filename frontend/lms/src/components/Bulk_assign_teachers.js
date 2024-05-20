import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/company_logo.jpg';

function Bulk_assign_teachers() {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCourseData, setSelectedCourseData] = useState(null);

    useEffect(() => {
        // Fetch courses and teachers data from backend
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/get-all-courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/view-all-teachers');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchCourses();
        fetchTeachers();
    }, []);

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
        const courseData = courses.find(course => course._id === event.target.value);
        setSelectedCourseData(courseData);
    };

    const handleTeacherChange = (event) => {
        const teacherId = event.target.value;
        setSelectedTeachers((prevSelectedTeachers) => {
            if (prevSelectedTeachers.includes(teacherId)) {
                return prevSelectedTeachers.filter((id) => id !== teacherId);
            } else {
                return [...prevSelectedTeachers, teacherId];
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin/bulk-assign-teachers', {
                courseId: selectedCourse,
                teacherIds: selectedTeachers,
            });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            // Show success alert
            alert('Teachers assigned successfully');
            // Redirect to home page after 2 seconds
            window.location.href = '/home-admin';
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.error : 'Error assigning courses');
            setSuccessMessage('');
        }
    };

    return (
        <div>
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
  <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4 text-center">Bulk Assign Teachers</h2>
    <form onSubmit={handleSubmit} className="text-center">
      <div className="mb-4">
        <label htmlFor="course" className="block mb-2">
          Select Course:
        </label>
        <select
          id="course"
          onChange={handleCourseChange}
          value={selectedCourse}
          className="border p-2 rounded w-full"
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
      {selectedCourseData && (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-4">
          <h3 className="text-xl font-bold mb-4">{selectedCourseData.title}</h3>
          <p>{selectedCourseData.description}</p>
          <h4 className="mt-4">Chapters:</h4>
          <ul>
            {selectedCourseData.chapters.map((chapter) => (
              <li key={chapter._id} className="mt-2">
                <h5 className="font-bold">{chapter.title}</h5>
                <ul>
                  {chapter.lessons.map((lesson) => (
                    <li key={lesson._id} className="ml-4">
                      {lesson.content}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2 font-bold">Select Teachers:</label>
        <div className="text-left">
          {teachers.map((teacher) => (
            <div key={teacher._id} className="border p-2 rounded mb-2 bg-gray-100 flex">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id={teacher._id}
                  value={teacher._id}
                  onChange={handleTeacherChange}
                  checked={selectedTeachers.includes(teacher._id)}
                  className="mr-2 mt-1"
                />
              </div>
              <div>
                <p><span className="font-bold">Name:</span> {teacher.name}</p>
                <p><span className="font-bold">Email:</span> {teacher.email}</p>
                <p><span className="font-bold">School Name:</span> {teacher.schoolName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Assign Courses
      </button>
    </form>
    {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
    {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
  </div>
</div>


        </div>
    );
}

export default Bulk_assign_teachers;
