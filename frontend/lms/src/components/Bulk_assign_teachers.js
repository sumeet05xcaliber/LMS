import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
            <div className="mt-6 text-center">
        <Link to="/home-admin" className="bg-blue-500 text-white py-2 px-4 rounded">
          Home
        </Link>
      </div>
            <h2>Bulk Assign Teachers</h2>
            
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
                    <label>Select Teachers:</label>
                    {teachers.map((teacher) => (
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

export default Bulk_assign_teachers;
