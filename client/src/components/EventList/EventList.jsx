import React from 'react';
import './EventList.scss';
import { TextField } from '@mui/material';
import { useState,useEffect } from 'react';
import EventCard from '../EventCard/EventCard';
import BlueButton from '../BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { MoonLoader } from 'react-spinners';

const EventList = () => {
  document.title = "HH | Events"

  const navigate = useNavigate();
  const [eventSearch, setEventsSearch] = useState("");
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async()=>{
    setLoading(true);
    const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/events`,{withCredentials:true});
    if(!data?.data){
      console.log(data?.data?.message);
    }
    console.log(data);
    setFetchedEvents(data?.data);
    setLoading(false);
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
            fetchedEvents?.length >=1 ?
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
                {!loading  && (<p className='result-message'>No events to show</p>)}
              </>
          }
            {loading && (
              <>
                <div style={{ height: "fitContent", display: "grid", placeContent: 'center' }}>
                  <MoonLoader size={80} color="#067676" />
                </div>
              </>)
            }
        </ul>
      </section>
    </section>
  )
}

export default EventList;
