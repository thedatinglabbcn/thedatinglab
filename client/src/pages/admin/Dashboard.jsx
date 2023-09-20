import { EventService } from '../../service/EventService';
import React, { useState, useEffect } from 'react';
import Events from "../../components/admin/Events";


function Dashboard() {

  const [events, setEvents] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  

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
        <Events key={index} event = {event}/>
        ))
      }
    </>
  )
} 

export default Dashboard;
