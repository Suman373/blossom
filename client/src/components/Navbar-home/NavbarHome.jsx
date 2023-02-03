import React from 'react';
import './NavbarHome.scss';
import BlueButton from '../BlueButton/BlueButton'

const NavbarHome = () => {
  return (
    <>
      <nav className='navbar-home'>
          <a href="/">Helping-hand</a>
          <ul>
            <li><a href="#platform">Platform</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#support">Support</a></li>
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
