import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Input from "../../components/Inputs/Input"
import { validateEmail } from '../../components/utils/helper';
import { UserContext } from '../../context/UserContex';
import axiosInstance from '../../components/utils/axiosInstance';
import { API_PATHS } from '../../components/utils/apiPaths';

const Login = ({setcurrentPage}) => {
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [error,seterror] = useState("");

  const navigate = useNavigate();
  const {updateuser} = useContext(UserContext)

  //Handle Login Form submit
 const handleLogin = async(e) => {
  e.preventDefault();
  if(!validateEmail(email)){
     seterror('PLease enter a valid email address');
     return;
  }
  if(!password){
      seterror('PLease enter valid password');
      return;
  }
  seterror("");


  //Login API call

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });
     const {token} = response.data;

     if(token){
      localStorage.setItem("token",token);
      updateuser(response.data);
      navigate("/dashboard");
     }

  } catch (error) {
    if(error.response && error.response.data.message){
        seterror(error.response.data.message);
    }
    else{
        seterror("Something went wrong! try again");
    }
  }
 }


  return (
    <div className='w-[90vw] md:w-[33vw] flex justify-center flex-col'>
      <h2 className='text-xl font-semibold text-black'> Welcome back! </h2>
      <p className='text-md text-slate-700 mt-[5px] mb-6'>
        Enter your details to login
      </p>
          
<form onSubmit={handleLogin} className="flex flex-col gap-4 w-[80%]">
  <Input
    value={email}
    onChange={({ target }) => setemail(target.value)}
    label="Email Address"
    placeholder="john123@gmail.com"
    type="text"
  />

  <Input
    value={password}
    onChange={({ target }) => setpassword(target.value)}
    label="Password"
    placeholder="Min 8 characters "
    type="password"
  />

  {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

  <button
    type="submit"
    className="w-full bg-black text-white py-2 rounded-md hover:bg-purple-400 cursor-pointer transition"
  >
    LOGIN
  </button>

  <p className="text-[13px] text-slate-800 text-center">
    Don’t have an account?{" "}
    <button
      type="button"
      className="font-medium text-primary underline ml-1 cursor-pointer"
      onClick={() => setcurrentPage("signup")}
    >
      Signup
    </button>
  </p>
</form>

    </div>
  )
}

export default Login
