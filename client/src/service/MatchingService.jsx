import axios from 'axios';
import './axiosConfig';

export const MatchingService = () => {
  const urlMatches = '/api/matching-users';

  const getAllMatches = () => {
    return axios.get(urlMatches);
  };

  return {
    getAllMatches
  };
};