import axios from 'axios';
import './axiosConfig';

export const ProfileService =  () => {
    const urlProfile = '/api/profile';
    const userId = localStorage.getItem('user_id');
  
    const createProfile = (data) => {
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };

        const response = axios.post (`${urlProfile}`, data, config);
        return response   
    }
  
    const getProfile = (profileId) => {
  return axios.get(`${urlProfile}/${profileId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error en la solicitud:', error);
      throw error;
    });
};



    const updateProfile = (profileId, profileData) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
        return axios.post(`${urlProfile}/${profileId}`, profileData, config);
    }
  
    const destroyProfile = (profileId) => {
        return axios.delete(`${urlProfile}/${profileId}`);
    }

    
    const getRegisteredEvents = () => {
      return axios.get(`${urlProfile}/events/${userId}`);
  }
  
  
  return {
    createProfile,
    getProfile,
    updateProfile,
    destroyProfile,
    getRegisteredEvents,
  }
  }
