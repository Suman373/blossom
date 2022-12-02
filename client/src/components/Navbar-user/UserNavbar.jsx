import React from 'react'
import './UserNavbar.scss';
import { AppBar } from '@mui/material';

import icon from '../../assets/give-take-heart.webp';

const UserNavbar = () => {
  return (
    <>
        <AppBar
            className="user-navbar">
           <div style={{display:'flex'}}>
           <ul>
                <li><a id="logo" href="#user-home">Helping hand</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#model">Model</a></li>
                <li><a href="#plans">Plans</a></li>
                <li><a href="#settings">Settings</a></li>
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
