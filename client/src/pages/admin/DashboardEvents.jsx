import React, { useState, useEffect } from 'react';
import Events from "../../components/admin/Events";
import './Dashboard.css';
import '../../components/admin/Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { EventService } from '../../service/EventService';


function DashboardEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getAllEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.error('Error al cargar los eventos:', error);
      });
  }, []);

  const handleDeleteEvent = async (eventId) => {
    console.log('Eliminar evento con ID:', eventId);
    try {
      await EventService.destroyEvent(eventId);
      console.log('Evento eliminado con éxito');
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar evento:', error);
    }
  };

  return (
    <>
      <div className='admin-div'></div>
      <div className='new-event'>
        <Link to="/dashboard">
          <button className="back-button">
            <FontAwesomeIcon icon={faHome} />
          </button>
        </Link>
        <Link to="/dashboard/create">
          <button className="create-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Link>
      </div>
      <table className='dashboard-table'>
        <thead>
          <tr className='dashboard-row'>
            <th>Id</th>
            <th>Imagen</th>
            <th>Título</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <Events key={event.id} event={event} onDelete={handleDeleteEvent} />
          ))}
        </tbody>
      </table>
      <div className='admin-footer'></div>
    </>
  );
}

export default DashboardEvents;
