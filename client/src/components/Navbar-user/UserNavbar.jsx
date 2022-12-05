import React from 'react'
import './UserNavbar.scss';
import { AppBar } from '@mui/material';

import icon from '../../assets/give-take-heart.webp';

const UserNavbar = () => {
  return (
    <>
        <AppBar
            className="user-navbar" >
           <div style={{display:'flex'}}>
           <ul>
                <li><a id="logo" href="/userhome">Helping hand</a></li>
                <li><a href="#fundraises">Fundraises</a></li>
                <li><a href="/userhome/events">Events</a></li>
                <li><a href="/userhome/plans">Plans</a></li>
                <li><a href="/userhome/settings">Settings</a></li>
            </ul>
            <section className="icon-control">
                <img src={icon} alt="user-icon"/>
            </section>
           </div>
        </AppBar>
    </>
  )
}

export default UserNavbar;
