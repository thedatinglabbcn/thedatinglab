import React from 'react';
import './Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { StorageService } from '../../service/storageService';

function Events({event, onDelete}) {
  const handleDeleteClick = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el evento permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(event.id);
        Swal.fire('Eliminado', 'El evento ha sido eliminado con éxito', 'success');
      }
    });
  };
  return (
    <>
<table className='dashboard-table'>
      <tbody>
          <tr className='dashboard-row' key={event.id}>
            <td>{event.id}</td>
            <td>
              <img
                className="dashboard-image"
                src={`${StorageService/event.image}`}
                alt={event.title}
              />
            </td>
            <td>{event.title}</td>
            

            <td className='dashboard-actions'>
            <Link to={`/dashboard/edit/${event.id}`}>
            <button className="edit-button-icon">
              <FontAwesomeIcon icon={faFilePen} />
            </button>
            </Link>
            <Link to="/dashboard/events">
            <button className="delete-button-icon" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            </Link>
            </td>
          </tr>
        
      </tbody>
      </table>
      <hr />
  
    
    </>
  )
};

export default Events;
