import React from 'react'

const StepProgress = ({ progress }) => {
  return (
    <div className='w-full bg-purple-50 h-1 overflow-hidden'>
      <div 
        className='h-1 bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-300 ease-in-out'
        style={{ width: `${progress}%` }}
      >
      </div>
    </div>
  )
}

export default StepProgress