import React from 'react';
import './UserHome.scss';
import UserNavbar from '../../../components/Navbar-user/UserNavbar';
import UserSynopsis from '../../../components/Synopsis-user/UserSynopsis';
import FundRaise from '../../../components/FundRaise-user/FundRaise';

const UserHome = () => {
  return (
    <main className='user-home-container'>
        <UserNavbar/>

        {/*User synopsis goes here*/}
        <UserSynopsis/>
        
        {/* Recent events goes here with search and filter*/}
        <FundRaise/>

    </main>
  )
}

export default UserHome;
