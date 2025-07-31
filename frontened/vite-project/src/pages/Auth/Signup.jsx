import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Input from "../../components/Inputs/Input"
import { validateEmail } from '../../components/utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'
import { UserContext } from '../../context/UserContex';
import uploadImage from '../../components/utils/uploadImage';
import axiosInstance from '../../components/utils/axiosInstance';
import  { API_PATHS } from '../../components/utils/apiPaths';

const Signup = ({setcurrentPage}) => {
  const [preview,setPreview] = useState(null);
  const [profilepic,setProfilepic] = useState("");
  const [name,setname] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [error,seterror] = useState("");
  const {updateuser} = useContext(UserContext);

  const navigate = useNavigate();

  //Handle signup form 

  const handleSignup = async(e) => {
   e.preventDefault();
   let profileImageUrl = "";
   if(!name){
    seterror('Enter Full Name');
    return;
   }
   if(!validateEmail(email)){
        seterror('PLease enter a valid email address');
        return;
     }
     if(!password){
         seterror('PLease enter valid password');
         return;
     }

     seterror("");
     // Signup API call 

    try {
 console.log("Profile pic", profilepic);
    // uploads image if present
if (profilepic) {
  const imageUploads = await uploadImage(profilepic);
  profileImageUrl = imageUploads.imageurl || "";
  console.log("✅ Uploaded image URL:", profileImageUrl);
}


    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      name : name,
      email,
      password,
      profileImageUrl,
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
  };

  return (
    <div className='w-[90vw] md:w-[33vw] flex justify-center flex-col'>
      <h2 className='text-xl font-semibold text-black'> Create an Account </h2>
      <p className='text-md text-slate-700 mt-[5px] mb-6'> Join us today by entering your details below </p>
      <form onSubmit={handleSignup} className='flex flex-col gap-4 w-[80%]'>
   <ProfilePhotoSelector
        image={profilepic}
        setImage={setProfilepic}
        preview={preview}
        setPreview={setPreview}
      />    <Input
    value={name}
    onChange={({ target }) => setname(target.value)}
    label="Name"
    placeholder="John Doe"
    type="text"
  />

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
    SIGNUP
  </button>

   <p className="text-[13px] text-slate-800 text-center">
    Already have a account{" "}
    <button
      type="button"
      className="font-medium text-primary underline ml-1"
      onClick={() => setcurrentPage("login")}
    >
      Login
    </button>
  </p>
      </form>
    </div>
  )
}

export default Signup
