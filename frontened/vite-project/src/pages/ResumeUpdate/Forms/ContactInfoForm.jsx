import React from 'react'
import Input from '../../../components/Inputs/Input'

const ContactInfoForm = ({ contactinfo ,updateSection}) => {
  return (
   <>
     <div className='px-5 pt-5'>
      <h2 className='text-lg font-semibold text-gray-500'>
        Contact Information
      </h2>
      <div className='mt-4'>
        <Input 
        label="Address"
        placeholder="Short Address"
        type="text"
        value={contactinfo?.location || ""}
        onChange = {({target}) => updateSection("location",target.value)}
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
        label="Email"
        placeholder="john@example.com"
        type="text"
        value={contactinfo?.email || ""}
        onChange = {({target}) => updateSection("email",target.value)}
          />
          <Input
          value={contactinfo?.phone || ""}
          onChange = {({target}) => updateSection("phone",target.value)}
          label="Phone No"
          placeholder="980807653"
          type="text"
          />
           <Input
          value={contactinfo?.linkedin || ""}
          onChange = {({target}) => updateSection("linkedin",target.value)}
          label="Linkedin"
          placeholder="linkedin"
          type="text"
          />
           <Input
          value={contactinfo?.github || ""}
          onChange = {({target}) => updateSection("github",target.value)}
          label="Github"
          placeholder="github"
          type="text"
          />
           <Input
          value={contactinfo?.website || ""}
          onChange = {({target}) => updateSection("website",target.value)}
          label="Website"
          placeholder="website"
          type="text"
          />
          </div>
          </div>
          </div>
   </>
  )
}

export default ContactInfoForm
