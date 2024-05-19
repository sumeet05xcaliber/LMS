import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Bulk_deassign_teachers() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courseData, setCourseData] = useState(null);
    const [selectedTeachers, setSelectedTeachers] = useState([]);
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

    const handleDeassign = async () => {
        try {
            const response = await axios.post('http://localhost:5000/admin/bulk-deassign-teachers', {
                courseId: selectedCourse,
                teacherIds: selectedTeachers,
            });
            alert("Teachers deassigned successfully");
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            window.location.href = '/home-admin'; 
        } catch (error) {
            console.error('Error deassigning teachers:', error);
            setErrorMessage(error.response ? error.response.data.error : 'Error deassigning teachers');
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
            <h2>Bulk Deassign Teachers</h2>
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
                    {courseData.teachers.length > 0 ? (
                        <div>
                            <h4>Teachers:</h4>
                            {courseData.teachers.map((teacher) => (
                                <div key={teacher._id}>
                                    <input
                                        type="checkbox"
                                        id={teacher._id}
                                        value={teacher._id}
                                        onChange={handleTeacherChange}
                                        checked={selectedTeachers.includes(teacher._id)}
                                    />
                                    <label htmlFor={teacher._id}>{teacher.name}</label>
                                    <span>Email: {teacher.email}</span>
                                    <span>School Name: {teacher.schoolName}</span>
                                </div>
                            ))}
                            <button onClick={handleDeassign}>Deassign Teachers</button>
                        </div>
                    ) : (
                        <div>No teachers assigned to this course.</div>
                    )}
                </div>
            )}
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default Bulk_deassign_teachers;
