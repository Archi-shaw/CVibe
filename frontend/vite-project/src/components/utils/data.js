import TEMPLATE_ONE_NMG from '../../assets/Rt1.png'  
import TEMPLATE_TWO_NMG from '../../assets/Rt2.png'  
import TEMPLATE_THREE_NMG from '../../assets/Rt3.png'  


export const  resumeTemplates = [
 {  
    id:"01",  
    thumbnailing: TEMPLATE_ONE_NMG,  
    colorPaletteCode: 'themeOne' ,
    },
    {
    id:"02",  
    thumbnailing: TEMPLATE_TWO_NMG,  
    colorPaletteCode: 'themeTwo',
    },
    {
    id:"03",  
    thumbnailing: TEMPLATE_THREE_NMG,  
    colorPaletteCode: 'themeThree' ,
    },
]

export const themeColorPalette = {
  themeOne: [
    ["#B3F1F6", "#7BE8F0", "#00BCD4", "#0089A7", "#2B3C49"],
    ["#BDF3EB", "#97E0D1", "#66D0B7", "#29B487", "#1A3F38"],

    ["#DCD6FB", "#C2B8F7", "#A497E7", "#6E64B0", "#3C3D50"],
    ["#DFF3FD", "#BEE3F8", "#88C9FF", "#298EFF", "#2A3D50"], 

    ["#FDEEEE", "#F8CED6", "#F4A8BC", "#F3617D", "#2C2C2C"],
    ["#E5E9F1", "#C9CFDD", "#AAB6C8", "#7586A6", "#1F2B3A"], 

    ["#C5EDE3", "#A0E0D4", "#72D1C1", "#2BB497", "#25423C"], 
    ["#FAD8C7", "#F6B28C", "#FA8F63", "#F16D44", "#2E211B"], 

    ["#D7EEF3", "#9FC7DD", "#74A9C9", "#487BA9", "#2C2F39"],
    ["#F4ECD8", "#EADBAC", "#E4C253", "#D6A600", "#2A2214"],

    ["#A7D4E2", "#7CB2CE", "#508BB6", "#216996", "#1F1F22"], 
    ["#C7C9C9", "#A0A1A1", "#6E6E6E", "#3D3D3D", "#1C1C1C"], 
  ]
};


export const DUMMY_RESUME_DATA = {
  title: "UI UX Designer Resume",
  thumbnailLinks: "",
  template: {
    theme: "",
    colorPaletes: "",
  },
  profileinfo: {
    profileImg: null,
    profilePreviewUrl: "",
    name: "John Doe",
    designation: "Senior Software Engineer",
    summary:
      "Passionate and results-driven developer with 6+ years of experience building ",
  },
  contactinfo: {
    email: "john.doegexample.com",
    phone: "+1234567890",
    location: "#12 Anywhere, Any City, Any Country",
    linkedin: "https://linkedin.com/timetoprogram",
    github: "https://github.com/timetoprogram",
    website: "https://timetoprogram.com",
  },
  workexperience: [
    {
      company: "Tech Solutions",
      role: "Senior Frontend Engineer",
      startDate: "2022-03",
      endDate: "2025-04",
      description:
        "Leading the frontend team to build scalable enterprise applications using ",
    },
    {
      company: "Coding Dev",
      role: "FULL Stack Developer",
      startDate: "2018-06",
      endDate: "2019-12",
      description:
        "Built responsive websites for startups and small businesses. Maintained legal",
    },
  ],
  education: [
    {
      degree: "M.Sc. Software Engineering",
      instituition: "Tech University",
      startDate: "2021-08",
      endDate: "2023-06",
    },
    {
      degree: "B.Sc. Computer Science",
      instituition: "State University",
      startDate: "2017-08",
      endDate: "2021-05",
    },
  ],
  skills: [
    { name: "JavaScript", progress: 95 },
    { name: "React.js", progress: 92 },
    { name: "Node.js", progress: 88 },
    { name: "HTML & CSS", progress: 97 },
    { name: "Tailwind CSS", progress: 85 },
    { name: "MongoDB", progress: 80 },
    { name: "Express.js", progress: 83 },
    { name: "Figma", progress: 75 },
    { name: "Next.js", progress: 82 },
    { name: "TypeScript", progress: 78 },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description:
        "An e-commerce site built with Next.js and Stripe integration. Supports cart",
      github: "",
      livedemo: "https://ecommerce-demo.timetoprogram.com",
    },
    {
      title: "Blog CMS",
      description:
        "A custom CMS for blogging using Express and React. Includes WYSIWYG editor",
      github: "https://github.com/timetoprogram/blog-cms",
      livedemo: "https://blogcms.timetoprogram.dev",
    },
  ],
  certifications: [
    {
      title: "Full Stack Web Developer",
      issuer: "Udeny",
      year: 2023,
    },
    {
      title: "React Advanced Certification",
      issuer: "Coursera",
      year: 2022,
    },
  ],
  languages: [
    { name: "English", progress: 100 },
    { name: "Spanish", progress: 70 },
    { name: "French", progress: 40 },
  ],
};


