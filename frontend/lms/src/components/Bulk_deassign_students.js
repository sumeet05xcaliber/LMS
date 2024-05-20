import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/company_logo.jpg';

function Bulk_deassign_students() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseData, setCourseData] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/get-all-courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseChange = async (event) => {
        const courseId = event.target.value;
        setSelectedCourse(courseId);
        const course = courses.find(course => course._id === courseId);
        setCourseData(course);
    };

    const handleStudentChange = (event) => {
        const studentId = event.target.value;
        setSelectedStudents((prevSelectedStudents) => {
            if (prevSelectedStudents.includes(studentId)) {
                return prevSelectedStudents.filter((id) => id !== studentId);
            } else {
                return [...prevSelectedStudents, studentId];
            }
        });
    };

    const handleDeassign = async () => {
        try {
            const response = await axios.post('http://localhost:5000/admin/bulk-deassign-students', {
                courseId: selectedCourse,
                studentIds: selectedStudents,
            });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            alert("Students deassigned from the course successfully");
            window.location.href='/home-admin';
            
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.error : 'Error deassigning students');
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
    <h2 className="text-2xl font-bold mb-4 text-center">Bulk Deassign Students</h2>
    <div className="text-center">
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
      {courseData && (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mb-4">
          <h3 className="text-xl font-bold mb-4">{courseData.title}</h3>
          <p>{courseData.description}</p>
          <h4 className="mt-4 font-bold">Chapters:</h4>
          <ul>
            {courseData.chapters.map((chapter) => (
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
          {courseData.students.length > 0 ? (
            <div className="mt-4">
              <h4 className="font-bold">Students:</h4>
              <div className="text-left">
                {courseData.students.map((student) => (
                  <div key={student._id} className="border p-2 rounded mb-2 bg-gray-100 flex items-start">
                    <input
                      type="checkbox"
                      id={student._id}
                      value={student._id}
                      onChange={handleStudentChange}
                      checked={selectedStudents.includes(student._id)}
                      className="mr-2 mt-1"
                    />
                    <div>
                      <p><span className="font-bold">Name:</span> {student.name}</p>
                      <p><span className="font-bold">Email:</span> {student.email}</p>
                      <p><span className="font-bold">Grade:</span> {student.grade}</p>
                      <p><span className="font-bold">Unique ID:</span> {student.uniqueStudentId}</p>
                      <p><span className="font-bold">School Name:</span> {student.schoolName}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleDeassign} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
                Deassign Students
              </button>
            </div>
          ) : (
            <div className="mt-4 text-center border p-4 rounded bg-gray-300">
              No students assigned
            </div>
          )}
        </div>
      )}
    </div>
    {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
    {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
  </div>
</div>

        </div>
    );
}

export default Bulk_deassign_students;
