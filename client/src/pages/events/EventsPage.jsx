import React, { useState, useEffect, useRef } from 'react';
import { EventService } from './../../service/EventService'; 
import EventCard from '../../components/eventCard/EventCard';
import '../home/HomePage.css';
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import './EventSlider.css';
import SwipeIcon from '../../assets/images/swipe-icon.svg';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { urlStorage } from '../../service/EventService';


function EventsPage() {
  const [events, setEvents] = useState([]);
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
    EventService().getAllEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.error('Error al cargar los eventos:', error);
      });
  }, []);

  return (
    <div>
    <div>
      <Navbar />
      <section className='event-section' id="event-section">
        <h1 className='home-subtitle'>Experiencias</h1>
        <div className="event-carousel-container">
          <div className="event-carousel-content">
            {events.map((event, index) => (
              <div key={index} className="event-carousel-item">
                <EventCard event={event} />
              </div>
            ))}
            
          </div>
          
        </div>
        
      </section>
      <div className="arrow-left">
  <FontAwesomeIcon icon={faArrowLeft} />
</div>
<div className="arrow-right">
  <FontAwesomeIcon icon={faArrowRight} />
</div>
      <div
        ref={swipeIconRef}
        className={`swipe-icon ${isVisible ? 'visible' : 'hidden'}`}
      >
      <img className='swipe-icon' src={SwipeIcon} alt="Mano con flecha hacia izquierda y derecha" />
      </div>
   
    </div>
    <p className='swipe-text'>Dezliza para ver más eventos</p>
    <NavbarLogin />
    </div>
  );
}

export default EventsPage;
