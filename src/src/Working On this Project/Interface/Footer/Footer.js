// import React from 'react';
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="custom-footer">
//       <div className="footer-content">
//         <div className="footer-section about">
//           <h2>SmartE</h2>
//           <p>Your Smart Employee Management Solution.</p>
//         </div>

        

//         <div className="footer-section social">
//           <h3>Follow Us</h3>
//           <div className="social-icons">
//             <a href="#"><i className="fab fa-facebook-f"></i></a>
//             <a href="#"><i className="fab fa-twitter"></i></a>
//             <a href="#"><i className="fab fa-linkedin-in"></i></a>
//             <a href="#"><i className="fab fa-github"></i></a>
//           </div>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         &copy; {new Date().getFullYear()} SmartE | All Rights Reserved
//       </div>
//     </footer>
//   );
// };

// export default Footer;












import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="lf-footer">
      <div className="lf-footer-container">
        <div className="lf-footer-section about">
          <h3 className="lf-footer-section-about-header">About Lost & Found</h3>
          <p>
            Helping users report and recover lost and found items. We ensure transparency, safety, and communication between finders and seekers.
          </p>
        </div>

        <div className="lf-footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/lost-items">Lost Items</a></li>
            <li><a href="/found-items">Found Items</a></li>
            <li><a href="/reports">Reports</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="lf-footer-section contact">
          <h3 className="footer-section">Contact Info</h3>
          <p><MailOutlined /> support@lostfound.com</p>
          <p><PhoneOutlined /> +91 98765 43210</p>
          <p><EnvironmentOutlined />Raipur, India</p>
        </div>

        <div className="lf-footer-section social">
          <h3>Follow Us</h3>
          <div className="lf-social-icons">
            <a href="#"><FacebookOutlined /></a>
            <a href="#"><TwitterOutlined /></a>
            <a href="#"><InstagramOutlined /></a>
          </div>
        </div>
      </div>
      <div className="lf-footer-bottom">
        © {new Date().getFullYear()} Lost & Found System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

