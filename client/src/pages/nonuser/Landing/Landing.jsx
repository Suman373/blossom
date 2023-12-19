import React, { useEffect, useRef, useState } from 'react';
import './Landing.scss';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import google from '../../../assets/google.png';
import { useInView } from 'react-intersection-observer';
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { GiEternalLove } from "react-icons/gi";
import charity from '../../../assets/charity.png';
import BlueButton from '../../../components/BlueButton/BlueButton';
import PublicNav from '../../../components/PublicNav/PublicNav';

function Landing() {

    // control signup or login button
    const [isSignup, setIsSignup] = useState(true);
    const elementRef = useRef(null);

    // cards
    const { ref: serviceCardRef, inView: cardVisible } = useInView();
    // welcome 
    const { ref: welcomeTextRef, inView: welcomeTextVisible } = useInView();


    // google authentication with Oauth2.0
    const handleRegister = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self");
    }
    const handleLogin = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self");

    }

    useEffect(() => {
        const typed = new Typed(elementRef.current, {
            strings: ['A little help is all they need',
                'Join us today to bring a change',
                'Become a volunteer today'],
            typeSpeed: 50,
            backSpeed: 40,
            loop: true,
            smartBackspace: true
        });

        return () => {
            typed.destroy();
        }

    }, []);


    return (
        <>
            <div className='landing-wrapper'>
                {/* Nav */}
                <PublicNav />
                <div className="banner">
                    <h1>
                        Small Efforts Make Big Change .
                    </h1>
                    <div style={{ margin: '1rem 0' }}>
                        <span id='typewriter-text' ref={elementRef}>
                        </span>
                    </div>
                    <div className="auth-component">
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

                <div className="about-us">
                    <h1>We are a one stop platform that helps in fundraises, donations and volunteering</h1>
                    <p>We are group of people who share a similar goal to assist the needy with whatever financial help they require</p>


                    <div className="about-cards-wrapper">
                        <div className="about-cards-flexbox">
                            <div
                                ref={serviceCardRef}
                                className={cardVisible ? 'about-card grow-out' : 'about-card'}>
                                <GiEternalLove />
                                <h4>Fundraises</h4>
                                <p>Small contributions from lots of people make a difference.</p>
                                <Link to="#a">
                                    Know more
                                </Link>
                            </div>
                            <div
                                ref={serviceCardRef}
                                className={cardVisible ? 'about-card grow-out' : 'about-card'}>
                                <FaHandHoldingHeart />
                                <h4>Donations</h4>
                                <p>Secure online donations with complete transparency. Your help is handled with care.</p>
                                <Link to="#a">
                                    Know more
                                </Link>
                            </div>
                            <div
                                ref={serviceCardRef}
                                className={cardVisible ? 'about-card grow-out' : 'about-card'}>
                                <IoPeople />
                                <h4>Volunteer</h4>
                                <p>Get started with volunteering services we provide</p>
                                <Link to="#a">
                                    Know more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="welcome">
                    <img src={charity} alt="charity" />
                    <div ref={welcomeTextRef} className={welcomeTextVisible ? "welcome-text slide-left" : "welcome-text"}>
                        <h1>Welcome to <span>Blossom</span></h1>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui repellendus vel molestiae debitis non autem perferendis reiciendis voluptate dicta aspernatur esse incidunt, minus impedit, nemo ducimus mollitia nulla tempora numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, dolore?
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure cupiditate placeat earum corporis ex maiores delectus! Sapiente enim alias exercitationem ad aliquid nisi, blanditiis iste nobis consectetur minus fugiat esse nostrum id minima natus similique et, autem explicabo! Reiciendis, dicta!
                        </p>

                        <Link className='welcome-link' to="#a">
                            Know more
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Landing;