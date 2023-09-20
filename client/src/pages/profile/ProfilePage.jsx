import React from 'react'
import ProfilePicture from '../../assets/images/ProfilePicture.jpg';
import EditPic from '../../assets/images/EditPic.svg';
import './ProfilePage.css'; 
import Button from '../../components/button/Button'
import Footer from '../../components/footer/Footer'
import { useAuth } from '../../contexts/AuthContent';


function ProfilePage() {
    const { user } = useAuth();
  return (
    <div>
        <center>
            <div className="card border-0 pt-3 pb-3" style={{ width: '18rem'}}>
                <div className="card-img-top">    
                    <center><img src={ProfilePicture} className="rounded-circle" alt="la persona con quien se ha hecho match"></img></center>
                    <span><img className="editpic" src={EditPic} alt="icono para editar"></img></span>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center">Nombre del match, edad</h5> 
                    
                    <p className="card-text text-center"> Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
                <center><Button backgroundColorClass="bttn-primary" text="Editar" /></center>    
            </div>
        </center>
    </div>
  )
}

export default ProfilePage