import React from 'react';
import './Service.css';

const Service = () => {
  const cards = Array.from({ length: 7 });

  return (
    <div className="service-container">
      <h1 className="service-title">Our Services</h1>
      <div className="cards-wrapper">
        {cards.map((_, index) => (
          <div key={index} className="service-card">
            <h3>Card Title {index + 1}</h3>
            <p>Card content here (you can customize this).</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
