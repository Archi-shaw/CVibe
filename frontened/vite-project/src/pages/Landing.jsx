import React, { useContext, useState } from 'react';
import hero_bg from '../assets/hero_bg.png';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup'
import { UserContext } from '../context/UserContex';
import ProfilInfoCard  from '../components/Cards/ProfilInfoCard';

const Landing = () => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  const [openAuthModel, setopenAuthModel] = useState(false);
  const [currentPage, setcurrentPage] = useState("login");

   const handleCTA = () => {
    if(!user){
      setopenAuthModel(true);
    }
    else{
      navigate('/dashboard');
    }
   }

  return (
    <div className='w-full min-h-screen bg-white'>
      <div className='container mx-auto px-4 py-6'>
        <header className='flex justify-between items-center mb-16'>
          <div className='text-xl font-bold'>CVibe</div>
         { user?  <ProfilInfoCard /> : <button
            className='bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer'
            onClick={() => setopenAuthModel(true)}
          >
            Login/SignUp
          </button> }
        </header>

        <div className='flex flex-col md:flex-row items-center'>
          <div className='w-full md:w-1/2 pr-4 mb-8 md:mb-0'>
            <h1 className='text-5xl font-bold mb-6 leading-tight'>
              Build Your{" "}
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,#3cff52_100%)] bg-[length:200%_200%] animate-text-shine'>
                Resume Effortlessly
              </span>
            </h1>
            <p className='text-lg text-gray-700 mb-8'>
              Craft a Resume in minutes with our smart and intuitive resume builder.
            </p>
            <button
              className='bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer'
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
          <div className='w-full md:w-1/2'>
            <img src={hero_bg} alt="Hero" className='w-full rounded-lg' />
          </div>
        </div>

        <section className='mt-5'>
          <h2 className='text-2xl font-bold text-center mb-12'>
            Features That Make You Shine!
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>Easy Editing</h3>
              <p className='text-gray-600'>Live preview and instant formatting</p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>Beautiful Templates</h3>
              <p className='text-gray-600'>Modern, professional, and customizable</p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>One-click Export</h3>
              <p className='text-gray-600'>Download as high-quality PDF</p>
            </div>
          </div>
        </section>

        <div className='text-sm text-secondary text-center p-5 mt-5'>
          Made by Archi.....Happy Coding! 😊
        </div>
      </div>


      {openAuthModel && (
        <div className='fixed inset-0 bg-gray-100/70 backdrop-blur-sm flex justify-center items-center z-50'>
        <div className='bg-white p-6 rounded-md shadow-md  relative max-w-md w-full'  >
          <button 
          onClick={() => setopenAuthModel(false)}
          className='absolute top-2 right-4 text-xl font-bold'>
             &times;
          </button>
        { currentPage === "login" && <Login setcurrentPage={setcurrentPage} />}
        { currentPage === "signup" && <Signup setcurrentPage={setcurrentPage} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
