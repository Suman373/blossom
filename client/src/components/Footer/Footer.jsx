import React from 'react';
import './Footer.css';
import logo from '../../assets/blossomLogo.png';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer_wrapper'>
            <div className="footer_row">
                <div className="footer_col">
                    <img src={logo} className="footer-logo"  alt="logo" />
                    <p>Small efforts make big change</p>
                </div>
                <div className="footer_col">
                    <ul>
                        <li><Link>Home</Link></li>
                        <li><Link>Motto</Link></li>
                        <li><Link>Team</Link></li>
                    </ul>
                </div>
                <div className="footer_col">
                    <ul>
                        <li><p>Contact us</p></li>
                        <li><p>Help us</p></li>
                        <li><p>Support us</p></li>
                    </ul>
                </div>
                <div className="footer_col">
                    <ul>
                        <li><p>Sponsor</p></li>
                        <li><p>Advertise</p></li>
                        <li><p>Volunteers</p></li>
                    </ul>
                </div>
                <div className="footer_col">
                    <p>Follow us on</p>
                    <div className="footer_icons">
                        <span> <FaFacebookF /></span>
                        <span><FaTwitter /></span>
                        <span><FaInstagram /></span>
                    </div>
                </div>
            </div>
            <div className="copyright">
                &copy; Blossom 2024 | All Rights Reserved
            </div>
        </div>
    )
}

export default Footer;