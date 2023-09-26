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
  
    const getProfile = async (profileId) => {
        const response = await axios.get(`${urlProfile}/${profileId}`);
        return response.data;
    };


    const updateProfile = (profileId, profileData) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
        return axios.put(`${urlProfile}/${profileId}`, profileData, config);
    }
  
    const destroyProfile = (profileId) => {
        return axios.delete(`${urlProfile}/${profileId}`);
    }
  
  return {
    createProfile,
    getProfile,
    updateProfile,
    destroyProfile,
  }
  }
