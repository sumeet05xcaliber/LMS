import React from 'react'
import { Link } from 'react-router-dom'
function Home_admin() {
  return (
    <div>Home_admin
      <div className="mb-6 text-center ">
        <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded">
          Logout
        </Link>
        <Link to="/bulk_create_students" className="bg-blue-500 text-white py-2 px-4 rounded">
          Bulk Create Students
        </Link>
        <Link to="/bulk_create_teachers" className="bg-blue-500 text-white py-2 px-4 rounded">
          Bulk Create Teachers
        </Link>

        <Link to="/bulk_assign_students" className="bg-blue-500 text-white py-2 px-4 rounded">
          Bulk Assign Students
        </Link>
        <Link to="/bulk_assign_teachers" className="bg-blue-500 text-white py-2 px-4 rounded">
          Bulk Assign Teachers
        </Link>
        <Link to="/bulk_deassign_students" className="bg-blue-500 text-white py-2 px-4 rounded">
          Bulk Deassign Students
        </Link>
        <Link to="/bulk_deassign_teachers" className="bg-blue-500 text-white py-2 px-4 rounded">
          Bulk Deassign Teachers
        </Link>
        <Link to="/course_management" className="bg-blue-500 text-white py-2 px-4 rounded">
          Course Management
        </Link>
        <br></br>
        <Link to="/view-all-students-admin" className="bg-blue-500 text-white py-2 px-4 rounded ">
          View students info
        </Link>
        <Link to='/view-all-teachers-admin' className="bg-blue-500 text-white py-2 px-4 rounded">
          View Teacher info
        </Link>
        
      </div>
    </div>
  )
}

export default Home_admin