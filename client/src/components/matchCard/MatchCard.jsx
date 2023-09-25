import React from 'react';
import './MatchCard.css';
import { useMatchingUsers } from '../../contexts/MatchingUsersContext';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function MatchCard() {

  const { matchingUsers } = useMatchingUsers();
  console.log(matchingUsers)

  return (
    <div>
    <Navbar />
    <div className='match-container'>
      <h1 className='match-title'>Tus match!</h1>
      <center>
        {matchingUsers.map((user) => (
          <div className="match-profile" style={{ width: '18rem'}} key={user.id}>
            <div className="card-img-top">    
              <center><img src= {`http://localhost:8000/storage/${user.image}`} className="rounded-circle" alt={`La persona con quien se ha hecho match ${user.name}`} /></center>
            </div>
            <div className="match-body">
              <h5 className="card-title text-center">{user.name}</h5>
              <p className="card-text text-center">35 años</p>
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