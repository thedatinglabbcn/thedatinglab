import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProfileService } from '../../service/ProfileService';
import ProfileEditForm from '../../components/forms/ProfileEditForm';
import { EventService } from '../../service/EventService';

function ProfilePage() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null);
  const [event, setEvent ] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const user_id = localStorage.getItem('id');

    useEffect(() => {
      ProfileService().getProfile(id)
        .then(response => {
          console.log(response);
          if (response.profile) {
            setProfile(response.profile);
          }
        })
        .catch(error => {
          console.error(error);
        });
        EventService.getEventForUser(user_id)
        .then((response) => {
          setEvent(response.data.event);
          console.log('Eventos:', response);
      })
        .catch((error) => {
          console.error('Error al obtener los eventos:', error);
        });
        
  }, []);

  const userName = profile && profile.user ? profile.user.name : '';
  const userDescription = profile && profile.description ? profile.description : '';

  return (
    <div className='profile-container'>
      <Navbar />
      <div className='match-container'>
        <h1 className='match-title'>¡Hola, {userName}!</h1>
        <center>
          <div className="match-profile" style={{ width: '18rem'}}>
            <div className="card-img-top">
              <center><img src={`http://localhost:8000/storage/${profile && profile.image ? profile.image : ''}`} className="rounded-circle" alt={`Tu foto de perfil`} /></center>
            </div>
            <div className="match-body">
            <p className="profile-subtitle">Sobre mí</p>
              <p className="profile-texts">{profile && profile.description}</p>
            </div>
            <hr className="separator"/>
            <div className="match-body">
              <p className="profile-subtitle">Mi momento vital</p>
              <p className='profile-texts'><small>{profile && profile.vitalMoment}</small></p>
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
      <div className="event-title">
      
        <h3>Eventos a los que asistirás</h3>
        {event && event.length > 0 ? (
          event.map((eventItem) => (
            <div className='event-preview-container' key={eventItem.id}>
              <Link to={`/event/${eventItem.id}`}>
                <img
                  src={`http://localhost:8000/storage/${eventItem.image}`}
                  alt={eventItem.title}
                  className="event-preview-img"
                />
                <span className='event-preview-text'>{eventItem.title}</span>
              </Link>
            </div>
          ))
        ) : (
          <p className='card-text'>No tienes eventos registrados.</p>
        )}
      </div>
      <NavbarLogin  profileId={id}/> 
    </div>
  );
}

export default ProfilePage;
