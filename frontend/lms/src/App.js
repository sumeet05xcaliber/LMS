import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Bulk_assign_students from './components/Bulk_assign_students';
import Bulk_assign_teachers from './components/Bulk_assign_teachers';
import Bulk_create_students from './components/Bulk_create_students';
import Bulk_create_teachers from './components/Bulk_create_teacher';
import Bulk_deassign_students from './components/Bulk_deassign_students';
import Bulk_deassign_teachers from './components/Bulk_deassign_teachers';
import Course_Management from './components/Course_Management';
import Footer from './components/Footer';
import Home_admin from './components/Home_admin';
import Home_student from './components/Home_student';
import Home_teacher from './components/Home_teacher';
import Login from "./components/Login";
import ViewAllStudents from './components/ViewAllStudents';
import View_students_admin from './components/View_students_admin';
import View_teachers_admin from './components/View_teachers_admin';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path='/home-student' element={<Home_student></Home_student>}></Route>
        <Route path='/home-admin' element={<Home_admin></Home_admin>}></Route>
        <Route path='/home-teacher' element={<Home_teacher></Home_teacher>}></Route>
        <Route path='/view-all-students' element={<ViewAllStudents></ViewAllStudents>}></Route>
        <Route path='/view-all-students-admin' element={<View_students_admin></View_students_admin>}></Route>
        <Route path="/view-all-teachers-admin" element={<View_teachers_admin></View_teachers_admin>}></Route>

        <Route path='/bulk_create_students' element={<Bulk_create_students></Bulk_create_students>}></Route>
        <Route path='/bulk_create_teachers' element={<Bulk_create_teachers></Bulk_create_teachers>}></Route>
        <Route path='/bulk_assign_students' element={<Bulk_assign_students></Bulk_assign_students>}></Route>
        <Route path='/bulk_assign_teachers' element={<Bulk_assign_teachers></Bulk_assign_teachers>}></Route>
        <Route path='/bulk_deassign_students' element={<Bulk_deassign_students></Bulk_deassign_students>}></Route>
        <Route path='/bulk_deassign_teachers' element={<Bulk_deassign_teachers></Bulk_deassign_teachers>}></Route>
        <Route path='/course_management' element={<Course_Management></Course_Management>}></Route>



        
      </Routes>
        <Footer></Footer>
    </Router>
  );
}

export default App;
