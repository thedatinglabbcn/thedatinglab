import React, { useState } from 'react';
import { EventService } from '../../service/EventService';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Forms.css';

function EditForm() {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const auth = EventService();
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.updateEvent(eventData)
    .then(res => {
        Swal.fire({
          title: 'Actualización exitosa!',
          text: 'Tu evento ha sido actualizado correctamente.',
          icon: 'success',
        });
        console.log(res);
      })
      .catch(err => console.log(err));
      console.log(eventData);
  };
  
  return (
    <div>
      <h2>Editar Evento</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Editar Evento</button>
      </form>
    </div>
  );
}

export default EditForm;