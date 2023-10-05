import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventService } from '../../service/EventService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../components/forms/Forms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../forms/Forms.css';

function EditForm() {
  const navigate = useNavigate();
  const { eventId } = useParams();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('date', eventData.date);
    formData.append('time', eventData.time);
    formData.append('description', eventData.description);
    formData.append('image', eventData.image);

    EventService.updateEvent(eventId, formData)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: '¡Actualización exitosa!',
            text: 'La información del evento ha sido actualizada correctamente.',
            icon: 'success',
          });

          navigate('/dashboard/events');
        } else {
          console.log('El servidor respondió con un estado diferente de 200:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el evento:', error);
      });
  };

  return (
    
    <div className='container'>
      
      <h2 className='form-title'>Editar Evento</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label  className='form-label' htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className='form-label' htmlFor="date">Fecha</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className='form-label' htmlFor="time">Hora</label>
          <input
            type="time"
            name="time"
            className="form-control"
            step="1"
            value={eventData.time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className='form-label' htmlFor="description">Descripción</label>
          <textarea
            name="description"
            className="form-control"
            value={eventData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label className='form-label' htmlFor="image">Imagen</label>
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
         {eventData.image && (
            <div className="mb-4">
            <label className="form-label-profile">Vista previa de la imagen de perfil</label>
            <center>
            <img
            src={URL.createObjectURL(eventData.image)}
              alt="Vista previa de la imagen de perfil"
              className="rounded-circle "
              />
            </center>
            </div>
          )}
          <div className='form-buttons'>
        <button className='button-send' type="submit">Aceptar</button>
        <Link to="/dashboard/events">
        <button className='button-cancel' type="submit">Cancelar</button>
        </Link>
        </div>
      </form>
      <div className='admin-footer'></div>
    </div>
  );
}

export default EditForm;
