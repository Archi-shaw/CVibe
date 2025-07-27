import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import {
    LuMapPinHouse,
    LuMap,
    LuPhone,
    LuRss,
    LuGithub,
    LuUser,
}
from 'react-icons/lu'
import { RiLinkedinLine } from 'react-icons/ri'

const DEFAULT_THEME = ['#EBFDFF', '#A1F4FD' , '#CEFAFE', '#00B8DB' , '#4A5565'];

const Title = ({ text, color }) => (
    <div className='relative w-fit mb-2.5'>
        <span 
            className="absolute bottom-0 left-0 w-full h-2"
            style={{ backgroundColor: color }}
        />
        <h2 className='relative font-bold text-sm'> {text} </h2>
    </div>
);


const TemplateOne = ({ resumeData, colorPaletes,  containerWidth}) => {
const themeColors = colorPaletes?.length > 0 ? colorPaletes: DEFAULT_THEME;
const resumeRef = useRef(null);
const [baseWidth, setBaseWidth] = useState(800); //Default width
const [scale,setScale] = useState(1);

useEffect(() => {
    // Calculate the scale factor based on container width 
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
}, [containerWidth]);

  return (
    <div
    ref={resumeRef}
    className='p-3 bg-white'
    style={{
        transform: containerWidth > 0? `scale(${scale})`  : "none",
        transformOrigin: "top left",
        width: containerWidth>0 ? `${baseWidth}px` : "auto",
        height: "auto",
    }}
    >
        <div className='grid grid-cols-12 gap-8'>
          <div 
          className='col-span-4 py-10'
          style={{ backgroundColor: themeColors[0]}}
          >
        <div className='flex flex-col items-center px-2'>
          <div 
          className='w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex justify-center  items-center'
          style={{ backgroundColor: themeColors[1]}}
          >
           {resumeData.profileinfo.profilePreviewUrl ? (
              <img 
              src={resumeData.profileinfo.profilePreviewUrl}
              className='w-[90px] h-[90px] rounded-full'
              />
           ): (
             <div
             className='w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full'
             style={{ color: themeColors[4]}}
             >
                <LuUser />
                </div>
           )}
          </div>
          <h2 className='text-xl font-bold mt-3'>
            {resumeData?.profileinfo?.name}
          </h2>
          <p className='text-sm text-center'>
            {resumeData?.profileinfo?.designation}
          </p>
        </div>
        <div className='my-6 mx-6'>

        </div>
          </div>
          <div className='col-span-8 pt-10 mr-10 pb-5 '>

          </div>
        </div>
    </div>
  )
}

export default TemplateOne
