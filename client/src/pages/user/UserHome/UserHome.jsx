import React, { useState,useEffect } from 'react';
import './UserHome.scss';
import UserNavbar from '../../../components/Navbar-user/UserNavbar';
import ProfileCard from '../../../components/ProfileCard/ProfileCard';
import FundList from '../../../components/FundList/FundList';
import EventList from '../../../components/EventList/EventList';
import Feeds from '../../../components/Feeds/Feeds';
import Settings from '../Settings-page/Settings';
import cover from '../../../assets/children.jpeg';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
  const [activeLink , setActiveLink] = useState("Fundraises");
  


  return (
    <main className='user-home-container'>
        <UserNavbar
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <ProfileCard/>
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
          activeLink === "Feeds"?
          <>
            <Feeds/>
          </>
          :
          activeLink === "Settings"?
          <>
            <Settings/>
          </>
          :
          <>
           <FundList/>
          </>
         }

    </main>
  )
}

export default UserHome;
