import React from 'react';
import './Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';


function Events({event}) {
  return (
    <>
    <table className='dashboard-table'>
    <thead>
        <tr className='dashboard-row'>
          <th>ID</th>
          <th>Imagen</th>
          <th>Título</th>
          <th>Acciones</th>
        </tr>
      </thead>

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
              <button className="dashboard-edit">
              <FontAwesomeIcon icon={faFilePen}/>
                </button>
              <button className="dashboard-delete">
              <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        
      </tbody>
    </table>
    
    </>
  )
};

export default Events;
