import React from 'react'
import {Link} from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfilInfoCard';


const Navbar = () => {
  return (
    <div className='h-16 border-white border-b border-gary-200/50 backdrop-blur-2px py-2.5 px-4 md:px-0 sticky top-2 z-30'>
      <div className='container  mx-auto flex justify-between items-center gap-5'>
        <Link to='/' >
          <h2 className='text-lg md:text-xl font-bold text-black leading-5'> 
            CVibe
          </h2>
        </Link>
    <ProfileInfoCard />
      </div>
    </div>
  )
}

export default Navbar
