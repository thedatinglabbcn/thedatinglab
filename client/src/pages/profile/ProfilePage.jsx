import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import Footer from '../../components/footer/Footer';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ProfileService } from '../../service/ProfileService';
import Swal from 'sweetalert2';
import ProfileEditForm from '../../components/forms/ProfileEditForm';

function ProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const userId = localStorage.getItem('user_id');
 
 useEffect(() => {
      ProfileService().getProfile(userId)
        .then(response => {
          console.log(response);
          if (response.profile) {
            setProfile(response.profile);
          }
        })
        .catch(error => {
          console.error(error);
        }); 

    const profileService = ProfileService(userId);

    profileService.getProfile(userId) 
      .then(registeredEventsResponse => {
        setRegisteredEvents(registeredEventsResponse);
      })
      .catch(error => {
        console.log(error);
      });
  }, [userId]);

const userName = profile && profile.user ? profile.user.name : '';

  return (
    <div className='profile-container'>
      <Navbar />
      <div className='match-container'>
        <h1 className='match-title'>¡Hola, {userName}!</h1>
        <center>
          <div className="match-profile" style={{ width: '18rem'}}>
            <div className="card-img-top">
              <center><img src={`http://localhost:8000/storage/${profile && profile.image}`} className="rounded-circle" alt={`Tu foto de perfil`} /></center>
            </div>
            <div className="match-body">
              <p className="preference-text">{profile && profile.description}</p>
            </div>
            <div className="match-body">
              <p className="preference-text">Momento vital: <small>{profile && profile.vitalMoment}</small></p>
            </div>
          </div>
        </center>
        <center>
          <button type="button" className="button-cancel" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </center>
        {isEditing && (
          <ProfileEditForm profile={profile} id={id} setIsEditing={setIsEditing} />
        )}
      </div>
      <div className='registered-events-container'>
      <h2 className='registered-events-title'>Eventos Registrados</h2>
      {registeredEvents.length > 0 ? (
        <ul className='registered-events-list'>
          {registeredEvents.map(event => (
            <li key={event.id}>
              <Link to={`/event/${event.id}`}>{event.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes eventos registrados.</p>
      )}
    </div>
      <NavbarLogin />
     
    </div>
  );
}

export default ProfilePage;
