// // import React from 'react'
// // import { createContext, useState, useEffect } from 'react'
// // import axiosInstance from '../components/utils/axiosInstance'
// // import { API_PATHS } from '../components/utils/apiPaths'

// // export const UserContext = createContext();


// // const UserProvider = ({children}) => {
// //   const [user,setUser] =  useState(null);
// //   const [loading,setLoading] = useState(true);  // State for tracking loading

// //   useEffect(() => {
// //     if(user) return;
// //     const accesToken = localStorage.getItem("token");
// //     if(!accesToken){
// //       setLoading(false);
// //       return;
// //     }
// //     const fetchuser = async() => {
// //         try{
// //           const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
// //            setUser(response.data);
// //         }
// //         catch(error){
// //           console.error(" User not autenificated" , error);
// //           clearUser();
// //         }
// //         finally{
// //           setLoading(false);
// //         }
// //     };
// //     fetchuser();
// //   }, []);

// //   const updateuser = (userData) => {
// //     setUser(userData);
// //     localStorage.setItem("token", userData.token);
// //     setLoading(false);
// //   }


// //   const clearUser = () => {
// //     setUser(null);
// //     localStorage.removeItem("token");

// //   }


// //   return (
// //   <UserContext.Provider value={{ user, loading, updateuser, clearUser }}>
// //     {children}
// //   </UserContext.Provider>
// //   )
// // }

// // export default UserProvider;


// import React, { createContext, useState, useEffect } from 'react';
// import axiosInstance from '../components/utils/axiosInstance';
// import { API_PATHS } from '../components/utils/apiPaths';

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setLoading(false);
//       return;
//     }
//     try {
//       const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.error('User not authenticated', error);
//       clearUser();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch user profile on mount
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const updateuser = async (userData) => {
//     const token = userData.token;
//     localStorage.setItem('token', token);
//     await fetchUser(); // ✅ Now this works fine
//   };

//   const clearUser = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <UserContext.Provider value={{ user, loading, updateuser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;

import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../components/utils/axiosInstance';
import { API_PATHS } from '../components/utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // ✅ Fixed: Use 'response' instead of 'res'
      console.log('User profile response:', response.data);
      setUser(response.data);
      
    } catch (error) {
      console.error('User not authenticated', error);
      // Check if it's a 404 error specifically
      if (error.response?.status === 404) {
        console.error('Profile endpoint not found. Check your backend routes.');
      }
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile on mount
  useEffect(() => {
    fetchUser();
  }, []);

  const updateuser = async (userData) => {
    const token = userData.token;
    localStorage.setItem('token', token);
    
    // Set user data immediately if available
    if (userData.user) {
      setUser(userData.user);
    }
    
    // Then fetch fresh profile data
    await fetchUser();
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Helper function to update profile picture
  const updateProfilePicture = (imageUrl) => {
    setUser(prev => ({
      ...prev,
      profileinfo: {
        ...prev?.profileinfo,
        profilePreviewUrl: imageUrl,
      },
    }));
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      loading, 
      updateuser, 
      clearUser, 
      fetchUser,
      updateProfilePicture 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;