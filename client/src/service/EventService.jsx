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
  
  const urlEvents = '/api/event';
  // const urlEventsAdmin = '/api/admin/event';
  
  const getAllEvents = () => {
    const res =  axios.get(urlEvents);
    return res;
  }

const createEvent = (date) => {
const response = axios.post (`${urlEvents}`, date);
return response
  
}
const updateEvent = (eventId, eventData) => {
  return axios.put(`${urlEvents}/${eventId}`, eventData);
}

const destroyEvent = (eventId) => {
  return axios.delete(`${urlEvents}/${eventId}`);
}

return {
  getAllEvents,
  createEvent,
  updateEvent,
  destroyEvent,
}
}




