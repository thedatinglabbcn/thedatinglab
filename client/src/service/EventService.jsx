import axios from 'axios';
import './axiosConfig'

const urlEvents = '/api/event';
const urlEventsAdmin = '/api/admin/event';

export const EventService = {
  getAllEvents: () => {
    return axios.get(urlEvents);
  },

  getEvent: (eventId) => {
    return axios.get(`${urlEvents}/${eventId}`);
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

  confirmAttendance: (eventId) => {
    return axios.post(`${urlEvents}/attendance/${eventId}`);
  },

  getEventAttendees: (eventId) => {
    return axios.get(`${urlEvents}/attendance/${eventId}`);
}
};
