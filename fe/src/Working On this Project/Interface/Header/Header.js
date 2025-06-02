import React from 'react';
import './Header.css';

import {Link} from "react-scroll"

// image
import Logo from "../../image/ankit_logo-removebg-preview.png"

import Login from "../Login/Login"
// import Link from 'antd/es/typography/Link';
const Header = () => {
  return (
    <header className="custom-header">
      <div className="logo">
        <img src={Logo} className='logo_img' />
      </div>
      <div className="nav-links">
        
        <Link to="home" smooth={true} duration={100}>Home</Link>
        <Link to="about" smooth={true} duration={500}>About</Link>
        <Link to="service" smooth={true} duration={500}>Service</Link>
        <Link to="register" smooth={true} duration={500}>Register</Link>
      
      
      </div>
      <div>
        <Login/>
        </div>
    </header>
  );
};

export default Header;
