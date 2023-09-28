import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventService } from '../../service/EventService';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './../../components/eventCard/EventCard.css';

function EventDetail() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    EventService.getEvent(eventId)
      .then((response) => {
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del evento:', error);
      });
  }, [eventId]);

  const handleAttendClick = () => {
    if (!token) {
      Swal.fire({
        title: 'Debes iniciar sesión para asistir',
        text: '¿Deseas iniciar sesión ahora?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, iniciar sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
         
          navigate('/login');
        }
      });
    } else {
      
      navigate(`/payment/${eventId}`);
    }
  };

  return (
    <div>
      {eventDetails ? (
        <div className="card event-card" style={{ width: '15rem' }}>
          <img className="card-img-top" src={`http://localhost:8000/storage/${eventDetails.image}`} alt="sdsad" />
          <div className="card-body">
            <div className="card-date">{eventDetails.date} {eventDetails.time}</div>
            <h5 className="card-title">{eventDetails.title}</h5>
            <p className="card-text">{eventDetails.description}</p>
            <div className="card-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} className='location-icon' /> Barcelona
            </div>
            <a onClick={handleAttendClick} className="btn btn-primary attend-button">Asistir</a>
          </div>
        </div>
      ) : (
        <p>Cargando detalles del evento...</p>
      )}
    </div>
  );
}

export default EventDetail;

