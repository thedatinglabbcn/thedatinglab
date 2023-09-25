import React, { useEffect, useState } from 'react';
import './MatchCard.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { MatchingService } from '../../service/MatchingService';
import { useNavigate } from 'react-router-dom';

function MatchCard() {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matches = MatchingService();
        const response = await matches.getAllMatches();
        console.log(response.data);

        if (Array.isArray(response.data.matches)) {
          setMatchingUsers(response.data.matches);
        } else {
          setError('La respuesta no es un arreglo válido');
        }
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <Navbar />
      <div className='match-container'>
        <h1 className='match-title'>¡Tus matches!</h1>
        <center>
          {error && <p className="card-text text-center text-danger">{error} <button type="button" className="button-cancel" style={{ marginTop: '10px' }} onClick={() => navigate('/preferences')}>Formulario</button></p>}
          {matchingUsers.map((user) => (
            <div className="match-profile" style={{ width: '18rem'}} key={user.id}>
              <div className="card-img-top">    
                <center><img src={`http://localhost:8000/storage/${user.image}`} className="rounded-circle" alt={`Tu match: ${user.name}`} /></center>
              </div>
              <div className="match-body">
                <h5 className="card-title text-center">{user.name}</h5>
                <h6 className="card-text text-center text-muted">Coincidencia: {user.matchingPercentage}%</h6>
                <p className="card-text text-center"><small>{user.description}</small></p>
              </div>
            </div>
          ))}
        </center>
      </div>
      <Footer/>
    </div>
  )
}

export default MatchCard;
