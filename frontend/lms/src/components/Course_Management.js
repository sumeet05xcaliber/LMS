import axios from 'axios';
import React, { useEffect, useState } from 'react';

function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({ title: '', description: '' });
    const [newChapter, setNewChapter] = useState({ courseId: '', title: '' });
    const [newLesson, setNewLesson] = useState({ chapterId: '', content: '' });

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

    const handleCourseChange = (event) => {
        setNewCourse({ ...newCourse, [event.target.name]: event.target.value });
    };

    const handleChapterChange = (event) => {
        setNewChapter({ ...newChapter, [event.target.name]: event.target.value });
    };

    const handleLessonChange = (event) => {
        setNewLesson({ ...newLesson, [event.target.name]: event.target.value });
    };

    const createCourse = async () => {
        try {
            const response = await axios.post('http://localhost:5000/admin/create-course', newCourse);
            setCourses([...courses, response.data.course]);
            setNewCourse({ title: '', description: '' });
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    const addChapter = async () => {
        try {
            const response = await axios.post('http://localhost:5000/admin/add-course-chapter', newChapter);
            const updatedCourses = courses.map(course => {
                if (course._id === newChapter.courseId) {
                    return { ...course, chapters: [...course.chapters, response.data.chapter] };
                }
                return course;
            });
            setCourses(updatedCourses);
            setNewChapter({ courseId: '', title: '' });
        } catch (error) {
            console.error('Error adding chapter:', error);
        }
    };

    const addLesson = async () => {
        try {
            const response = await axios.post('http://localhost:5000/admin/add-chapter-lesson', newLesson);
            const updatedCourses = courses.map(course => {
                const updatedChapters = course.chapters.map(chapter => {
                    if (chapter._id === newLesson.chapterId) {
                        return { ...chapter, lessons: [...chapter.lessons, response.data.lesson] };
                    }
                    return chapter;
                });
                return { ...course, chapters: updatedChapters };
            });
            setCourses(updatedCourses);
            setNewLesson({ chapterId: '', content: '' });
        } catch (error) {
            console.error('Error adding lesson:', error);
        }
    };

    return (
        <div>
            <div className="mt-6 text-center">
                <a href="/home-admin" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Home
                </a>
            </div>
            <h2>Course Management</h2>

            <div className="my-4">
                <h3 className="text-xl font-bold">Create New Course</h3>
                <div className="flex flex-col space-y-2">
                    <input
                        type="text"
                        name="title"
                        placeholder="Course Title"
                        value={newCourse.title}
                        onChange={handleCourseChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Course Description"
                        value={newCourse.description}
                        onChange={handleCourseChange}
                        className="border p-2 rounded"
                    />
                    <button onClick={createCourse} className="bg-green-500 text-white py-2 px-4 rounded">
                        Create Course
                    </button>
                </div>
            </div>

            <div className="my-4">
                <h3 className="text-xl font-bold">Create New Chapter</h3>
                <div className="flex flex-col space-y-2">
                    <select name="courseId" value={newChapter.courseId} onChange={handleChapterChange} className="border p-2 rounded">
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.title}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="title"
                        placeholder="Chapter Title"
                        value={newChapter.title}
                        onChange={handleChapterChange}
                        className="border p-2 rounded"
                    />
                    <button onClick={addChapter} className="bg-green-500 text-white py-2 px-4 rounded">
                        Add Chapter
                    </button>
                </div>
            </div>

            <div className="my-4">
                <h3 className="text-xl font-bold">Create New Lesson</h3>
                <div className="flex flex-col space-y-2">
                    <select name="chapterId" value={newLesson.chapterId} onChange={handleLessonChange} className="border p-2 rounded">
                        <option value="">Select Chapter</option>
                        {courses.flatMap(course => course.chapters).map((chapter) => (
                            <option key={chapter._id} value={chapter._id}>
                                {chapter.title}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="content"
                        placeholder="Lesson Content"
                        value={newLesson.content}
                        onChange={handleLessonChange}
                        className="border p-2 rounded"
                    />
                    <button onClick={addLesson} className="bg-green-500 text-white py-2 px-4 rounded">
                        Add Lesson
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold my-4">Existing Courses</h2>
                {courses.map(course => (
                    <div key={course._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <h3 className="text-xl font-bold">{course.title}</h3>
                        <p className="text-gray-700">{course.description}</p>
                        <h4 className="text-lg font-semibold mt-2">Chapters:</h4>
                        <ul className="list-disc ml-5">
                            {course.chapters.map(chapter => (
                                <li key={chapter._id} className="mt-2">
                                    <h5 className="font-semibold">{chapter.title}</h5>
                                    <ul className="list-decimal ml-5">
                                        {chapter.lessons.map(lesson => (
                                            <li key={lesson._id} className="mt-1">
                                                {lesson.content}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseManagement;
