import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Accept'] = 'application/json';

const urlEvents = '/api/event';
const urlEventsAdmin = '/api/admin/event';

export const EventService = {
  getAllEvents: () => {
    return axios.get(urlEvents);
  },

  createEvent: (formData) => {
    return axios.post(urlEventsAdmin, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateEvent: (eventId, eventData) => {
    return axios.post(`${urlEventsAdmin}/${eventId}`, eventData, {
      headers: {
      'Content-Type': 'multipart/form-data',
      },
    });
  },

  destroyEvent: (eventId) => {
    return axios.delete(`${urlEventsAdmin}/${eventId}`);
  },
};
