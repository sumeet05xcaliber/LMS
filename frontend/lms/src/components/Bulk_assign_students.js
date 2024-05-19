import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/company_logo.jpg';

function Bulk_assign_students() {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCourseData, setSelectedCourseData] = useState(null);

    useEffect(() => {
        // Fetch courses and students data from backend
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/get-all-courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/view-all-students');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchCourses();
        fetchStudents();
    }, []);

    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
        const courseData = courses.find(course => course._id === event.target.value);
        setSelectedCourseData(courseData);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/admin/bulk-assign-students', {
                courseId: selectedCourse,
                studentIds: selectedStudents,
            });
            alert("Students assigned successfully");

            setSuccessMessage(response.data.message);
            setErrorMessage('');
            window.location.href='/home-admin'
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
    <h2 className="text-2xl font-bold mb-4 text-center">Bulk Assign Courses</h2>
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
  <label className="block mb-2 font-bold">Select Students:</label>
  <div className="text-left">
    {students.map((student) => (
      <div key={student._id} className="border p-2 rounded mb-2 bg-gray-100 flex items-center justify-between">
        <div>
          <input
            type="checkbox"
            id={student._id}
            value={student._id}
            onChange={handleStudentChange}
            checked={selectedStudents.includes(student._id)}
            className="mr-2"
          />
          <label htmlFor={student._id} className="font-bold"></label>
        </div>
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

export default Bulk_assign_students;
