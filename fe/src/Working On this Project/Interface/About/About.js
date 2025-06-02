import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-glass-section">
      <div className="about-glass-container">
        <div className="about-glass-text">
          <h1>About <span>SmartE</span></h1>
          <p>
            SmartE is a modern employee management platform built to simplify HR tasks like attendance, leave, and payroll. We believe in technology that empowers people to do more with less effort.
          </p>
        </div>
        <div className="about-glass-image">
          <img src="https://source.unsplash.com/600x400/?technology,team" alt="Teamwork" />
        </div>
      </div>
    </div>
  );
};

export default About;
