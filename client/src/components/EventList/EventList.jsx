import React from 'react';
import './EventList.scss';
import { TextField } from '@mui/material';
import { useState,useEffect } from 'react';
import EventCard from '../EventCard/EventCard';
import BlueButton from '../BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const EventList = () => {
  document.title = "HH | Events"

  const navigate = useNavigate();
  const [eventSearch, setEventsSearch] = useState("");
  const [fetchedEvents, setFetchedEvents] = useState([]);

  const fetchEvents = async()=>{
    const data = await axios.get("http://localhost:5000/events/")
    .catch((e)=>{
      if(e.response){
        console.log(e.response);
      }else{
        console.log(e.message);
      }
    });
    console.log(data?.data?.message);
    console.log(data?.data?.result);
    setFetchedEvents(data?.data?.result);
  }

  // navigate to event adding page
  const addNewEvent = (e) => {
    e.preventDefault();
    navigate('/new/event');
  }

  useEffect(()=>{
    fetchEvents();
  },[]);

  return (
    <section className="event-raise-container" >
      <header>
        <TextField
          id="outlined-search"
          className="search-field"
          value={eventSearch}
          onChange={(e) => setEventsSearch(e.target.value)}
          type="search"
          label="Search event"
        />
        <BlueButton
           text={"Add new event"}
           handleClick={addNewEvent}
        />

      </header>

      <section className="event-list-container">
        <h1>Events you can attend</h1>
        <ul className='event-list'>
          {
            fetchedEvents?.length > 0 ?
              fetchedEvents?.map((event, index) => (
                event?.name?.toLowerCase().includes((eventSearch.toLowerCase())) ?
                  <EventCard
                    key={index}
                    event={event}
                    />
                  :
                  ""
              ))
              :
              <>
                <p className='no-event-raise-message'>No events to show</p>
              </>
          }
        </ul>
      </section>
    </section>
  )
}

export default EventList;
