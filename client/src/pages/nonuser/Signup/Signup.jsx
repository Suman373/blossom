import React, {useRef, useState, useEffect } from 'react';
import './Signup.scss';
import banner from '../../../assets/blossom_banner.png';
import logo from '../../../assets/blossom_logo.png';
import google from '../../../assets/google.png';
import Typed from 'typed.js';
import Landing from '../Landing/Landing';

const Signup = () => {

  const [isSignup, setIsSignup] = useState(true);
  const elementRef = useRef(null);

  const handleRegister = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  }
  const handleLogin = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");

  }

  useEffect(()=>{
    const typed = new Typed(elementRef.current, {
      strings: ['A Little Help is all they need',
      'Join us today to make a difference'],
      typeSpeed: 50,
      backSpeed:40,
      loop:true,
      smartBackspace:true
    });

    return()=>{
      typed.destroy();
    }

  },[])

  return (
    <>
      <div className="auth-wrapper">
        <nav className='navbar'>
          <img src={logo} alt="logo" />
        </nav>
        <Landing/>
        <div className="auth-container">
          <div className="banner-wrapper">
            <img src={banner} alt="banner" />
          </div>
          <div className="auth-component">
            <div className="typewriter">
              <span id='typewriter-text' ref={elementRef}></span>
            </div>
            <p>Get started with Blossom and take one step towards the greater good</p>
            {
              isSignup ?
                <>
                  <button className="google-button"
                    onClick={handleRegister}
                  >
                    <img src={google} alt="google" />Sign up with Google
                  </button>
                  <p>Already have an account ?
                    <span
                      className="auth-toggle"
                      onClick={() => setIsSignup(!isSignup)}
                    > Login</span> </p>
                </>
                :
                <>
                  <button className='google-button'
                    onClick={handleLogin}
                  >
                    <img src={google} alt="google" />Log in with Google
                  </button>
                  <p>Don't have an account ?
                    <span
                      className='auth-toggle'
                      onClick={() => setIsSignup(!isSignup)}
                    > Sign up</span></p>
                </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;
