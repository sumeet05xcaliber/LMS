import React from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../assets/company_logo.jpg';

function Home_admin() {
  return (
    <div>
      <header className="w-full bg-gradient-to-r from-blue-800 to-blue-400 p-4 flex">
      <div className="container mx-auto flex items-center">
        <img src={companyLogo} alt="Company Logo" className="h-8 w-8 mr-2" />
        <h1 className="text-white text-xl font-bold">Learn-Mate</h1>
      </div>
      <div className="mt-6 text-center">
        <Link to="/" className="bg-yellow-500 text-white py-2 px-2 rounded">
          Logout
        </Link>
      </div>
    </header>
    <div className="max-w-7xl mx-auto bg-gray-200 shadow-md rounded-lg p-6">
  <p className="text-center text-gray-700">
    As an administrator, you play a crucial role in managing various aspects of the system. Admins have the authority to create, assign, and manage students, teachers, courses, and other resources. They ensure the smooth functioning of the learning management system and address any issues that may arise. With great power comes great responsibility, and admins are entrusted with maintaining the integrity and efficiency of the educational platform.
  </p>
</div>
    <div className="text-center mb-6">
  <div className="border border-blue-500 text-blue-500 bg-blue-100 py-3 px-3 rounded mb-4 inline-block mt-8">
    Admin Options
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
    <Link
      to="/bulk_create_students"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block  "
    >
      Bulk Create Students
    </Link>
    <Link
      to="/bulk_create_teachers"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block"
    >
      Bulk Create Teachers
    </Link>
    <Link
      to="/bulk_assign_students"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block"
    >
      Bulk Assign Students
    </Link>
    <Link
      to="/bulk_assign_teachers"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block"
    >
      Bulk Assign Teachers
    </Link>
    <Link
      to="/bulk_deassign_students"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block"
    >
      Bulk Deassign Students
    </Link>
    <Link
      to="/bulk_deassign_teachers"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block"
    >
      Bulk Deassign Teachers
    </Link>
    <Link
      to="/course_management"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block"
    >
      Course Management
    </Link>
    <Link
      to="/view-all-students-admin"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block"
    >
      View students info
    </Link>
    <Link
      to="/view-all-teachers-admin"
      className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-6 px-6 rounded inline-block"
View>
      View Teacher info
    </Link>
  </div>
</div>


    </div>
  )
}

export default Home_admin