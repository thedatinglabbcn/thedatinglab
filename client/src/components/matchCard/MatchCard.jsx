import React from 'react';
import './MatchCard.css';
import { useMatchingUsers } from '../../contexts/MatchingUsersContext';

function MatchCard() {

  const { matchingUsers } = useMatchingUsers();
  console.log(matchingUsers)

  return (
    <div>
      <center>
        {matchingUsers.map((user) => (
          <div className="card border-0 pt-3 pb-3" style={{ width: '18rem'}} key={user.id}>
            <div className="card-img-top">    
              <center><img src={`/storage/images/${user.image}`} className="rounded-circle" alt={`La persona con quien se ha hecho match ${user.name}`} /></center>
            </div>
            <div className="card-body">
              <h5 className="card-title text-center">{user.name}</h5>
              <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
          </div>
        ))}
      </center>
    </div>
  )
}

export default MatchCard;