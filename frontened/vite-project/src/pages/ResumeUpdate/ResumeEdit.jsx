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
import RenderResume from '../../components/ResumeTemplates/RenderResume';
import {  fixTailwindColors , captureElementsAsImage , dataURLtoFile} from '../../components/utils/helper'
import Modal from '../../components/Modal';
import ThemeSelector from '../../pages/ResumeUpdate/ThemeSelector';


const ResumeEdit = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModel, setOpenPreviewModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("profileinfo");
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
  });

  const [errormsg, setErrormsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ValidateAndNext
  const validateAndNext = (e) => { 
    const error = [];
    switch (currentPage) {
      case "profileinfo": 
      const {name, designation, summary} = resumeData?.profileinfo;
      if(!name.trim()) error.push("Full Name is required");
      if(!designation.trim()) error.push(" Desgination is required");
      if(!summary.trim()) error.push("Description is required");
      break;
      case "contactinfo":
      const { email , phone , linkedin} = resumeData?.contactinfo;
      if(!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        error.push("Valid Email is required");
      }
      if(!phone.trim()){
        error.push("Phone Number is required");
      }
      if(!linkedin){
        error.push("LinkedIn is required");
      }
      break;
      case "workexperience": 
      resumeData?.workexperience.forEach(({company,role,startDate, endDate}, index) => {
       if(!company.trim() ){
        error.push("Company is required");
      }
      if(!role.trim()){
        error.push("Role is required");
      }
      if(!startDate || !endDate){
        error.push("StartDate or EndDate is required");
      }
      })
      break;
      case "education":
      resumeData?.education.forEach(({degree,instituition,startDate, endDate}, index) => {
      if(!degree.trim() ){
        error.push("Degree is required");
      }
      if(!instituition.trim()){
        error.push("Institution name is required");
      }
      if(!startDate || !endDate){
        error.push("StartDate or EndDate is required");
      }
      })
      break;
      case "skills":
      resumeData?.skills.forEach(({name}, index) => {
      if(!name.trim() ){
        error.push("Skill name is required");
      }})
      break;
      case "projects":
      resumeData?.projects.forEach(({title, description, github, livedemo}, index) => {
      if(!title.trim() ){
        error.push("Project name  is required");
      }
      if(!description.trim()){
        error.push("Project description  is required");
      }
       if(!github.trim() || !livedemo.trim()){
        error.push("Github or Live demo link is required is required");
      }
    })
      break;
    case  "additionalForm":
      if(resumeData.languages.length === 0 && !resumeData.languages[0].name.trim() ){
        error.push("Minimum one language is required");
      }
      if(resumeData.interest.length === 0 && !resumeData.interest[0]?.trim() ){
        error.push("Interest is required");
      }
      break;
      default:
      break;
    }
    if(error.length > 0){
      setErrormsg(error.join(","));
      return ;
    }
    setErrormsg("");
    goToNextStep();
  };

  const handleDeleteResume = () => { 
    // Add delete logic here
  };

  // Function to navigate to next step
  const goToNextStep = (e) => { 
    const pages = [
      "profileinfo",
      "contactinfo",
      "workexperience",
      "education",
      "skills",
      "projects",
      "certifications",
      "additionalForm",
    ]

    if(currentPage === "additionalForm" ) setOpenPreviewModel(true);
    const currentIndex = pages.indexOf(currentPage);
    if(currentIndex !== -1 && currentIndex < pages.length-1){
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

    // Set Progess as percentge
    const percent = Math.round((nextIndex / (pages.length-1)) * 100);
    setProgress(percent);
    window.scrollTo({ top:0 , behavior: "smooth"});
    }
  };

  // Function to navigate to previous page
  const goBack = (e) => { 
     const pages = [
      "profileinfo",
      "contactinfo",
      "workexperience",
      "education",
      "skills",
      "projects",
      "certifications",
      "additionalForm",
    ]

    if(currentPage === "profileinfo" ) navigate("/dashboard");
    const currentIndex = pages.indexOf(currentPage);
    if(currentIndex > 0){
    const prevIndex = currentIndex - 1;
    setCurrentPage(pages[prevIndex]);

    const percent = Math.round((prevIndex / (pages.length-1)) * 100);
    setProgress(percent);
    window.scrollTo({ top:0 , behavior: "smooth"});
    }
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
                  removeItem("workexperience",index)
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
     try {
        setIsLoading(true);
        fixTailwindColors(resumeRef.current);
        const imageDataUrl = await captureElementsAsImage(resumeRef.current);

        const thumbnailFile =dataURLtoFile(
          imageDataUrl,
        `resume-${resumeId}.png`
        );

        const profileImageFile = resumeData?.profileinfo?.profileImg || null;
        const formData = new FormData();

        if(profileImageFile) formData.append("profileImage", profileImageFile);
        if(thumbnailFile) formData.append("thumbnail", thumbnailFile);

        const uploadResponse = await axiosInstance.post(
          API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
          formData, {
            headers : {"Content-Type" : "multipart/form-data"}
          }
        ) 
        
         const { thumbnailLinks , profilePreviewUrl} = uploadResponse.data ;
         console.log("RESUME_DATA__", resumeData);

         // Call the second API to update other data
        await updateResumeDetails(thumbnailLinks, profilePreviewUrl);

        toast.success("Resume Upload sucessfully");
        navigate('/dashboard');
     } catch (error) {
        console.log("Error uploading Image", error);
        toast.error("Failed to upload images");
     }
     finally{
          setIsLoading(false);
     }
  };

 const updateResumeDetails = async (thumbnailLinks, profilePreviewUrl) => {
  try {
    setIsLoading(true);

    const response = await axiosInstance.put(
      API_PATHS.RESUME.UPDATE(resumeId),
      {
        ...resumeData,
        thumbnailLinks: thumbnailLinks || "",
        profileinfo: {
          ...resumeData.profileinfo,
            profilePreviewUrl: profilePreviewUrl || "",
        },
      }
    );
  } catch (err) {
    console.error("Error capturing image:", err);
  } finally {
    setIsLoading(false);
  }
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
                    onClick={uploadResumeImage}
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
                    {currentPage === "additionalForm" ? "Preview & Download" : "Next"}
                    {currentPage !== "additionalForm" && (
                      <LuArrowLeft className='text-[16px] rotate-180' />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
            
            <div ref={resumeRef} className='h-[75vh]'>
            <RenderResume 
            templateId={resumeData?.template?.theme || "01"}
            resumeData={resumeData}
            colorPaletes={resumeData?.template?.colorPaletes || []}
            containerWidth={baseWidth}
            />
            </div>
          </div>
      </div>
     < Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Change Theme"
        fullWidth={true}
      >
        <div className="w-[90vw] h-[80vh]">
          <ThemeSelector
            selectedTheme={resumeData?.template}
            setSelectedTheme={(value) => {
              setResumeData((prevState) => ({
                ...prevState,
                template: value || prevState.template,
              }));
            }}
  resumeData={resumeData}
      onClose={() => setOpenThemeSelector(false)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default ResumeEdit