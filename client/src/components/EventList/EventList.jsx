import React from 'react';
import './EventList.scss';
import { TextField } from '@mui/material';
import { useState } from 'react';
import EventCard from '../EventCard/EventCard';
import BlueButton from '../BlueButton/BlueButton';
import { useNavigate } from 'react-router-dom';
import events from '../../data/events';

const EventList = () => {

  // title set
  document.title = "HH | Events"

  const navigate = useNavigate();

  const [eventSearch, setEventsSearch] = useState("");

  // adding new event button click
  const addNewEvent = (e) => {
    e.preventDefault();
    navigate('/new/event');
  }

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
            events?.length > 0 ?
              events?.map((event, index) => (
                event?.title?.toLowerCase().includes((eventSearch.toLowerCase())) ?
                  <EventCard
                    key={index}
                    event={event}
                    />
                  :
                  ""
              ))
              :
              <>
                <p className='no-event-raise-message'>No event raises to show</p>
              </>
          }
        </ul>
      </section>
    </section>
  )
}

export default EventList;
