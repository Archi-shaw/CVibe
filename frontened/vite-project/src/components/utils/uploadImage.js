import {API_PATHS} from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async(imagefile) => {
    const formData = new FormData();
    // Appened image file to form data 
    formData.append('image', imagefile);
    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGES, formData ,{
          headers: {
            'Content-Type' : 'multipart/form-data' // Set header for file upload 
          },
        });
        console.log('Image upload success:', response.data);
        return response.data; // Return response data
    } catch (error) {
        console.error('Error uploading image' , error);
        throw error; // Rethrow error for error handling
    }
}

export default uploadImage;
