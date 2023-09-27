import React, { useEffect, useState } from 'react';
import './MatchCard.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { MatchingService } from '../../service/MatchingService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';


function MatchCard() {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
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
        console.error('Error al cargar los matches:', error);
      }
    };

    fetchData();
  }, []);
 

  const navigateToPreviousMatch = () => {
    if (currentMatchIndex > 0) {
      setCurrentMatchIndex(currentMatchIndex - 1);
    }
  };

  const navigateToNextMatch = () => {
    if (currentMatchIndex < matchingUsers.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    }
  };
  console.log(navigateToNextMatch)

  return (
    <div>
      <Navbar />
      <div className='match-container'>
        <h1 className='match-title'>¡Tus matches!</h1>
        <center>
          <div className="match-carousel-container">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="arrow-icon-left"
              onClick={navigateToPreviousMatch}
            />
            <div className="match-carousel">
              {matchingUsers.map((user) => (
                <div className="match-card">
                  <img
                    src={`http://localhost:8000/storage/${user.image}`}
                    className="rounded-circle"
                    alt={`Tu match: ${user.name}`}
                  />
                  <h5 className="card-title text-center">{user.name}</h5>
                  <h6 className="card-text text-center text-muted">Coincidencia: {user.matchingPercentage}%</h6>
                  <p className="card-text text-center"><small>{user.description}</small></p>
                </div>
              ))}
            </div>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="arrow-icon-right"
              onClick={navigateToNextMatch}
            />
          </div>
        </center>
      </div>
      <Footer />
    </div>
  );  
}

export default MatchCard;