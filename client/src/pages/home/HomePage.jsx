import { EventService } from '../../service/EventService';
import React, { useState, useEffect } from 'react';
import EventCard from "../../components/eventCard/EventCard";


function HomePage() {

  const [events, setEvents] = useState ([]); 
  

useEffect(() =>{
  const api = EventService();
   api.getAllEvents().then(res => {
      setEvents(res.data);
   })

}, []);
 
 

  return (
    <>
      {
        events.map((event, index) => (
        <EventCard key={index} event = {event}/>
        ))
      }
    </>
  )
} 

export default HomePage;
