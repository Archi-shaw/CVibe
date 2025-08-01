import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContex'
import { useNavigate } from 'react-router-dom';

const ProfilInfoCard = () => {
    const {user, clearUser} =  useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/');
    }
    
  return (
    <div className='flex items-center '>
     <img 
  src={user?.profileImageUrl} // fallback image path if missing
  alt="Profile Image"
  className='w-11 h-11 bg-gray-300 rounded-full mr-3'
      />

      <div>
        <div className='text-[15px] font-bold leading-3'> {user?.name || " "} </div>
        <button 
        className='text-purple-500 text-sm font-semibold cursor-pointer hover:underline'
        onClick={handleLogout}>
            Logout
        </button>
      </div>
    </div>
  )
}

export default ProfilInfoCard;


// import React, { useContext, useState } from 'react'
// import { UserContext } from '../../context/UserContex'
// import { useNavigate } from 'react-router-dom';

// const ProfileInfoCard = () => {
//     const {user, clearUser} = useContext(UserContext);
//     const navigate = useNavigate();
//     const [imageError, setImageError] = useState(false);
    
//     const handleLogout = () => {
//         try {
//             localStorage.clear();
//             clearUser();
//             navigate('/');
//         } catch (error) {
//             console.error('Logout error:', error);
//             // Still try to navigate even if there's an error
//             navigate('/');
//         }
//     }
    
//     const handleImageError = () => {
//         setImageError(true);
//         console.error('Failed to load profile image:', user?.profileImageUrl);
//     };
    
//     // Don't render if user is null/undefined
//     if (!user) {
//         return (
//             <div className='flex items-center'>
//                 <div className='w-11 h-11 bg-gray-300 rounded-full mr-3 flex items-center justify-center'>
//                     <span className='text-gray-500 text-xs'>No User</span>
//                 </div>
//                 <div>
//                     <div className='text-[15px] font-bold leading-3'>Guest</div>
//                     <button 
//                         className='text-purple-500 text-sm font-semibold cursor-pointer hover:underline'
//                         onClick={handleLogout}>
//                         Logout
//                     </button>
//                 </div>
//             </div>
//         );
//     }
    
//     return (
//         <div className='flex items-center'>
//            {user.profileinfo?.profilePreviewUrl && !imageError ? (
//              <img 
//             src={user.profileinfo.profilePreviewUrl}
//                     alt="Profile Image"
//                     className='w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover'
//                     onError={handleImageError}
//                 />
//             ) : (
//                 <div className='w-11 h-11 bg-gray-300 rounded-full mr-3 flex items-center justify-center'>
//                     <span className='text-gray-500 text-xs'>
//                         {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
//                     </span>
//                 </div>
//             )}

//             <div>
//                 <div className='text-[15px] font-bold leading-3'>
//                     {user.name || "Unknown User"}
//                 </div>
//                 <button 
//                     className='text-purple-500 text-sm font-semibold cursor-pointer hover:underline'
//                     onClick={handleLogout}>
//                     Logout
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default ProfileInfoCard;