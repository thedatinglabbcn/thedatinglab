import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faUserEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../service/AuthService';
import Swal from 'sweetalert2';

function DashboardUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      AuthService().getAllUsers()
      try {
        const res = await fetch('/api/admin/users');
        console.log(res);
        if (!res.ok) {
          throw new Error('No se pudieron cargar los usuarios');
        }
        const users = await res.json();
        setUsers(users);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };
    getUsers();
  }, []);
  

  const handleDeleteUser = async (userId) => {
    console.log('Eliminar usuario con ID:', userId);
    try {
      await AuthService.destroyUser(userId);
      console.log('Usuario eliminado con éxito');
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };
  

  const handleDeleteClick = (userId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#18b485',
      cancelButtonColor: '#E94445',
      customClass: {
        popup: 'custom-swal-background',
        confirmButton: 'custom-swal-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(userId);
        navigate('/dashboard/users');
      }
    });
  };

  return (
    <>
      <div className='admin-div'></div>
      <div className='new-user'>
        <Link to="/dashboard">
          <button className="back-button">
            <FontAwesomeIcon icon={faHome} />
          </button>
        </Link>
        <Link to="/dashboard/create-user">
          <button className="create-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Link>
      </div>
      <table className='dashboard-table'>
        <thead>
          <tr className='dashboard-row'>
            <th className='dashboard-column-id'>Id</th>
            <th className='dashboard-column'>Nombre</th>
            <th className='dashboard-column'>Correo Electrónico</th>
            <th className='dashboard-column'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr className='dashboard-row' key={user.id}>
                <td className='dashboard-column-id'>{user.id}</td>
                <td className='dashboard-column'>{user.name}</td>
                <td className='dashboard-column'>{user.email}</td>
                <td className='dashboard-column-buttons'>
                  <Link to={`/dashboard/edit-user/${user.id}`}>
                    <button className="edit-button-icon">
                      <FontAwesomeIcon icon={faUserEdit} />
                    </button>
                  </Link>
                  <button className="delete-button-icon" onClick={() => handleDeleteClick(user.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
                <td className='dashboard-column'>No hay usuarios disponibles</td>
              
            )}
            <tr>
              <td colSpan="4"><hr className='dashboard-line' /></td>
            </tr>
    </tbody>
      </table>
      <div className='admin-footer'></div>
    </>
  );
}

export default DashboardUsers;