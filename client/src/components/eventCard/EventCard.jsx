import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './EventCard.css';

function EventCard({event}) {
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
        <a href="/" className="btn btn-primary attend-button">Asistir</a>
         </div>
    </div>
  )
};

export default EventCard;