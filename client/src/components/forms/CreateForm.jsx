import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateForm() {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventData({
      ...eventData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('date', eventData.date);
    formData.append('time', eventData.time);
    formData.append('description', eventData.description);
    formData.append('image', eventData.image);

    try {
      const response = await axios.post('/api/admin/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: '¡Creación exitosa!',
          text: 'Tu evento ha sido creado correctamente.',
          icon: 'success',
        });
        
        console.log('Evento creado exitosamente');
      } else {
      }
    } catch (error) {
      console.error('Error al crear el evento:', error);
      // Manejar errores si es necesario
    }
  };

  return (
    <div>
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Hora</label>
          <input
            type="time"
            name="time"
            step="1"
            value={eventData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
}

export default CreateForm;