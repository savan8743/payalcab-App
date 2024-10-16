import React, { useState } from 'react';
import logo from '../Images/logo.png';
import '../App.css';
import { IoMenu } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import {  useNavigate } from 'react-router-dom';

export default function Header() {
    // State to manage the menu open/close
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate()

    // Function to toggle the menu
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const myStyle = {
        textAlign: "center",
        background: "#e8e4e4",
        fontSize: "25px",
        fontWeight: 600, // Note: fontWeight should be a number, not a string
        paddingTop: "9px",
      };

      const handleclick = () => {
        navigate('/')
      }

    return (
        <>
            <header className="header  top-0 left-0 w-full z-50">
                <div className="header-wrapper" style={{ height: '80px', backgroundColor: '#ffffff' }}>
                    <div className="container">
                        {/* Logo */}
                        <div onClick={handleclick} className="logo">
                    
                                <img src={logo} className='mt-2' style={{ height: '70px' }} alt="Rent It" />
                        
                        </div>

                        {/* Mobile menu toggle button */}
                        <button
                            onClick={toggleMenu}
                            className="menu-toggle btn ripple-effect btn-theme-transparent"
                        >
                            <IoMenu size={30} color='#ff0000' />
                        </button>

                        {/* Navigation */}
                        <nav className={`navigation clearfix ${menuOpen ? 'opened' : 'closed'}`}>
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <a href="#" className="menu-toggle-close btn" onClick={toggleMenu}>
                                         <IoIosCloseCircle size={38} color='#FFFFFF' />
                                    </a>
                                    <ul className="nav sf-menu">
                                        <li className="active megamenu sale"><a href="/index.php">Home</a></li>
                                        <li><a href="/about.php">About Us</a></li>
                                        <li><a href="/services.php">Services</a></li>
                                        <li><a href="/route_details.php">Routes</a></li>
                                        <li><a href="/contact.php">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="swiper-scrollbar"></div>
                        </nav>
                    </div>
                </div>
                 {/* number  */}
                 <div class="header-wrapper1" style={myStyle}>
            <div class="container">
                <div class="logo1">
                    <a className='text-red-500 font-bold hover:text-black' href="tel: 08460007788">08460007788</a>
                </div>
            </div>
        </div>
            </header>
        </>
    );
}
