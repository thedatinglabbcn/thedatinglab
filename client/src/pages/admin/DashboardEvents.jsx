import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import '../../components/admin/Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from 'react-router-dom';
import { EventService } from '../../service/EventService';
import Swal from 'sweetalert2';
import { StorageService } from '../../service/StorageService';

function DashboardEvents() {
  const [events, setEvents] = useState([]);
  const navigate =  useNavigate();

  useEffect(() => {
    EventService().getAllEvents()
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
  
  const handleDeleteClick = (eventId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el evento permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#18b485',
      cancelButtonColor: '#E94445',
            customClass: {
              popup: 'custom-swal-background',
              confirmButton: 'custom-swal-button',
            }
      }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteEvent(eventId);
        navigate('/dashboard/events');
      }
    });
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
      <th className='dashboard-column-id'>Id</th>
      <th className='dashboard-column-image'>Imagen</th>
      <th className='dashboard-column'>Título</th>
      <th className='dashboard-column'>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {events.map((event) => (
      <React.Fragment key={event.id}>
        <tr className='dashboard-row'>
          <td className='dashboard-column-id'>{event.id}</td>
          <td className='dashboard-column-image'>
            <img
              className="dashboard-image"
              src={`${StorageService}/${event.image}`}
              alt={event.title}
            />
          </td>
          <td className='dashboard-column'>{event.title}</td>
          <td className='dashboard-column-buttons'>
            <Link to={`/dashboard/edit/${event.id}`}>
              <button className="edit-button-icon">
                <FontAwesomeIcon icon={faFilePen} />
              </button>
            </Link>
            <button className="delete-button-icon" onClick={() => handleDeleteClick(event.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        </tr>
        <tr className='dashboard-line'>
          <td colSpan="4"></td>
        </tr>
      </React.Fragment>
    ))}
  </tbody>
</table>
      <div className='admin-footer'></div>
    </>
  );
}

export default DashboardEvents;
