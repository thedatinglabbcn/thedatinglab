import axios from 'axios';
import './axiosConfig'

const urlEvents = 'https://api.thedatinglab.es/api/event';
const urlEventsAdmin = 'https://api.thedatinglab.es/api/admin/event';
const urlStorage = 'https://datinglab-storage.s3.amazonaws.com';

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
  },

  getEventForUser: (id) => {
    return axios.get(`${urlEvents}/user/${id}`);
  },
};