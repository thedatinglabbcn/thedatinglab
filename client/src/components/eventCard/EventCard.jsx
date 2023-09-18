import React from 'react';
// import wineGlass from '../../assets/images/wineglass.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './EventCard.css';

function EventCard({event}) {
  return (
    <div className="card event-card" style={{ width: '15rem' }}>
            <img className="card-img-top" src="{wineGlass}" alt="Foto del evento" />
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
