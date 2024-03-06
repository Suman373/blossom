import React, { useEffect, useState } from 'react'
import './UserNavbar.scss';
import { AppBar } from '@mui/material';
import logo from '../../assets/blossomLogo.png';
import { AiOutlineLogout } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import NotificationWrapper from '../Notification/NotificationWrapper';
import useAuth from '../../hooks/useAuth';

const UserNavbar = ({ activeLink, setActiveLink, setUser }) => {

  const navigate = useNavigate();
  const {_id} = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(12);

  const getNotificationCount = async()=>{
    try {
      const data = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/${_id}/count`);
      if(!data?.data) throw new Error("Failed to fetch notification count");
      setNotificationCount(data?.data?.notifCount);
    } catch (error) {
      console.log(error);
      toast.error("Notification error");
    }
  }

  const handleLogout = async () => {
    // await window.open(`${import.meta.env.VITE_API_ENDPOINT}/auth/logout`,"_self");
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/signout`);
      if (!data) {
        throw new Error("Logout failed");
      }
      toast.success("Logged out successfully");
      localStorage.removeItem('blossomUserObj')
      setUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  }

  useEffect(()=>{
    getNotificationCount();
  },[]);

  return (
    <>
      <AppBar
        className="user-navbar" >
        <div style={{ display: 'flex' }}>
          <ul>
            <img className="logo" src={logo} alt="logo" />
            <li
              value={activeLink}
              onClick={() => setActiveLink("Fundraises")}>
              Fundraises
            </li>
            <li
              value={activeLink}
              onClick={() => setActiveLink("Events")}>
              Events
            </li>
            <li
              value={activeLink}
              onClick={() => setActiveLink("Feeds")}>
              Feeds
            </li>
            <li
              value={activeLink}
              onClick={() => setActiveLink("Settings")}>
              Settings
            </li>
          </ul>
          <section className="right-icons">
            <i onClick={() => setNotificationOpen(!notificationOpen)}><FaBell /> 
              {
                notificationCount>0 && <span id='notif-count'>{notificationCount}</span> 
              }
             </i>
            <i onClick={handleLogout}><AiOutlineLogout /></i>

            {
              notificationOpen && (
                <NotificationWrapper
                setNotificationCount={setNotificationCount}
                />
              )}
          </section>
        </div>
      </AppBar>
    </>
  )
}

export default UserNavbar;
