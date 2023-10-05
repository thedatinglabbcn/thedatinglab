import React, { useState } from 'react';
import { EventService } from '../../service/EventService';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../components/forms/Forms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../forms/Forms.css';

function CreateForm() {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    image: null,
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });

    setValidationErrors({
      ...validationErrors,
      [name]: '',
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventData({
      ...eventData,
      image: file,
    });

    setValidationErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', eventData.title);
    formData.append('date', eventData.date);
    formData.append('time', eventData.time);
    formData.append('description', eventData.description);
    formData.append('image', eventData.image);

    EventService.createEvent(formData)
    .then((response) => {
      if (response.status === 200) {
        Swal.fire({
          title: '¡Creación exitosa!',
          text: 'Tu evento ha sido creado correctamente.',
          icon: 'success',
        });

        console.log('Evento creado exitosamente');
        
        navigate('/dashboard/events');
      } else {
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.validation_errors;
        setValidationErrors(errors);
      } else {
        console.log('Error al crear el evento:', err);
      }
    });
  };

  return (
    <div className='container'>
   
      <h2 className='form-title'>Crear Evento</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div>
          <label className='form-label' htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
          {validationErrors.title && (
              <div className="text-danger">{validationErrors.title.join(', ')}</div>
            )}
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
          {validationErrors.date && (
              <div className="text-danger">{validationErrors.date.join(', ')}</div>
            )}
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
          {validationErrors.time && (
              <div className="text-danger">{validationErrors.time.join(', ')}</div>
            )}
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
          {validationErrors.description && (
              <div className="text-danger">{validationErrors.description.join(', ')}</div>
            )}
        </div>
        <div>
          <label className='form-label' htmlFor="image">Imagen</label>
          <input
            type="file"
            name="image"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {validationErrors.image && (
              <div className="text-danger">{validationErrors.image.join(', ')}</div>
            )}
        </div>
        {eventData.image && (
            <div className="mb-4">
            <label className="form-label-profile">Vista previa de la imagen del evento</label>
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

export default CreateForm;