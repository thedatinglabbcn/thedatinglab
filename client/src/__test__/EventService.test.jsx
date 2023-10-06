import axios from 'axios';
import { EventService } from '../service/EventService';

jest.mock('axios');

describe('EventService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  });

  it('should fetch all events', async () => {
    const mockData = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
    axios.get.mockResolvedValue({ data: mockData });

    const response = await EventService.getAllEvents();

    expect(axios.get).toHaveBeenCalledWith('/api/event');
    expect(response).toEqual({ data: mockData });
  });

  it('should handle empty events list gracefully', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const response = await EventService.getAllEvents();

    expect(axios.get).toHaveBeenCalledWith('/api/event');
    expect(response).toEqual({ data: [] });
  });

  it('should create an event', async () => {
    const formData = {
      name: 'Nuevo Evento',
      date: '2023-10-20',
      time: '20:00:00',
      description: 'Ejemplo descripción',
      image: 'storage/FXbU9A42s4MoUCsUO20mx27alFNTuGAnNnVRo9qn.jpg'
    };

    axios.post.mockResolvedValue({ data: formData });

    const response = await EventService.createEvent(formData);

    expect(axios.post).toHaveBeenCalledWith('/api/admin/event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    expect(response).toEqual({ data: formData });
  });

  it('should update an event', async () => {

    const existingEventId = 1;
    const existingEventData = {
      name: 'Evento Existente',
      date: '2023-10-20',
      time: '20:00:00',
      description: 'Descripción del evento existente',
      image: 'existing-event-image.jpg',
    };

    const updatedEventId = 1;
    const updatedEventData = {
      name: 'Evento Actualizado',
      date: '2023-11-15',
      time: '19:30:00',
      description: 'Nueva descripción del evento',
      image: 'storage/btVYZHnkw9lvywKz8unK6GnY9a6vV6WoV8jThd5j.jpg',
    };

    axios.post.mockResolvedValue({ data: updatedEventData });

    const response = await EventService.updateEvent(existingEventId, updatedEventData);

    expect(axios.post).toHaveBeenCalledWith(`/api/admin/event/${existingEventId}`, updatedEventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    expect(response).toEqual({ data: updatedEventData });
  });

  it('should delete an event', async () => {
    const eventIdToDelete = 1;

    axios.delete.mockResolvedValue({ status: 204 });

    const response = await EventService.destroyEvent(eventIdToDelete);

    expect(axios.delete).toHaveBeenCalledWith(`/api/admin/event/${eventIdToDelete}`);
    expect(response.status).toBe(204);
  });

  it('should fetch a single event by ID', async () => {
    const eventIdToFetch = 1;

    const mockEventData = { id: eventIdToFetch, name: 'Evento de prueba' };

    axios.get.mockResolvedValue({ data: mockEventData });

    const response = await EventService.getEvent(eventIdToFetch);

    expect(axios.get).toHaveBeenCalledWith(`/api/event/${eventIdToFetch}`);
    expect(response.data).toEqual(mockEventData);
  });

});