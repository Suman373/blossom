import React from 'react'
import './UserNavbar.scss';
import { AppBar } from '@mui/material';

import icon from './assets/give-take-heart.webp';
import { useState } from 'react';

const UserNavbar = ({activeLink, setActiveLink}) => {
  
  return (
    <>
        <AppBar
            className="user-navbar" >
           <div style={{display:'flex'}}>
           <ul>
                <li><a id="logo" href="/userhome">Helping hand</a></li>
                <li 
                  value={activeLink}
                  onClick={()=> setActiveLink("Fundraises")}>
                    Fundraises
                </li>
                <li 
                  value={activeLink}
                  onClick={()=> setActiveLink("Events")}>
                    Events
                </li>
                <li 
                  value={activeLink}
                  onClick={()=> setActiveLink("Plans")}>
                    Plans
                </li>
                <li 
                  value={activeLink}
                  onClick={()=> setActiveLink("Settings")}>
                    Settings
                </li>
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
