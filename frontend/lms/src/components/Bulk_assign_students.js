import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.error : 'Error assigning courses');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <div className="mt-6 text-center">
        <Link to="/home-admin" className="bg-blue-500 text-white py-2 px-4 rounded">
          Home
        </Link>
      </div>
            <h2>Bulk Assign Courses</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="course">Select Course:</label>
                    <select id="course" onChange={handleCourseChange} value={selectedCourse}>
                        <option value="">Select a course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Select Students:</label>
                    {students.map((student) => (
                        <div key={student._id}>
                            <input
                                type="checkbox"
                                id={student._id}
                                value={student._id}
                                onChange={handleStudentChange}
                                checked={selectedStudents.includes(student._id)}
                            />
                            <label htmlFor={student._id}>{student.name}</label>
                            <span>Email: {student.email}</span>
                            <span>Grade: {student.grade}</span>
                            <span>Unique ID: {student.uniqueStudentId}</span>
                            <span>School Name: {student.schoolName}</span>
                        </div>
                    ))}
                </div>
                <button type="submit">Assign Courses</button>
            </form>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
            {selectedCourseData && (
                <div>
                    <h3>{selectedCourseData.title}</h3>
                    <p>{selectedCourseData.description}</p>
                    <h4>Chapters:</h4>
                    <ul>
                        {selectedCourseData.chapters.map((chapter) => (
                            <li key={chapter._id}>
                                <h5>{chapter.title}</h5>
                                <ul>
                                    {chapter.lessons.map((lesson) => (
                                        <li key={lesson._id}>
                                            <strong>{lesson.title}</strong>: {lesson.content}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Bulk_assign_students;
