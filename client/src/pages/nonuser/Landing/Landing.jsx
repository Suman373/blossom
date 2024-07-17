import React, { useEffect, useRef, useState } from 'react';
import './Landing.scss';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FaHandHoldingHeart, FaHeart, FaHandsHelping } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { GiEternalLove } from "react-icons/gi";
import charity from '../../../assets/charity.png';
import PublicNav from '../../../components/PublicNav/PublicNav';
import handsBanner from '../../../assets/hands-banner.jpg';
import Announcement from '../../../components/Announcement/Announcement';
import { motion } from 'framer-motion';

function Landing() {

    const elementRef = useRef(null);

    const [isHovered, setIsHovered] = useState(false);

    // cards
    const { ref: serviceCardRef, inView: cardVisible } = useInView();
    // welcome 
    const { ref: welcomeTextRef, inView: welcomeTextVisible } = useInView();

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
                    <Announcement />
                    <motion.h1 
                        initial={{ y: -80 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 2 }} >
                        Cultivating Change through Compassion .
                    </motion.h1>
                    <div style={{ margin: '1rem 0' }}>
                        <span id='typewriter-text' ref={elementRef}>
                        </span>
                    </div>
                    <Link
                        to="/signup"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className='banner-btn'>
                        <p>Join now</p> {!isHovered ? <FaHandsHelping /> : <FaHeart />}
                    </Link>
                    <img className="hero-image" src={handsBanner} alt="hero" />
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
                                <Link to="/about">
                                    Know more
                                </Link>
                            </div>
                            <div
                                ref={serviceCardRef}
                                className={cardVisible ? 'about-card grow-out' : 'about-card'}>
                                <FaHandHoldingHeart />
                                <h4>Donations</h4>
                                <p>Secure online donations with complete transparency. Your help is handled with care.</p>
                                <Link to="/about">
                                    Know more
                                </Link>
                            </div>
                            <div
                                ref={serviceCardRef}
                                className={cardVisible ? 'about-card grow-out' : 'about-card'}>
                                <IoPeople />
                                <h4>Volunteer</h4>
                                <p>Get started with volunteering services we provide</p>
                                <Link to="/about">
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
                            Welcome to Blossom, a transformative initiative dedicated to nurturing positive change in the world through fundraises, charity donations, and volunteer services. Born out of a deep-rooted commitment to creating a better tomorrow, Blossom is more than just a project; it's a movement that harnesses the power of collective goodwill to address pressing social issues.
                        </p>
                        <h2 style={{ color: '#0964da' }}>Mission</h2>
                        <p>
                            At the heart of Blossom lies a mission to cultivate a culture of compassion, generosity, and community involvement. Our aim is to provide a platform that empowers individuals and organizations to make a meaningful impact on the lives of those in need.
                        </p>

                        <Link className='welcome-link' to="/about">
                            Know more
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Landing;