import axios from 'axios';
import './axiosConfig';
const urlStorage = 'https://datinglab-storage.s3.amazonaws.com/public/';

export const StorageService =  { 
    getStorage: () => {
    return axios.get(urlStorage);
  },
}