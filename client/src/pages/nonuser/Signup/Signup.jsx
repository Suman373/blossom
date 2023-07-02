import React, { useState } from 'react';
import './Signup.scss';
import banner from '../../../assets/blossom_banner.png';
import logo from '../../../assets/blossom_logo.png';
import google from '../../../assets/google.png';

const Signup = () => {

  const [isSignup, setIsSignup] = useState(true);

  const handleRegister = ()=>{
    window.open("http://localhost:5000/auth/google/callback","_self");
  }
  const handleLogin = ()=>{
    window.open("http://localhost:5000/auth/google/callback","_self");
    
  }

  return (
    <>
      <div className="auth-wrapper">
        <nav className='navbar'>
          <img src={logo} alt="logo" />
        </nav>
        <div className="auth-container">
          <div className="banner-wrapper">
            <img src={banner} alt="banner" />
          </div>
          <div className="auth-component">
            <h1>A Little Help Is What They Need</h1>
            <p>Get started with Blossom and take one step towards the greater good</p>
            {
              isSignup?
                <>
                  <button className="google-button"
                  onClick={handleRegister}
                  >
                    <img src={google} alt="google" />Sign up with Google
                  </button>
                  <p>Already have an account ? 
                    <span 
                    className="auth-toggle"
                    onClick={()=>setIsSignup(!isSignup)}
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
                    onClick={()=>setIsSignup(!isSignup)}
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
