import React, { useEffect, useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { getLightColorFromImage } from '../utils/helper'; // Assuming this utility function exists

const ResumeSummaryCard = ({ imageUrl, title, lastUpdated, onSelect }) => {
const [bgColor, setBgColor] = useState("#ffffff");

useEffect(()=> {
  if(imageUrl){
    getLightColorFromImage(imageUrl)
      .then((color) =>{
          setBgColor(color);
      })
      .catch(() =>{
        setBgColor('#ffffff')
      })

  }
})

  return (
    <div
      onClick={onSelect}
      style={ { backgroundColor: bgColor}}
  className='h-[350px] flex flex-col justify-between cursor-pointer bg-white rounded-lg border border-gray-200 hover:border-purple-300 shadow-sm transition duration-200 hover:shadow-md'
    >
      <div className='p-4'>
        {imageUrl ? ( <img
  src={imageUrl}
  alt='Resume Thumbnail'
  className='w-full h-70 object-cover rounded-md' 
/>
 ): (
          <div>
            </div>
            )}
      </div>
      <div className='w-full bg-white px-4 py-3'>
        <h3 className='text-sm font-medium text-gray-800  overflow-hidden whitespace-nowrap truncate'>{title}</h3>
        <div className='text-sm font-medium text-gray-500 flex items-center mt-0.5'>
          <FaRegCalendarAlt className='mr-2 text-gray-800' />
          <span>Last Updated: {lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
