import axios from 'axios';
import './axiosConfig'

export const EventService = () => {
  const urlEvents = 'https://api.thedatinglab.es/api/event';
  const urlEventsAdmin = 'https://api.thedatinglab.es/api/admin/event';
  const urlStorage = 'https://datinglab-storage.s3.amazonaws.com';


  const getAllEvents = () => {
    return axios.get(urlEvents);
  }

  const getEvent = (eventId) => {
    return axios.get(`${urlEvents}/${eventId}`);
  }

  const createEvent = (formData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = axios.post(`${urlEventsAdmin}`, formData, config);
    return response
  }

  const updateEvent = (eventId, eventData) => {
    return axios.post(`${urlEventsAdmin}/${eventId}`, eventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  const destroyEvent = (eventId) => {
    return axios.delete(`${urlEventsAdmin}/${eventId}`);
  }

  const confirmAttendance = (eventId) => {
    return axios.post(`${urlEvents}/attendance/${eventId}`);
  }

  const getEventAttendees = (eventId) => {
    return axios.get(`${urlEvents}/attendance/${eventId}`);
  }

  const getEventForUser = (id) => {
    return axios.get(`${urlEvents}/user/${id}`);
  }
  return {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    destroyEvent,
    confirmAttendance,
    getEventAttendees,
    getEventForUser,
    urlStorage
}
};