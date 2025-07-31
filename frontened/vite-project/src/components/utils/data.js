import TEMPLATE_ONE_NMG from '../../assets/Rt1.png'  
import TEMPLATE_TWO_NMG from '../../assets/Rt2.png'  
import TEMPLATE_THREE_NMG from '../../assets/Rt3.png'  


export const resumeTemplates = [
 {  
    id:'01',  
    thumbnailing: TEMPLATE_ONE_NMG,  
    colorPaletteCode: 'themeOne' ,
    },
    {
    id:'02',  
    thumbnailing: TEMPLATE_TWO_NMG,  
    colorPaletteCode: 'themeTwo',
    },
    {
    id:'03',  
    thumbnailing: TEMPLATE_THREE_NMG,  
    colorPaletteCode: 'themeThree' ,
    },
]

export const themeColorPalette = {  
    themeOne: [
        ["#EBFDFF", "#A1FAFD", "#CEFAFE", "#00B8DB", "#A45565"],
        ["#E9FBF8", "#BA6EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
        ["#F5FAFF", "#E8DBFF", "#C9C2F8", "#857901", "#AB485C"],
        ["#F8FAFF", "#D6FBFF", "#AFDEFF", "#3399FF", "#45361"],
        ["#FFF5F7", "#FFE8EC", "#FAC6DA", "#F6729C", "#54545A"],
        ["#F9FAF8", "#EAE7EB", "#CBDE8", "#7F9CF5", "#203748"],
        ["#FAFFFD", "#D3FDF2", "#B0E9DA", "#34C790", "#384C48"],
        ["#FFFFF0", "#03FDF2", "#80E9DA", "#34C790", "#384C48"],
        ["#FFF7F8", "#FFE609", "#FFD2BA", "#FF9561", "#4C4743"],
        ["#FF9FCFF", "#E3FBF9", "#CDODEE", "#6CAGCF", "#46545E"],
        ["#FFFDF6", "#FFFA07", "#FFE7A8", "#FFD88", "#57534E"],
        ["#EFFCEF", "#CEBF6FF", "#99EGFF", "#087BAT", "#283A42"],
        ["#FF7F7F7", "#EAE4E4", "#CFCFCF", "#AAAAAA", "#222222"],
        ["#EB3F2FD", "#90CAF9", "#a8d214", "#LE88ES", "#0047A1"]
    ]
};

export const DUMMY_RESUME_DATA = {
    profileInfo: {
    profileImg: null,
    previewUrl: "",
    fullName: "John Doe",
    designation: "Senior Software Engineer",
    summary:
    "Passionate and results-driven developer with 6+ years of experience building ",
    },
    contactInfo: {
    email: "john.doegexample.com",
    phone: "+1234567890",
    location: "#12 Anywhere, Any City, Any Country",
    linkedin: "https://linkedin.com/timetoprogram",
    github: "https://github.com/timetoprogram",
    website: "https://timetoprogram.com",
    },
    workExperience: [
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
    "Built responsive websites for startups and small businesses. Maintained legal"
   },
 ],
    education: [
    {
    degree: "M.Sc. Software Engineering",
    institution: "Tech University",
    startDate: "2021-08",
    endDate: "2023-06",
    },
    {
    degree: "B.Sc. Computer Science",
    institution: "State University",
    startDate: "2017-08",
    endDate: "2021-05",
    },
    ],
    projects: [
    {
    title: "E-Commerce Platform",
    description:
    "An e-commerce site built with Next.js and Stripe integration. Supports cart",
    liveDemo: "https://ecommerce-demo.timetoprogram.com",
    },
    {
    title: "Blog CMS",
    description:
    "A custom CMS for blogging using Express and React. Includes WYSIWYG editor",
    github: "https://github.com/timetoprogram/blog-cms",
    liveDemo: "https://blogcms.timetoprogram.dev",
    },
    ],
    certifications: [
    {
    title: "Full Stack Web Developer",
    issuer: "Udeny",
    year: "2023",
    },
    {
    title: "React Advanced Certification",
    issuer: "Coursera",
    year: "2022",
    },
    ],
    languages: [
    { name: "English", progress: 100 },
   { name: "Spanish", progress: 70 },
    { name: "French", progress: 40 },
    ],
}

