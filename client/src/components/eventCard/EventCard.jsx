import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './EventCard.css';
import axios from 'axios';


function EventCard({event}) {
  const [isAttending, setIsAttending] = useState(false);

  const handleAttendClick = () => {
    // En este ejemplo, simularemos la solicitud al servidor para registrar la asistencia
    axios.post('/event/${eventId}/attend', { eventId: event.id })
      .then((response) => {
        // Manejar la respuesta del servidor (puedes mostrar un mensaje de éxito)
        setIsAttending(true);
      })
      .catch((error) => {
        // Manejar errores, mostrar mensaje de error, etc.
        console.error('Error al confirmar asistencia:', error);
      });
  };
  return (
    <div className="card event-card" style={{ width: '15rem' }}>
      <img className="card-img-top" src= {`http://localhost:8000/storage/${event.image}`} alt="sdsad" />
      <div className="card-body">
        <div className="card-date">{event.date} {event.time}</div>
        <h5 className="card-title">{event.title}</h5>
        <p className="card-text">{event.description}</p>
        <div className="card-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className='location-icon' /> Barcelona
        </div>
        <a href="/payment-options" className="btn btn-primary attend-button">Asistir</a>
        {isAttending ? (
          <p>¡Asistencia Confirmada!</p>
        ) : (
          <button onClick={handleAttendClick} className="btn btn-primary attend-button">
            {isAttending ? 'Asistencia Confirmada' : 'Estoy Dentro'}
          </button>
        )}
      </div>
    </div>
  )
};

export default EventCard;