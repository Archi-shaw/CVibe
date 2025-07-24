import React, { useState ,useParams, useRef} from 'react'
import {useNavigate} from 'react-router-dom';
import {LuCircleAlert , LuArrowLeft, LuDownload, LuPalette, LuSave, LuTrash2} from 'react-icons/lu';
import toast from 'react-hot-toast'; 
import DashboardLayout from '../../components/layouts/DashboardLayout'
import TitleInput from '../../components/Inputs/TitleInput';

const ResumeEdit = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const[baseWidth, setBaseWidth] = useState(800);
  const[openThemeSelector , setOpenThemeSelector] = useState(false);
  const[openPreviewModel, setOpenPreviewModel] = useState(false);

  const[currentPage, setCurrentPage] = useState("profile-info");
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
  return (
  <DashboardLayout>
   <div className='container mx-auto'>
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
    </div>
   </div>
  </DashboardLayout>
  )
}

export default ResumeEdit
