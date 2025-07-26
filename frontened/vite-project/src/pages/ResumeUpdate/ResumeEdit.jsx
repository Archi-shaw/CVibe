import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LuCircleAlert, LuArrowLeft, LuDownload, LuPalette, LuSave, LuTrash2 } from 'react-icons/lu';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TitleInput from '../../components/Inputs/TitleInput';
import { useReactToPrint } from 'react-to-print';
import axiosInstance from '../../components/utils/axiosInstance';
import { API_PATHS } from '../../components/utils/apiPaths';
import StepProgress from '../../components/StepProgress';
import ProfileInfoForm from '../../pages/ResumeUpdate/Forms/ProfileInfoForm';
import ContactInfoForm from './Forms/ContactInfoForm';
import WorkExperienceForm from '../../pages/ResumeUpdate/Forms/WorkExperienceForm';
import SkillForm from '../../pages/ResumeUpdate/Forms/SkillForm';
import CertificationForm from './Forms/CertificationForm';
import ProjectForm from './Forms/ProjectForm';
import EducationForm from './Forms/EducationForm';
import AdditionalForm from './Forms/AdditionalForm';

const ResumeEdit = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModel, setOpenPreviewModel] = useState(false);

  const [currentPage, setCurrentPage] = useState("additionalForm");
  const [progress, setProgress] = useState(30);
  const [resumeData, setResumeData] = useState({
    title: "UI UX Designer Resume",
    thumbnailLinks: "",
    template: {
      theme: "",
      colorPaletes: "",
    },
    profileinfo: {
      profileImg: null,
      profilePreviewUrl: "",
      name: "",
      designation: "",
      summary: "",
    },
    contactinfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workexperience: [
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
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        livedemo: "",
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

  const [errormsg, setErrormsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ValidateAndNext
  const validateAndNext = (e) => { 
  };

  const handleDeleteResume = () => { 
    // Add delete logic here
  };

  // Function to navigate to next step
  const goToNextStep = (e) => { 
    // Add navigation logic here
  };

  // Function to navigate to previous page
  const goBack = (e) => { 
    // Add back navigation logic here
  };

  const renderForm = () => { 
      switch (currentPage){
        case "profileinfo":
            return (
                <ProfileInfoForm 
                 profileData={resumeData?.profileinfo}
                 updateSection={(key,value) => {
                    updateSection("profileinfo",key,value);
                 }}
                 onNext={validateAndNext}
                />
            );
            case "contactinfo": 
            return (
              <ContactInfoForm 
                contactinfo={resumeData?.contactinfo}
                 updateSection={(key,value) => {
                    updateSection("contactinfo",key,value);
                 }}
              />
            );
            case "workexperience": 
            return (
              <WorkExperienceForm
                workexperience={resumeData?.workexperience}
                 updateArrayItem={(index,key,value) => {
                    updateArrayItem("workexperience",index,key,value);
                 }}
                 addnewItem={(newItem) => addnewItem("workexperience",newItem)}
                 removeItem={(index) => {
                  removeItem("wokexperience",index)
                 }}
              />
            );
            case "education": 
            return (
              <EducationForm
               education={resumeData?.education}
                 updateArrayItem={(index,key,value) => {
                    updateArrayItem("education",index,key,value);
                 }}
                 addnewItem={(newItem) => addnewItem("education",newItem)}
                 removeItem={(index) => {
                  removeItem("education",index)
                 }}
              />
            );
            case "skills": 
            return (
              <SkillForm
                skills={resumeData?.skills}
                  updateArrayItem={(index,key,value) => {
                    updateArrayItem("skills",index,key,value);
                 }}
                 addnewItem={(newItem) => addnewItem("skills",newItem)}
                 removeItem={(index) => {
                  removeItem("skills",index)
                 }}
              />
            );
            case "projects": 
            return (
              <ProjectForm
                  projects={resumeData?.projects}
              updateArrayItem={(index,key,value) => {
                    updateArrayItem("projects",index,key,value);
                 }}
                 addnewItem={(newItem) => addnewItem("projects",newItem)}
                 removeItem={(index) => {
                  removeItem("projects",index)
                 }}
              />
            );
            case "certifications": 
            return (
              <CertificationForm
                certifications={resumeData?.certifications}
                 updateArrayItem={(index,key,value) => {
                    updateArrayItem("certifications",index,key,value);
                 }}
                 addnewItem={(newItem) => addnewItem("certifications",newItem)}
                 removeItem={(index) => {
                  removeItem("certifications",index)
                 }}
                 />
            );
            case "additionalForm":
              return ( 
                <AdditionalForm 
                languages={resumeData?.languages}
                interest={resumeData?.interest}
                 updateArrayItem={(section, index,key,value) => {
                    updateArrayItem(section,index,key,value);
                 }}
                 addnewItem={(section,newItem) => addnewItem(section,newItem)}
                 removeItem={(section, index) => {
                  removeItem(section,index)
                 }}
                   />
              );
            default:
              return null;
      }
  };


  // Update simple nested object (like profileinfo, contactinfo, etc.)
  const updateSection = (section, key, value) => { 
    setResumeData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value
      }
    }));
  };

  // Update array item like (workexperience[1], skills[0])
  const updateArrayItem = (section, index, key, value) => { 
    setResumeData(prevState => ({
      ...prevState,
      [section]: prevState[section].map((item, i) => 
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  // Add items to the list
  const addnewItem = (section, newItem) => { 
    setResumeData(prevState => ({
      ...prevState,
      [section]: [...prevState[section], newItem]
    }));
  };

  // Remove item from the list
  const removeItem = (section, index) => { 
    setResumeData(prevState => ({
      ...prevState,
      [section]: prevState[section].filter((_, i) => i !== index)
    }));
  };

  //Fetch resume info by id
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
      if (response.data && response.data.profileinfo) {
        const resumeInfo = response.data;
        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileinfo: resumeInfo?.profileinfo || prevState?.profileinfo,
          contactinfo: resumeInfo?.contactinfo || prevState?.contactinfo,
          workexperience: resumeInfo?.workexperience || prevState?.workexperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interest: resumeInfo?.interest || prevState?.interest,
        }))
      }
    } catch (error) {
      console.log("Error fetching resumes ", error);
    }
  };

  // upload resume thumbnail and profile image
  const uploadResumeImage = async () => { 
    // Add image upload logic here
  };

  const uploadResumeDetails = async () => { 
    // Add resume save logic here
  };

  // Delete Resume
  const handleResume = () => { 
    // Add resume handling logic here
  };

  // download Resume
  const reactToprint = useReactToPrint({
    content: () => resumeDownloadRef.current,
  });

  // Function to update basewidth based on resume container width
  const updateBaseWidth = () => { 
    const container = resumeRef.current;
    if (container) {
      setBaseWidth(container.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className='w-full max-w-7xl mx-16 px-4'>
        <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-6'>
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />
          
          {/* Action Buttons - Top Right */}
          <div className='flex items-center gap-3'>
            <button
              className='flex items-center gap-2 px-3 py-2  cursor-pointer text-sm bg-purple-50 text-purple-700 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors'
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette className='text-[16px]' />
              <span className='hidden md:block'>Change Theme</span>
            </button>
            <button
              className='flex items-center gap-2 px-3 py-2 text-sm cursor-pointer bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition-colors'
              onClick={handleDeleteResume}
            >
              <LuTrash2 className='text-[16px]' />
              <span className='hidden md:block'>Delete</span>
            </button>
            <button
              className='flex items-center gap-2 px-3 py-2 text-sm cursor-pointer bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors'
              onClick={() => reactToprint()}
            >
              <LuDownload className='text-[16px]' />
              <span className='hidden md:block'>Preview & Download</span>
            </button>
          </div>
        </div>

        <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
          <div className='bg-white rounded-lg border border-purple-100 overflow-hidden flex flex-col'>
            <StepProgress progress={progress} />
            
              {renderForm()}
              
              {errormsg && (
                <div className='mx-6 mb-4'>
                  <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-3 py-2 rounded-lg'>
                    <LuCircleAlert className='text-md' /> 
                    {errormsg}
                  </div>
                </div>
              )}

            <div className= 'px-6 py-4'>
              <div className='flex items-center justify-between gap-3'>
                <button
                  className='flex items-center gap-2 px-4 cursor-pointer py-2 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className='text-[16px]' />
                  Back
                </button>
                
                <div className='flex items-center gap-3'>
                  <button
                    className='flex items-center gap-2 px-4 py-2  cursor-pointer text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50'
                    onClick={uploadResumeDetails}
                    disabled={isLoading}
                  >
                    <LuSave className='text-[16px]' />
                    {isLoading ? "Updating..." : "Save & Exit"}
                  </button>
                  
                  <button
                    className='flex items-center gap-2 px-4 py-2 text-sm cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50'
                    onClick={validateAndNext}
                    disabled={isLoading}
                  >
                    {currentPage === "additionalInfo" ? "Preview & Download" : "Next"}
                    {currentPage !== "additionalInfo" && (
                      <LuArrowLeft className='text-[16px] rotate-180' />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Resume Preview */}
          {/* <div className='bg-white rounded-lg border border-purple-100 p-6'>
            <div className='flex items-center justify-center h-full min-h-[600px]'>
              <div ref={resumeRef} className='w-full h-full bg-gray-50 rounded-lg flex items-center justify-center'>
                <p className='text-gray-500 text-lg'>Resume Preview</p>
              </div>
            </div>
            
            {/* Hidden download reference */}
            {/* <div ref={resumeDownloadRef} className='hidden'> */}
              {/* Download version of resume will be rendered here */}
            {/* </div>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ResumeEdit