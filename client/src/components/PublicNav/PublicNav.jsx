import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PublicNav.scss';
import logo from '../../assets/blossomLogo.png';

function PublicNav() {
    const [scrolled, setScrolled] = useState(false);
    const [activeLink, setActiveLink] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'home', label: 'Home', to: '#' },
        { id: 'about', label: 'About us', to: '/about' },
        { id: 'gallery', label: 'Gallery', to: '#' },
        { id: 'shop', label: 'Shop', to: '#' },
        { id: 'blogs', label: 'Blogs', to: '#' }
    ];

    return (
        <div className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
            <nav>
                <ul>
                    {/* Logo */}
                    <li id="logo">
                        <Link to="/">
                            <img src={logo} alt="Blossom Logo" />
                        </Link>
                    </li>

                    {/* Navigation Links */}
                    {navLinks.map((link) => (
                        <li 
                            key={link.id}
                            className={activeLink === link.id ? 'active' : ''}
                        >
                            <Link
                                to={link.to}
                                onClick={() => setActiveLink(link.id)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    {/* CTA Button */}
                    <li className="cta-button">
                        <Link to="/signup">
  <button className="join-btn">
    <span>Join now</span>
    <span className="emoji">🎉</span>
  </button>
</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default PublicNav;