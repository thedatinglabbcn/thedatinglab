import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


// axios.defaults.withCredentials = true;


axios.interceptors.request.use(function (res){
    const token = localStorage.getItem('auth_token');
    res.headers.Authorization = token ? `Bearer ${token}`: '';
        return res
}
);


export const EventService =  () => {
  
  const urlEvents = '/api/events';
  
  const getAllEvents = () => {
    const res =  axios.get(urlEvents);
    return res;
  }

//   const createDates = (date) => {
//     const response = axios.post (`${url}/create`, date);
//     return response
  
//   }


  return {
    getAllEvents
}
}
