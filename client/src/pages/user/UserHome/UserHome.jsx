import React, { useState } from 'react';
import './UserHome.scss';
import heartImage from '../../../assets/give-take-heart.webp';
import UserNavbar from '../../../components/Navbar-user/UserNavbar';
import UserSynopsis from '../../../components/Synopsis-user/UserSynopsis';
import FundList from '../../../components/FundList/FundList';
import EventList from '../../../components/EventList/EventList';
import Settings from '../Settings-page/Settings';

const UserHome = () => {
  const [activeLink , setActiveLink] = useState("");
  return (
    <main className='user-home-container'>
        {/* User navbar */}
        <UserNavbar
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
         {
          activeLink === "Fundraises"?
          <>
            <FundList/>
          </>
          :
          activeLink === "Events" ? 
          <>
            <EventList/>
          </>
          :
          activeLink === "Plans"?
          <>
            <p>PLANS PAGE NEED TO BE ADDED</p>
          </>
          :
          activeLink === "Settings"?
          <>
            <UserSynopsis/>
            <Settings/>
          </>
          :
          <>
            <img className='home-heart' src={heartImage} alt="home page illustration"/>
          </>
         }

    </main>
  )
}

export default UserHome;
