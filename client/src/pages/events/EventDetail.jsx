import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventService } from '../../service/EventService';
import './EventDetail.css';
import Navbar from '../../components/navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './../../components/eventCard/EventCard.css';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import Swal from 'sweetalert2';
import axios from '../../service/axiosConfig';
import { StorageService } from '../../service/storageService';

function EventDetail() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const token = localStorage.getItem('auth_token');
  

  useEffect(() => {
    EventService.getEvent(eventId)
      .then((response) => {
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del evento:', error);
      });

      EventService.getEventAttendees(eventId)
      .then((response) => {
        setAttendees(response.data.attendees);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de asistentes:', error);
      });
  }, [eventId]);

  const handleAttendClick = () => {
    if (!token) {
      Swal.fire({
        title: 'Debes registrarte para asistir',
        text: '¿Deseas registrarte sesión ahora?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Registrarme',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#18b485',
        cancelButtonColor: '#ED696B',
        customClass: {
          popup: 'custom-swal-background',
          confirmButton: 'custom-swal-button',
        }
      }).then((result) => {
        if (result.isConfirmed) {
         
          navigate('/register');
        }
      });
    } else {
      
      navigate(`/payment/${eventId}`);
    }
  };

  return (
    <div>
        <Navbar/>
      {eventDetails ? (
        <div className="event-detail">
          <img className="detail-img-top" src={`${StorageService/eventDetails.image}`} alt={eventDetails.title} />
          <div className="detail-body">
            <div className="detail-date">{eventDetails.date} {eventDetails.time}</div>
            <h5 className="detail-title">{eventDetails.title}</h5>
            <p className="detail-text">{eventDetails.description}</p>
            <div className="detail-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} className='location-icon' /> Barcelona
            </div>
            <a onClick={handleAttendClick} className="detail-button">Quiero Asistir</a>
          </div>
          <div className="attendee-container">
            <h5>Asistentes:</h5>
            <div className="attendee-preview">
            {attendees && attendees.length > 0 ? (
                attendees.map((attendee) => (
                  <div key={attendee.id} className="attendee-info">
                    <img
                    src={`${axios + attendee?.profile?.image}`}
                    alt={attendee.name}
                    className="attendee-image"
                    />
                    <span className="attendee-text">{attendee.name}</span>
                  </div>
              ))
            ):(
              <p className='card-text'>Todavía no hay asistentes a este evento.</p>)}
            </div>

          </div>
        </div>
      ) : (
        <p cal>Cargando detalles del evento...</p>
      )}
        <NavbarLogin />
    </div>
  );
}

export default EventDetail;

