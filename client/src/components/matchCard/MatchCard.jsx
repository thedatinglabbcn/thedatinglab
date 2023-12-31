import React, { useEffect, useState, useRef } from 'react';
import './MatchCard.css';
import Navbar from '../navbar/Navbar';
import { MatchingService } from '../../service/MatchingService';
import NavbarLogin from '../navbar/NavbarLogin';
import SwipeIcon from '../../assets/images/swipe-icon.svg';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MatchCard() {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const swipeIconRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      setIsVisible(entry.isIntersecting);
    });

    if (swipeIconRef.current) {
      observer.observe(swipeIconRef.current);
    }

    return () => {
      if (swipeIconRef.current) {
        observer.unobserve(swipeIconRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matches = MatchingService();
        const response = await matches.getAllMatches();

        if (Array.isArray(response.data.matches)) {
          setMatchingUsers(response.data.matches);
        }
      } catch (error) {
        handleFetchError(error);
      }
    };

    fetchData();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 404 && error.response.data && error.response.data.type === 'preferences') {
      console.log(error.response.status);
    } else {
      console.error(error);
    }
  };

  const minMatchPercentage = 70;
  const filteredMatches = matchingUsers.filter((user) => user.matchingPercentage >= minMatchPercentage);

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
};

  return (
    <div>
      <Navbar />
      <div className='match-container'>
        <h1 className='match-title'>¡Tus matches!</h1>
        <center>
          {filteredMatches.length === 0 ? (
            <div>
              <p className="matches-text">
                Sin coincidencias por ahora... ¡Vuelve a comprobarlo más tarde!
              </p>
              
            </div>
          ) : (
            <div className="match-carousel-container">
            
              <div className="match-carousel">
                {filteredMatches.map((user) => (
                  <div className="match-card" key={user.id}>
                    <img
                      src={`http://localhost:8000/storage/${user.image}`}
                      className="rounded-circle"
                      alt={`Tu match: ${user.name}`}
                    />
                    <h5 className="card-title text-center">{user.name}, <small>{calculateAge(user.birthdate)}</small></h5>
                    <h6 className="porcentage-match">Coincidencia: {user.matchingPercentage}%</h6>
                    <p className="card-text text-center"><small>{user.description}</small></p>
                  </div>
                ))}
              </div>
             
            </div>
          )}
        </center>
        
      </div>
      <div
        ref={swipeIconRef}
        className={`swipe-icon-match ${isVisible ? 'visible' : 'hidden'}`}
      >
      <img className='swipe-icon' src={SwipeIcon} alt="Mano con flecha hacia izquierda y derecha" />
      </div>
      <div className="arrow-left">
  <FontAwesomeIcon icon={faArrowLeft} />
</div>
<div className="arrow-right">
  <FontAwesomeIcon icon={faArrowRight} />
</div>
      <p className='swipe-text'>Desliza para ver más matches</p>
   <NavbarLogin/>
    </div>
  );
}

export default MatchCard;