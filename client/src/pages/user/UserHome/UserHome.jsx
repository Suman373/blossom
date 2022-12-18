import React, { useState } from 'react';
import './UserHome.scss';
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
            <p>HOME</p>
          </>
         }

    </main>
  )
}

export default UserHome;
