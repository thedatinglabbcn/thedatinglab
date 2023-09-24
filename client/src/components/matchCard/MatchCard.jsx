import React, { useEffect, useState } from 'react';
import './MatchCard.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { MatchingService } from '../../service/MatchingService';

function MatchCard() {
  const [matchingUsers, setMatchingUsers] = useState([]);

  useEffect(() => {
    // Llama al servicio en useEffect
    const fetchData = async () => {
      try {
        const matches = MatchingService();
        const response = await matches.getAllMatches();
        console.log(response.data);

        // Verifica si la respuesta tiene la propiedad matching_users y es un arreglo
        if (Array.isArray(response.data.matches)) {
          setMatchingUsers(response.data.matches);
        } else {
          console.error('La respuesta no es un arreglo válido:', response.data);
        }
      } catch (error) {
        // Maneja errores aquí
        console.error(error);
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
        {matchingUsers.map((user) => (
            <div className="match-profile" style={{ width: '18rem'}} key={user.id}>
              <div className="card-img-top">    
                <center><img src={`http://localhost:8000/storage/${user.image}`} className="rounded-circle" alt={`Tu match: ${user.name}`} /></center>
              </div>
              <div className="match-body">
                <h5 className="card-title text-center">{user.name}</h5>
                <h6 className="card-text text-center">Porcentaje: {user.matchingPercentage}%</h6>
                <p className="card-text text-center">{user.description}</p>
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
