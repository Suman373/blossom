import React from 'react'
import './UserNavbar.scss';
import { AppBar } from '@mui/material';
import logo from '../../assets/blossomLogo.png';
import { AiOutlineLogout } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const UserNavbar = ({ activeLink, setActiveLink, setUser }) => {

  const navigate = useNavigate();

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
          <section className="logout" onClick={handleLogout}>
            <i><AiOutlineLogout /></i>
          </section>
        </div>
      </AppBar>
    </>
  )
}

export default UserNavbar;
