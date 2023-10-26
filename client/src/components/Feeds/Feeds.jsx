import React from 'react';
import './Feeds.scss';
import { TextField } from '@mui/material';
import BlueButton from '../BlueButton/BlueButton';

const Feeds = () => {
  document.title = "HH | Feeds"

  return (
    <section className="feeds-container" >
      <header>
        <TextField
          id="outlined-search"
          className="search-field"
          type="search"
          label="Search Feed"
        />
        <BlueButton
           text={"Add new feed"}
          //  handleClick={addNewEvent}
        />

      </header>

      <section className="feed-list-container">
        <h1>Share your moments</h1>
        <ul className='feed-list'>
          {/* {
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
                <p className='result-message'>No events to show</p>
              </>
          } */}
        </ul>
      </section>
    </section>
  )
}

export default Feeds;