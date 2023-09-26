import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ProfileService } from '../../service/ProfileService';

function ProfilePage() {
  
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileService = ProfileService();
        const response = await profileService.getProfile(id);
        console.log(response);
        setProfile(response.profile);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  
  // Obtener el nombre del usuario o una cadena vacía si no existe
  const userName = profile && profile.user ? profile.user.name : '';

  return (
    <div>
      <Navbar />
      <div className='match-container'>
        <h1 className='match-title'>¡Hola, {userName}!</h1>
        <center>
          <div className="match-profile" style={{ width: '18rem'}}>
            <div className="card-img-top">
              <center><img src={`http://localhost:8000/storage/${profile && profile.image}`} className="rounded-circle" alt={`Tu foto de perfil`} /></center>
            </div>
            <div className="match-body">
              <p className="card-text text-center"><small>{profile && profile.description}</small></p>
            </div>
          </div>
        </center>
        <center>
        <button type="button" className="button-cancel" onClick={() => navigate(`/profile/${id}/edit`)}>Editar</button>
        </center>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
