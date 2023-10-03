import React, { useEffect, useState } from 'react';
import { EventService } from './../../service/EventService'; 
import EventCard from '../../components/eventCard/EventCard';
import '../home/HomePage.css';
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import './EventSlider.css';

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    EventService.getAllEvents()
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
      <section id="event-section">
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
      
   
    </div>
    <p className='swipe-text'>Dezliza a la derecha para ver más eventos</p>
    <NavbarLogin />
    </div>
  );
}

export default EventsPage;
