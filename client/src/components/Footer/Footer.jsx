import React from 'react';
import './Footer.css';
// import logo from '../../assets/logo.png';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer_wrapper'>
            <div className="footer_row">
                <div className="footer_col">
                    <img  alt="logo" />
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when</p>
                </div>
                <div className="footer_col">
                    <ul>
                        <li><p>Home</p></li>
                        <li><p>Motto</p></li>
                        <li><p>Team</p></li>
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
                &copy; Blossom 2023 | All Rights Reserved
            </div>
        </div>
    )
}

export default Footer;