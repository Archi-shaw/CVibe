import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Login from "../src/pages/Auth/Login";
import Landing from "../src/pages/Landing"
import Signup from './pages/Auth/Signup';
import Dashboard from '../src/pages/Home/Dashboard';
import ResumeEdit from '../src/pages/ResumeUpdate/ResumeEdit'
import UserProvider from './context/UserContex';

const App = () => {
  return (
    <UserProvider>
    <div >
      <Router>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login setcurrentPage={() => {}} />} />
            <Route path='/signup' element={<Signup setcurrentPage={() => {}} />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/resume/:resumeId' element={<ResumeEdit />} />
        </Routes>
      </Router>
    </div>
    <Toaster
        toastOptions= {{
            className: "",
            style: {
                fontSize: "15px",
            },
        }}
    />
    </UserProvider>
  )
}

export default App
