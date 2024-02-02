import React, { useEffect, useState } from 'react';
import './Feeds.scss';
import { TextField } from '@mui/material';
import BlueButton from '../BlueButton/BlueButton';
import AddFeed from '../../pages/user/AddFeed/AddFeed';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import FeedCard from '../FeedCard/FeedCard';

const Feeds = () => {
  document.title = "HH | Feeds";

  const [modalOpen, setModalOpen] = useState(false);
  const [allFeeds, setAllFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllFeeds = async () => {
    setLoading(true);
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/feeds/`,{withCredentials:true});
      if (!data) {
        throw Error({ message: "Could not load feeds" });
      }
      setAllFeeds(data?.data?.result);

    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(error.message);
      }
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchAllFeeds();
  },[]);


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
          <BlueButton
            text={"Add new feed"}
            handleClick={() => setModalOpen(true)}
          />

        </header>

        <section className="feed-list-container">
          <h1>Share your moments</h1>
          <ul className='feed-list'>
            {
              allFeeds?.length > 0 ?
                allFeeds?.map((item, index) => (
                    <FeedCard
                      key={index}
                      item={item}
                    />
                ))
                :
                <>
                   {!loading  && (<p className='result-message'>No feeds to show</p>)}
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
    </>
  )
}

export default Feeds;