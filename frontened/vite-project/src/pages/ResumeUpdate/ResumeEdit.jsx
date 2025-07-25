import React, { useState , useRef,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {LuCircleAlert , LuArrowLeft, LuDownload, LuPalette, LuSave, LuTrash2} from 'react-icons/lu';
import toast from 'react-hot-toast'; 
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TitleInput from '../../components/Inputs/TitleInput';
import { useReactToPrint } from 'react-to-print';
import axiosInstance from '../../components/utils/axiosInstance';
import { API_PATHS } from '../../components/utils/apiPaths';

const ResumeEdit = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const[baseWidth, setBaseWidth] = useState(800);
  const[openThemeSelector , setOpenThemeSelector] = useState(false);
  const[openPreviewModel, setOpenPreviewModel] = useState(false);

  const[currentPage, setCurrentPage] = useState("profileinfo");
  const[progres,setProgress] = useState(0);
  const[resumeData, setResumeData] = useState({
    title:"",
    thumbnailLinks:"",
    template:{
        theme:"",
        colorPaletes: "",
    },
    profileinfo:{
        profileImg: null,
        profilePreviewUrl: "",
        name: "",
        designation:"",
        summary:"",
    },
    contactinfo: {
        email:"",
        phone:"",
        location:"",
        linkedin: "",
        github: "",
        website: "",
    },
    workexperience:[
        {
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
        }
    ],
    education: [
        {
            degree: "",
            instituition: "",
            startDate: "",
            endDate: "",
        }
    ],
    skills:[
        {
            name:"",
            progress: 0,
        },
    ],
    projects:[
        {
            title: "",
            description: "",
            github:"",
            livedemo:"",
        },
    ],
    certifications: [
        {
            title: "",
            issuer: "",
            year: 0,
        },
    ],
    languages: [
        {
            name: "",
            progress: 0,
        },
    ],
    interest: [""],
  });

  const [errormsg,setErrormsg] =useState("");
  const[isLoading,setIsLoading] = useState(false);

  // ValidateAndNext
    const validateAndNext = (e) => {};

    const handleDeleteResume = () => {};

  // Function to navigate to next step
    const goToNextStep = (e) => {};

  // Function to naviagate to previous page
    const goBack = (e) => {};

    const renderForm = (e) => {};

  // Update simple nested obect (like profileinfo, contactinfo ,etc.)
    const updateSection = (section,key,value) => {};

  // Update array item like (workexperience[1], skills[0])
    const updateArrayItem = (section,key,value) => {};

  // Add items to the list
    const addnewItem = (section, newItem) => {};

   // Remove item from the list
   const removeItem = (section,index) => {};

  //Fetch resume info  by id
  const fetchResumeDetailsById = async() => {
   try {
    const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
    if(response.data && response.data.profileinfo){
        const resumeInfo = response.data;
        setResumeData((prevState) => ({
            ...prevState,
            title: resumeInfo?.title || "Untitled",
            template: resumeInfo?.template || prevState?.template,
            profileinfo: resumeInfo?.profileinfo || prevState?.profileinfo,
            contactinfo: resumeInfo?.contactinfo || prevState?.contactinfo,
            workexperience: resumeInfo?.workexperience || prevState?.workexperience,
            education: resumeInfo?.education || prevState?.education,
            skills: resumeInfo?.skills|| prevState?.skills,
            projects: resumeInfo?.projects || prevState?.projects,
            certifications: resumeInfo?.certifications || prevState?.certifications,
            languages: resumeInfo?.languages || prevState?.languages,
            interest: resumeInfo?.interest || prevState?.interest,
        }))
    }
    }catch (error) {
     console.log("Error fetching resumes ", error);
}

  };

  // upload resume thumbnail and profile image
  const uploadResumeImage = async () => {};
  
  const uploadResumeDetails = async () => {};

  // Delete Resume
   const handleResume = () => {};

   // download Resume
const reactToprint = useReactToPrint({
  content: () => resumeDownloadRef.current,
});

   // Function to update basewidth based on resume container width
   const updateBaseWidth = () => {};

   useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize",updateBaseWidth);
    
    if(resumeId){
        fetchResumeDetailsById();
    }

    return () => {
     window.removeEventListener("resize",updateBaseWidth);
    };

   } , []);

  return (
  <DashboardLayout>
    <div className='flex items-center'>
    <div className="w-full max-w-8xl mx-auto ml-24">
    <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4'>
      <TitleInput 
       title={resumeData.title}
       setTitle={(value) =>
        setResumeData((prevState) => ({
          ...prevState,
          title: value,
        }))
       }
      />
      <div className='flex items-center gap-4'>
        <button 
        className='btn-small-light cursor-pointer'
        onClick={() => setOpenThemeSelector(true)}
        >
       <LuPalette className='text-[16px]'></LuPalette>
        <span className='hidden md:block'> Change Themes </span>
       </button>
       <button 
       className='btn-small-light cursor-pointer'
       onClick = {() => {handleDeleteResume}}>
        <LuTrash2 className='text-[16px]'></LuTrash2>
        <span className='hidden md:block'> Delete </span>
       </button>
       <button
       className='btn-small-light cursor-pointer'
       onClick= {() => {}}
       >
        <LuDownload className='text-[16px]'></LuDownload>
        <span className='hidden md:block'> Preview & Download </span>
       </button>
      </div>
    </div>
   </div>
   <div className=''>
    <div className=''>
         {renderForm()}
         <div className=''>
            {errormsg && (
                <div className=''>
                    <LuCircleAlert className='' /> {errormsg} 
                    </div>
            )}
         </div>
         <div className=''>
            <button 
            className=''
            onClick={goBack()}
            disabled={isLoading}
            >
                <LuArrowLeft className='' />
                Back
            </button>
              <button 
            className=''
            onClick={uploadResumeDetails()}
            disabled={isLoading}
            >
                <LuSave className='' />
                {isLoading? "UPdating..." : "Save & Exit"}
            </button>
         </div>
    </div>
   </div>
   </div>
  </DashboardLayout>
  )
}

export default ResumeEdit
