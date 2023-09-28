import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './EventCard.css';
import { Link } from 'react-router-dom';

function EventCard({event}) {

  return (
    <div className="event-card" style={{ width: '15rem' }}>
       <img className="card-img-top" src= {`http://localhost:8000/storage/${event.image}`} alt="sdsad" />
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <div className="card-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} className='location-icon' /> Barcelona
          </div>
          <Link
          to={`/event/${event.id}`}
          className="detail-button">
          Más Detalles
        </Link>
        </div>
    </div>
  )
};

export default EventCard;