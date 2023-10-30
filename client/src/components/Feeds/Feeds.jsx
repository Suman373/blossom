import React, { useState } from 'react';
import './Feeds.scss';
import { TextField } from '@mui/material';
import BlueButton from '../BlueButton/BlueButton';
import AddFeed from '../../pages/user/AddFeed/AddFeed';

const Feeds = () => {
  document.title = "HH | Feeds";

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {
        modalOpen && (
          <AddFeed
            modalOpen={modalOpen}
            setModalOpen={setModalOpen} />
        )
      }
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
            handleClick={() => setModalOpen(true)}
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
    </>
  )
}

export default Feeds;