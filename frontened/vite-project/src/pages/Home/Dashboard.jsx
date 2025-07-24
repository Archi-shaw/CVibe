import React, { useState , useEffect} from 'react'
import { API_PATHS } from '../../components/utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../components/utils/axiosInstance';
import {LuCirclePlus} from 'react-icons/lu';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import moment from 'moment';
import CreateResumeForm from './CreateResumeForm';
import Modal from '../../components/Modal';

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModel , setOpenCreateModel] = useState(false);
  const [openAllResumes, setOpenAllResumes] = useState(null);

  const fetchAllResumes = async() => {
    try {
       const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
       console.log(response.data)
       setOpenAllResumes(response.data);
    } catch (error) {
       console.error("Error fetching resumes" , error);
    }
  }

  useEffect(()  => {
    fetchAllResumes();
  }, []);

  
  return (
    <DashboardLayout> 
          <div className='grid grid-cols-1 md:grid-cols-5 gap-4  md:gap-7 pt-1 pb-6 px-4'>
          <div className='h-[380px] flex items-center justify-center flex-col gap-5 bg-white rounded-lg border border-purple-100 hover:border-purple-300
          hover:bg-purple-50/5 cursor-pointer ' 
          onClick={() => setOpenCreateModel(true)}>
            <div className='w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl'>
            <LuCirclePlus className='text-purple-500 text-xl' />
            </div>
            <h3 className='font-medium text-gray-800'> 
                Add new Resume
              </h3>
          </div>

          {openAllResumes?.map((resume) => (
               <ResumeSummaryCard 
                 key={resume._id}
                 imageUrl={resume.thumbnailLinks || null}
                 title={resume.title}
                 lastUpdated={resume?.updatedAt
                  ? moment(resume.updatedAt).format('MMM DD, YYYY')
                  : ""
                 }
                  onSelect={() => navigate(`/resume/${resume?._id}`)}
               />
          ))}
          </div>
          <Modal 
          isOpen={openCreateModel}
          onClose={() => setOpenCreateModel(false)}
          hideHeader>
              <div className=''>
                <CreateResumeForm />
              </div>
          </Modal>
    </DashboardLayout>
  )
}

export default Dashboard



