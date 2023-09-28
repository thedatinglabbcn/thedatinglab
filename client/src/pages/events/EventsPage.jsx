import { useEffect, useState } from 'react';
import { EventService } from './../../service/EventService'; 
import EventCard from '../../components/eventCard/EventCard';
import '../home/HomePage.css';
import Navbar from '../../components/navbar/Navbar';
import NavbarLogin from '../../components/navbar/NavbarLogin';
import Footer from '../../components/footer/Footer';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    EventService.getAllEvents()
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los eventos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar/>
      <section id="event-section">
        <h1 className='home-subtitle'>Experiencias</h1>
        {loading ? (
          <p>Cargando experiencias...</p>
        ) : (
       events.map((event, index) => (
        <EventCard key={index} event = {event}/>
        ))
        )}
      </section>
      <NavbarLogin/>
      <Footer/>
    </div>
  );
}

export default EventsPage;
