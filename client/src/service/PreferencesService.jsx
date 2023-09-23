import axios from 'axios';
import './axiosConfig';

export const PreferencesService =  () => {
    const urlPreferences = '/api/preferences';
  
    const createPreferences = (data) => {
        const response = axios.post (`${urlPreferences}`, data);
        return response   
    }
  
    const updatePreferences = (preferenceId, preferenceData) => {
        return axios.put(`${urlPreferences}/${preferenceId}`, preferenceData);
    }
  
    const destroyPreferences = (preferenceId) => {
        return axios.delete(`${urlPreferences}/${preferenceId}`);
    }
  
  return {
    createPreferences,
    updatePreferences,
    destroyPreferences,
  }
  }
