// export const BASE_URL = 'http://localhost:8000';
export const BASE_URL = 'https://cvibe-backend.onrender.com';


//utils/api/path
export const API_PATHS ={
    AUTH: {
        REGISTER: `/api/auth/register`,  // signup
        LOGIN: `/api/auth/login`,  // Authenticate user and return JWT tokens
        GET_PROFILE: `/api/auth/profile`, // get all user loged-in profiles
    },
    RESUME:{
        CREATE: `/api/resume`,   // POST- Create a new resume
        GET_ALL: `/api/resume`,  // GET- get all resumes 
        GET_BY_ID: (id) => `/api/resume/${id}`,  // GET- get all resumes by their id
        UPDATE: (id) => `/api/resume/${id}`, // PUT- update the existing resume
        DELETE: (id) => `/api/resume/${id}`,  // DELETE - delete a resume
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`, // PUT - upload resume thumbnail and image
    },
    IMAGE:{
        UPLOAD_IMAGES: `/api/auth/upload-image`,
    },

}