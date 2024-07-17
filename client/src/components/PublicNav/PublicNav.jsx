import React from 'react';
import './PublicNav.scss';
import {motion} from 'framer-motion';
import logo from '../../assets/blossomLogo.png';
import { Link } from 'react-router-dom';

function PublicNav() {
    return (
        <div className="landing-nav">
            <nav>
                <ul>
                    <li id="logo">
                        <img src={logo} alt="logo" />
                    </li>
                    <motion.li
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.1 },
                        }}><Link to="#">Home</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 },
                        }}><Link to="/about">About us</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 },
                        }}><Link to="#">Gallery</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 },
                        }}><Link to="#">Shop</Link>
                    </motion.li>
                    <motion.li
                        whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.2 },
                        }}><Link to="#">Blogs</Link>
                    </motion.li>

                </ul>
            </nav>
        </div>
    )
}

export default PublicNav;
