import React from 'react';
import wineGlass from '../../assets/images/wineglass.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './EventCard.css';

function EventCard() {
  return (
    <div className="card event-card" style={{ width: '15rem' }}>
            <img className="card-img-top" src={wineGlass} alt="Foto del evento" />
        <div className="card-body">
        <div className="card-date">DOM, 17 SEPT 19:00</div>
        <h5 className="card-title">Cata de Vinos</h5>
        <h6 className="card-subtitle mb-2">Descubre el Placer en común</h6>
        <p className="card-text">¡El vino es el vínculo perfecto para crear conexiones duraderas!</p>
        <div className="card-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} className='location-icon' /> Barcelona
        </div>
        <a href="/" className="btn btn-primary attend-button">Asistir</a>
         </div>
    </div>
  )
};

export default EventCard;