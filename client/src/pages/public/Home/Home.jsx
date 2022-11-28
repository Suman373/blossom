import React from 'react';
import './Home.scss';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import NavbarHome from '../../../components/Navbar-home/NavbarHome';
import { SiFsecure, SiWebmoney } from 'react-icons/si';
import { FaHandshake } from 'react-icons/fa';
import givetakeheart from '../../../assets/give-take-heart.webp';

const Home = () => {
    return (
        <>
            <Container>
                <NavbarHome />
                <Box className="banner-wrapper" sx={{ bgcolor: '#ffffff', height: '100vh' }}>
                    <section className="banner-slogan">
                        <h1>
                            Your Go-to Fundraising Platform
                        </h1>
                        <p>
                            Join us to thrive towards helping millions of unpriviledged who need our help
                        </p>

                        <div>
                            <button>
                                Get started
                            </button>
                            <button>
                                More from us
                            </button>
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
                <Box className="platform-wrapper" sx={{ bgcolor: '#ffffff', height: '100vh' }}>
                    <section className="our-platform">

                    </section>
                    <section className="platform-illustration">

                    </section>
                </Box>
            </Container>
        </>
    )
}

export default Home;
