import { EventService } from '../../service/EventService';
import React, { useState, useEffect, useRef } from 'react';
import EventCard from "../../components/eventCard/EventCard";
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import Footer from '../../components/footer/Footer';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import SwipeIcon from '../../assets/images/swipe-icon.svg';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomePage() {
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [events, setEvents] = useState ([]); 
  const navigate = useNavigate();
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


useEffect(() =>{
  const api = EventService();
   api.getAllEvents().then(res => {
      setEvents(res.data);
      setLoadingEvents(false); 
      })
      .catch(error => {
        console.error('Error al cargar eventos:', error);
        setLoadingEvents(false); 
      });

}, []);

  return (
    <div className='home-body'>
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          
          <h1 className='home-title'>Donde los <span className='home-bold'>sentidos</span> encuentran el <span className='home-bold'>amor</span></h1>
          <p>Creemos en la compatibilidad emocional como la base de relaciones sólidas.</p>
          <button type="button" className="button-start"  onClick={() => navigate('/register')}>
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
          <button type="button" className="button-start"  onClick={() => navigate('/register')}>
              Empezar ahora
            </button>
        </div>
      </section>
      <section  className="event-section" id="event-section">
        <h1 className='home-subtitle'>Experiencias</h1>
        <div className="event-carousel-container">
       <div className="arrow-left">
  <FontAwesomeIcon icon={faArrowLeft} />
</div>
<div className="arrow-right">
  <FontAwesomeIcon icon={faArrowRight} />
</div>
          <div className="event-carousel-content">
            {events.map((event, index) => (
              <div key={index} className="event-carousel-item">
                <EventCard event={event} />
                
              </div>
            ))}
          
          </div>
          
        </div>
      </section>
      <div
        ref={swipeIconRef}
        className={`swipe-icon ${isVisible ? 'visible' : 'hidden'}`}
      >
      <img className='swipe-icon' src={SwipeIcon} alt="Mano con flecha hacia izquierda y derecha" />
      </div>
      <p className='swipe-text'>Desliza para ver más eventos</p>
      <Footer/>
      <NavbarLogin />

    </div>
  )
} 

export default HomePage;
