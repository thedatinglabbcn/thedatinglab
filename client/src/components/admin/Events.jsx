import React from 'react';
import './Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Events({event}) {
  return (
    <>

      <tbody>
          <tr className='dashboard-row' key={event.id}>
            <td>{event.id}</td>
            <td>
              <img
                className="dashboard-image"
                src={`http://localhost:8000/storage/${event.image}`}
                alt={event.title}
              />
            </td>
            <td>{event.title}</td>

            <td className='dashboard-actions'>
            <Link to="/dashboard/edit">
            <button className="edit-button">
              <FontAwesomeIcon icon={faFilePen} /> {/* Agrega el icono dentro del botón */}
            </button>
            </Link>
            <Link to="/dashboard/edit">
            <button className="delete-button">
              <FontAwesomeIcon icon={faTrash} /> {/* Agrega el icono dentro del botón */}
            </button>
            </Link>
            </td>
          </tr>
        
      </tbody>
      <hr />
  
    
    </>
  )
};

export default Events;
