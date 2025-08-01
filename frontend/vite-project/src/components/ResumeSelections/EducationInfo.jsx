import React from 'react'

const EducationInfo = ({ degree, institution, duration }) => {
  return (
    <div className='mb-5'>
      <h3 className='text-[15px] font-semibold text-gray-900'> {degree} </h3>
      <p className='text-sm font-medium text-gray-700'> {institution} </p>
      <p className='text-xs font-medium italic text-gray-500 mt-0.5'> {duration} </p>
    </div>
  )
}

export default EducationInfo
