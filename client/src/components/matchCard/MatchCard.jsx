import React from 'react';
import ProfilePicture from '../../assets/images/ProfilePicture.jpg';
import './MatchCard.css';

function MatchCard() {
  return (
    <div>
        <center>
        <div className="card border-0 pt-3 pb-3" style={{ width: '18rem'}}>
        <div className="card-img-top">    
        <center><img src={ProfilePicture} className="rounded-circle" alt="la persona con quien se ha hecho match"></img></center>
        </div>
        <div className="card-body">
            <h5 className="card-title text-center">Nombre del match, edad</h5>
            <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    </center>
    </div>
  )
}

export default MatchCard;