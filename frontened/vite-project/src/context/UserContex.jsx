import React from 'react'
import { createContext, useState, useEffect } from 'react'
import axiosInstance from '../components/utils/axiosInstance'
import { API_PATHS } from '../components/utils/apiPaths'

export const UserContext = createContext();


const UserProvider = ({children}) => {
  const [user,setUser] =  useState(null);
  const [loading,setLoading] = useState(true);  // State for tracking loading

  useEffect(() => {
    if(user) return;
    const accesToken = localStorage.getItem("token");
    if(!accesToken){
      setLoading(false);
      return;
    }
    const fetchuser = async() => {
        try{
          const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
           setUser(response.data);
        }
        catch(error){
          console.error(" User not autenificated" , error);
          clearUser();
        }
        finally{
          setLoading(false);
        }
    };
    fetchuser();
  }, []);

  const updateuser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  }


  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");

  }


  return (
  <UserContext.Provider value={{ user, loading, updateuser, clearUser }}>
    {children}
  </UserContext.Provider>
  )
}

export default UserProvider;

