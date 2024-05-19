import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            <div className="mt-6 text-center">
                <Link to="/home-admin" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Home
                </Link>
            </div>
            <h2>Bulk Deassign Students</h2>
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
            {courseData && (
                <div>
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <h4>Chapters:</h4>
                    <ul>
                        {courseData.chapters.map((chapter) => (
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
                    {courseData.students.length > 0 ? (
                        <div>
                            <h4>Students:</h4>
                            {courseData.students.map((student) => (
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
                            <button onClick={handleDeassign}>Deassign Students</button>
                        </div>
                    ) : (
                        <div>No students assigned</div>
                    )}
                </div>
            )}
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default Bulk_deassign_students;
