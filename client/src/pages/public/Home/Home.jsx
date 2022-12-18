import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Home.scss';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import NavbarHome from '../../../components/Navbar-home/NavbarHome';
import { SiFsecure, SiWebmoney } from 'react-icons/si';
import { FaHandshake } from 'react-icons/fa';
import givetakeheart from '../../../assets/give-take-heart.webp';
import donatebox from '../../../assets/donate-box.webp';
import devices from '../../../assets/devices-compatibility.webp';
import BlueButton from '../../../components/BlueButton/BlueButton';

const Home = () => {
    // navigator
    const navigate = useNavigate();

    const getStarted= ()=>{
        navigate('/userhome');
    }

    const moreFromUs = ()=>{
        alert("You want more? ");
    }

    return (
        <>
            <Container>
                <NavbarHome />
                <Box className="banner-wrapper">
                    <section className="banner-slogan">
                        <h1>
                            Your Go-to Crowdfund raising Platform
                        </h1>
                        <p>
                            Join us to thrive towards helping millions of unpriviledged who need our help
                        </p>

                        <div>
                            <BlueButton
                                text={"Get started"}
                                handleClick={getStarted}/>
                            <BlueButton
                                text={"More from us"}
                                handleClick={moreFromUs}/>
                        </div>
                    </section>
                    <section className="banner-illustration">
                        <div className="icons-container">
                            <i><SiFsecure /></i>
                            <i><FaHandshake /></i>
                            <i><SiWebmoney /></i>
                            <i></i>
                        </div>
                        <div className="illustration-caption">
                            <h1>
                                Looking to help the needy but not sure of the authenticity?
                            </h1>
                            <p>
                                Our site provides you that opportunity of making a huge difference to the lives of millions with small contribution. Yes, you might be worried about if it's safe. Don't worry, we have got you covered.
                            </p>
                        </div>
                        <img src={givetakeheart} alt="give-take-heart" />
                    </section>
                </Box>
                <Box className="platform-wrapper">
                    <section className="our-platform">
                        <h1>An onboarding experience</h1>
                        <div className="platform-card">
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit dolore neque natus eveniet a officia quibusdam magni maiores consequuntur ad!</p>
                            <img src={donatebox} alt="donate-box" />
                        </div>
                    </section>
                    <section className="our-platform">
                        <h1>Optimized to any device</h1>
                        <div className="platform-card">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium dolores corrupti dignissimos sed possimus tenetur similique quis libero cumque veritatis?</p>
                            <img src={devices} alt="device-compatibility" />
                        </div>
                    </section>
                </Box>
            </Container>
        </>
    )
}

export default Home;
