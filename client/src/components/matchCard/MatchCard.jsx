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
  const [noPreferencesError, setNoPreferencesError] = useState(false);
  const [noMatchesError, setNoMatchesError] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const navigate = useNavigate();

  const filteredMatches = matchingUsers.filter((user) => user.matchingPercentage >= 60);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matches = MatchingService();
        const response = await matches.getAllMatches();
        // console.log(response.data);

        if (Array.isArray(response.data.matches)) {
          setMatchingUsers(response.data.matches);
        } else {
          setError('La respuesta no es un arreglo válido');
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 404 && error.response.data.type === 'preferences') {
          setNoPreferencesError(true);
        } else if (error.response.status === 404 && error.response.data.type === 'matches') {
          setNoMatchesError(true);
        } else {
          setError(error.response.data.message);
        }
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

  return (
    <div>
      <Navbar />
      <div className='match-container'>
        <h1 className='match-title'>¡Tus matches!</h1>
        <center>
          {filteredMatches.length === 0 ? (
            <h3 className="card-text text-center text-danger">
              Sin coincidencias por ahora... ¡Vuelve a comprobarlo más tarde!
              <p>
                <button
                  type="button"
                  className="button-cancel"
                  style={{ marginTop: '10px' }}
                  onClick={() => navigate('/')}
                >
                  Eventos
                </button>
              </p>
            </h3>
          ) : (
            <div className="match-carousel-container">
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="arrow-icon-left"
                onClick={navigateToPreviousMatch}
              />
              <div className="match-carousel">
                {filteredMatches.map((user) => (
                  <div className="match-card" key={user.id}>
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
          )}
        </center>
      </div>
      <Footer />
    </div>
  );
}

export default MatchCard;