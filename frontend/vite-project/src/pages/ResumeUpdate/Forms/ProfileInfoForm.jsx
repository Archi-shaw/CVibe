import React from 'react'
import ProfilePhotoSelector from '../../../components/Inputs/ProfilePhotoSelector';
import Input from '../../../components/Inputs/Input'


const ProfileInfoForm = ({  profileData,  updateSection, onNext}) => {
  return (
    <>
    <div className='px-5 pt-5'>
      <h2 className='text-lg font-semibold text-gray-500'>
        Personal Information
      </h2>
      <div className='mt-4'>
        <ProfilePhotoSelector 
        image={profileData?.profileImg || profileData?.profilePreviewUrl}
        setImage={(value) => updateSection("profileImg",value)}
        preview={profileData?.profilePreviewUrl}
        setPreview={(value) => updateSection("profilePreviewUrl",value)}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
          value={profileData?.name}
          onChange = {({target}) => updateSection("name",target.value)}
          label="Enter your full name"
          placeholder="john"
          type="text"
          />
          <Input
          value={profileData?.designation}
          onChange = {({target}) => updateSection("designation",target.value)}
          label="Designation"
          placeholder="UI-UX Designer"
          type="text"
          />
          <div className='col-span-2 mt-3'>
            <label className='text-xs font-medium text-slate-600'>
              Summary
            </label>
            <textarea 
            placeholder="Short Introduction"
            className='input-box'
            rows={4}
            value={profileData?.summary}
            onChange = {({target}) => updateSection("summary",target.value)}  >
            </textarea>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProfileInfoForm
