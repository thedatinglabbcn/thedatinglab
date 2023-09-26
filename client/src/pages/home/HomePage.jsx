import { EventService } from '../../service/EventService';
import React, { useState, useEffect } from 'react';
import EventCard from "../../components/eventCard/EventCard";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './HomePage.css';


function HomePage() {

  const [events, setEvents] = useState ([]); 
  

useEffect(() =>{
  const api = EventService;
   api.getAllEvents().then(res => {
      setEvents(res.data);
   })

}, []);
 
 

  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1 className='home-title'>Donde los sentidos encuentran el amor</h1>
          <p>Creemos en la compatibilidad emocional como la base de relaciones sólidas.</p>
          <button type="button" className="button-start"  onClick={() => window.location.href = '/register'}>
              ¿Te apuntas?
            </button>
        </div>
      </section>

      <section className="how-it-works">
        <div className="how-it-works-content">
          <h2 className='home-subtitle'>¿Cómo funciona?</h2>
          <ol>
            <li>Completa el formulario de compatibilidad emocional.</li>
            <li>Recibe tus match personalizados.</li>
            <li>Únete a nuestros emocionantes eventos basados en tus intereses.</li>
            <li>Pagarás por asistir a los eventos y así conocer a tus match.</li>
            <li>Disfruta de citas significativas y experiencias sensoriales.</li>
          </ol>
          <button type="button" className="button-start"  onClick={() => window.location.href = '/register'}>
              Empezar ahora
            </button>
        </div>
      </section>
      <section id="event-section">
        <h1 className='home-subtitle'>Experiencias</h1>
      { events.map((event, index) => (
        <EventCard key={index} event = {event}/>
        ))
      }
      </section>
    <Footer/>
    </>
  )
} 

export default HomePage;
