import React, { useState } from 'react'
import {FaRegEye , FaRegEyeSlash} from "react-icons/fa6"

const Input = ({value,onChange,label, placeholder,type}) => {
    const [showpassword, setshowpassword] = useState(false);
    const toggleShowpassword = () => {
      setshowpassword(!showpassword);
    }

  return (
    <div>
      <label className='text-[15px] text-slate-800'> {label} </label>
      <div className='input-box'>
        <input 
        type={
            type == "password" ? (showpassword ? "text" : "password") : type
        }
        placeholder={placeholder}
        value={value}
        className='w-full bg-transparent outline-none'
        onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
          {showpassword ? (
            <FaRegEye
            size={22}
            className='text-primary cursor-pointer'
            onClick={() => toggleShowpassword()}
            />
          ):
            <FaRegEyeSlash
            size={22}
            className='text-slate-400 cursor-pointer'
            onClick={() => toggleShowpassword()}
            />
          }
          </>
        )}
      </div>
    </div>
  )
}

export default Input
