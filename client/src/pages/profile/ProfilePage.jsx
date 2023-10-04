import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProfileService } from '../../service/ProfileService';
import Swal from 'sweetalert2';
import ProfileEditForm from '../../components/forms/ProfileEditForm';
import axios from '../../service/axiosConfig';
import { EventService } from '../../service/EventService';

function ProfilePage() {
  const { userId } = useParams();
  const { id } = useParams()
  console.log(id);
  const [profile, setProfile] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

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
        // EventService.getEventForUser(id)
        // .then((response) => {
        //   setRegisteredEvents(response.data);
        // })
        // .catch((error) => {
        //   console.error('Error al obtener los eventos:', error);
        // });
        
  }, [id]);

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
      {/* <div>
      <ul>
          {registeredEvents.map(event => (
              <li key={event.id}>
                  <Link to={`/event/${event.id}`}>{event.title}</Link>
              </li>
          ))}
      </ul>
      </div> */}
      <NavbarLogin  profileId={id}/>
     
    </div>
  );
}

export default ProfilePage;
