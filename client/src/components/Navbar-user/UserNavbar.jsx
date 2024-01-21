import React from 'react'
import './UserNavbar.scss';
import { AppBar } from '@mui/material';
import logo from '../../assets/blossomLogo.png';
import {AiOutlineLogout} from 'react-icons/ai';

const UserNavbar = ({activeLink, setActiveLink}) => {

  const handleLogout = async()=>{
    await window.open(`${import.meta.env.VITE_API_ENDPOINT}/auth/logout`,"_self");
    localStorage.removeItem('blossomUserObj');
    alert("Logged out");
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
                  onClick={()=> setActiveLink("Feeds")}>
                    Feeds
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
