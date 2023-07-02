import React, { useState } from 'react';
import './UserHome.scss';
import UserNavbar from '../../../components/Navbar-user/UserNavbar';
import UserSynopsis from '../../../components/Synopsis-user/UserSynopsis';
import FundList from '../../../components/FundList/FundList';
import EventList from '../../../components/EventList/EventList';
import Settings from '../Settings-page/Settings';
import cover from '../../../assets/children.jpeg';

const UserHome = () => {
  const [activeLink , setActiveLink] = useState("Fundraises");
  return (
    <main className='user-home-container'>
        {/* User navbar */}
        <UserNavbar
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
        <div className="profile">
            <div className="cover">
              <img className='cover-pic' src={cover} alt="cover"/>
              <img className="profile-pic" src={cover} alt="pfp"/>
            </div>
            <div className="details">
                  <h3 className="name">Suman Roy</h3>
                  <p className="email">reachsuman.roy@gmail.com</p>
                  <div className="count">
                    {/* <p>Events<span> 4</span></p>
                    <p>Fundraises<span> 4</span></p> */}
                    <p>Followers<span> 100</span> </p>
                    <p>Following<span> 70</span></p>
                  </div>
                  <button>
                    Show Profile
                  </button>
            </div>
        </div>
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
           <FundList/>
          </>
         }

    </main>
  )
}

export default UserHome;
