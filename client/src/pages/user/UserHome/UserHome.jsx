import React, { useEffect, useState } from 'react';
import './UserHome.scss';
import UserNavbar from '../../../components/Navbar-user/UserNavbar';
import ProfileCard from '../../../components/ProfileCard/ProfileCard';
import FundList from '../../../components/FundList/FundList';
import EventList from '../../../components/EventList/EventList';
import Feeds from '../../../components/Feeds/Feeds';
import Settings from '../Settings-page/Settings';
import { useNavigate } from 'react-router-dom';

const UserHome = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Fundraises");

  // key values against the activeLink state 
  const componentsMap = {
    "Fundraises":<FundList/>,
    "Events":<EventList/>,
    "Feeds":<Feeds/>,
    "Settings":<Settings/>
  };

  const selectedComponent = componentsMap[activeLink] || <FundList/>

  useEffect(() => {
    if (!user?.completedDetails) {
      navigate('/user-details');
    }
  }, [user]);

  return (
    <main className='user-home-container'>
      <UserNavbar
        setUser={setUser}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      />
      <ProfileCard />
      {
        selectedComponent
      }
    </main>
  )
}

export default UserHome;
