import React from 'react'
import './UserNavbar.scss';
import { AppBar } from '@mui/material';
import icon from './assets/give-take-heart.webp';
import logo from '../../assets/blossom_logo.png';
import { useState } from 'react';
import {AiOutlineLogout} from 'react-icons/ai';
import axios from 'axios';

const UserNavbar = ({activeLink, setActiveLink}) => {

  const handleLogout = async()=>{
    await window.open("http://localhost:5000/auth/logout","_self");
    console.log("Logged out");
  }

  return (
    <>
        <AppBar
            className="user-navbar" >
           <div style={{display:'flex'}}>
           <ul>
                <img className="logo" src={logo} alt="logo"/>
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
            <section className="logout" onClick={handleLogout}>
                <i><AiOutlineLogout/></i>
            </section>
           </div>
        </AppBar>
    </>
  )
}

export default UserNavbar;
