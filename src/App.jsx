import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Login from "../src/pages/Auth/Login";
import Landing from "../src/pages/Landing"
import Signup from './pages/Auth/Signup';
import Dashboard from '../src/pages/Home/Dashboard';
import ResumeEdit from '../src/pages/ResumeUpdate/ResumeEdit'

const App = () => {
  return (
    <>
    <div >
      <Router>
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
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
    </>
  )
}

export default App
