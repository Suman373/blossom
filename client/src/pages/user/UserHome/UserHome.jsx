import React, { useState } from 'react';
import './UserHome.scss';
import heartImage from '../../../assets/give-take-heart.webp';
import UserNavbar from '../../../components/Navbar-user/UserNavbar';
import UserSynopsis from '../../../components/Synopsis-user/UserSynopsis';
import FundRaise from '../../../components/FundRaise-user/FundRaise';

const UserHome = () => {
  const [activeLink , setActiveLink] = useState("");
  return (
    <main className='user-home-container'>
        {/* User navbar */}
        <UserNavbar
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <UserSynopsis/>
         {
          activeLink === "Fundraises"?
          <>
            <FundRaise/>
          </>
          :
          activeLink === "Events" ? 
          <>
            <p>EVENTS PAGE NEED TO BE ADDED</p>
          </>
          :
          activeLink === "Plans"?
          <>
            <p>PLANS PAGE NEED TO BE ADDED</p>
          </>
          :
          activeLink === "Settings"?
          <>
            <p>SETTINGS TO BE ADDED</p>
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
