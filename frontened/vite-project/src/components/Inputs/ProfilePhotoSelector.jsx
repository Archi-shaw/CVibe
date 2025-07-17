import React, { useRef, useState } from 'react'
import {LuUser,LuUpload, LuTrash} from "react-icons/lu"

const ProfilePhotoSelector = ({image , setImage,preview,setPreview}) => {

    const inputRef = useRef(null);
    const [previewUrl,setpreviewUrl] = useState(null);
     
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            // Update the image
            setImage(file);

        // Create the url preview 
            const preview = URL.createObjectURL(file);
            if(setPreview){
                setPreview(preview);
            }
            setpreviewUrl(preview);
        }
    };

    const handleImageDelete = (e) => {
         setImage(null);
         setpreviewUrl(null);
         if(setPreview){
            setpreview(null);
         }
    }
  
    const choosepic = () => {
        inputRef.current.click();
    };

  return (
    <div className="flex justify-center mb-6">
        <input 
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden" />

         { !image? (
            <div className="w-20 h-20 flex justify-center items-center relative bg-purple-50 rounded-full">
                <LuUser className="text-4xl text-purple-500"></LuUser>
                <button type="button"
                className="w-8 h-8 flex justify-center items-center bg-linear-to-r from-purple-500/85 to-purple-700 text-white
                 rounded-full absolute -bottom-1 -right-1 cursor-pointer "
                onClick={choosepic}
                >
                 <LuUpload ></LuUpload>    
                </button>
            </div>
         ) :   (
          <div className="relative">
                <img src={previewUrl}
                alt="profilepic"
                className="w-20 h-20 object-cover rounded-full"
                />
                <button type="button"
                className="w-8 h-8 flex justify-center items-center bg-red-500 text-white
                 rounded-full absolute -bottom-1 -right-1 cursor-pointer"
                onClick={handleImageDelete}
                >
                 <LuTrash />    
                </button>
            </div>
         )}     
    </div>
  )
}

export default ProfilePhotoSelector;
