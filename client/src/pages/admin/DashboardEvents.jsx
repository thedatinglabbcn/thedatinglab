import { EventService } from '../../service/EventService';
import React, { useState, useEffect } from 'react';
import Events from "../../components/admin/Events";
import './Dashboard.css';
import '../../components/admin/Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';




function Dashboard() {

  const [events, setEvents] = useState([]);
  

useEffect(() =>{
  const api = EventService();
   api.getAllEvents().then(res => {
      setEvents(res.data);
   })

}, []);

const handleDeleteEvent = async ($eventId) => {
  console.log('Eliminar evento con ID:', $eventId);
  try {
    const api = EventService();
    await api.destroyEvent($eventId);
    console.log('Evento eliminado con éxito');
    // Recarga la página una vez que se elimina el evento
    window.location.reload();
  } catch (error) {
    console.error('Error al eliminar evento:', error);
  }
};


  return (
    <>
    <div className='admin-nav'>
     <h1>Panel de Admin</h1>
     </div>
     <div className='new-event'>
     <Link to="/dashboard/create">
            <button className="create-button">
              <FontAwesomeIcon icon={faPlus} /> {/* Agrega el icono dentro del botón */}
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
    </table>
      
    
      {
        events.map((event, index) => (
        <Events key={index} 
        event = {event}
        onDelete={handleDeleteEvent}/>
        ))
      }

 
     
    </>
  )
} 

export default Dashboard;
