import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import '../../components/admin/Events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../service/AuthService';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  function handleLogout() {
    AuthService().logout()
      .then((response) => {
        if (response.status === 200) {
          navigate('/admin-login');
        } else {
          console.error('El servidor respondió con un estado diferente de 200:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error al realizar el logout:', error);
      });
  }


  return (
    <>
    <div className='admin-nav'>
        <h1 className='dashboard-title'>Panel de Admin</h1>
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
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
