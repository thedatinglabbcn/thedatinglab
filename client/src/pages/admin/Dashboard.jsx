import { EventService } from '../../service/EventService';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import '../../components/admin/Events.css';



function Dashboard() {

  return (
    <>
    <div className='admin-nav'>
        <h1 className='dashboard-title'>Panel de Admin</h1>
    </div>
    <div className='dashboard-container'>
      <button className='deshboard-buttons'>  
        <Link className='deshboard-links' to="/dashboard/events">Administrar Eventos</Link>
        </button>
      <button className='deshboard-buttons'> 
        <Link className='deshboard-links' to="/dashboard/users">Administrar Usuarios</Link>
        </button>
    </div>
    </>
  )
} 

export default Dashboard;
