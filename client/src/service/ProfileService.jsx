import axios from 'axios';
import './axiosConfig';

export const ProfileService =  () => {
    const urlProfile = '/api/profile';
    
  
    const createProfile = (data) => {
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

        const response = axios.post (`${urlProfile}`, data, config);
        return response   
    }
  
    const updateProfile = (profileId, profileData) => {
        return axios.put(`${urlProfile}/${profileId}`, profileData);
    }
  
    const destroyProfile = (profileId) => {
        return axios.delete(`${urlProfile}/${profileId}`);
    }
  
  return {
    createProfile,
    updateProfile,
    destroyProfile,
  }
  }
