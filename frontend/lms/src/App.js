import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home_admin from './components/Home_admin';
import Home_student from './components/Home_student';
import Home_teacher from './components/Home_teacher';
import Login from "./components/Login";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path='/home-student' element={<Home_student></Home_student>}></Route>
        <Route path='/home-admin' element={<Home_admin></Home_admin>}></Route>
        <Route path='/home-teacher' element={<Home_teacher></Home_teacher>}></Route>
      </Routes>
        <Footer></Footer>
    </Router>
  );
}

export default App;
