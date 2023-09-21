import { EventService } from '../../service/EventService';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import '../../components/admin/Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';


function Dashboard() {

  return (
    <>
    <div className='admin-nav'>
        <h1 className='dashboard-title'>Panel de Admin</h1>
    </div>
    <div className='dashboard-container'>
    <button className='dashboard-buttons'>
        <Link className='dashboard-links' to="/dashboard/events">
          <FontAwesomeIcon icon={faCalendarAlt} /><br />
          Administrar Eventos
        </Link>
      </button>
      <button className='dashboard-buttons'>
        <Link className='dashboard-links' to="/dashboard/users">
          <FontAwesomeIcon icon={faUser} /><br />
          Administrar Usuarios
        </Link>
      </button>
    </div>
    </>
  )
} 

export default Dashboard;
