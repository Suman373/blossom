import React from 'react';
import './NavbarHome.scss';
import BlueButton from '../BlueButton/BlueButton'

const NavbarHome = () => {
  return (
    <>
      <nav className='navbar-home'>
          <a href="/">Blossom</a>
          <ul>
            <li><a href="#platform">Platform</a></li>
            <li><a href="#pricing">Motive</a></li>
            <li><a href="#support">Contact</a></li>
          </ul>
          <div className="user-block">
            <BlueButton 
            text="Sign in"
            handleClick={()=>alert('Signin')}
            />
          </div>
      </nav>
    </>
  )
}

export default NavbarHome;
