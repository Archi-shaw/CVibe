import React, { useState } from 'react';
import Input from '../../components/Inputs/Input';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../components/utils/axiosInstance';
import { API_PATHS } from '../../components/utils/apiPaths';

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter resume title");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });
      console.log(response.data);
      if(response?.data?.resume?._id){
        navigate(`/resume/${response.data?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong! Please try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-7">
      <h3 className='text-lg sm:text-xl font-semibold text-black mb-2'>
        Create New Resume
      </h3>
      <p className='text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6'>
        Give your resume a title to get started. You can edit all details later as well.
      </p>
      
      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({target}) => setTitle(target.value)}
          label="Resume title"
          placeholder="Eg: Milk's Resume"
          type="text"
        />
        
        {error && (
          <p className='text-red-500 text-xs sm:text-sm mb-3'>
            {error}
          </p>
        )}

        <button
          type="submit"
          className='w-full bg-black text-white py-2 sm:py-2.5 rounded-md hover:bg-purple-400 cursor-pointer transition text-sm sm:text-base'
        >
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;