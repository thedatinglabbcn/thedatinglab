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
  const urlEventsAdmin = '/api/admin/event';

  const getAllEvents = () => {
    const response =  axios.get(urlEvents);
    return response;
  }


  const createEvent = (date) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = axios.post(urlEventsAdmin, date, config);
    return response;
  };


const updateEvent = (eventId, eventData) => {
  return axios.put(`${urlEventsAdmin}/${eventId}`, eventData);
}


const destroyEvent = (eventId) => {
  return axios.delete(`${urlEventsAdmin}/${eventId}`);
}


return {
  getAllEvents,
  createEvent,
  updateEvent,
  destroyEvent,
}
}