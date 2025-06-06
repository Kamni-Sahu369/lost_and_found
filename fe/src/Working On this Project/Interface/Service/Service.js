// import React from 'react';
// import './Service.css';

// const Service = () => {
//   const cards = Array.from({ length: 7 });

//   return (
//     <div className="service-container">
//       <h1 className="service-title">Our Lost and Found Services </h1>
//       <div className="cards-wrapper">
//         {cards.map((_, index) => (
//           <div key={index} className="service-card">
//             <h3>Card Title {index + 1}</h3>
//             <p>Card content here (you can customize this).</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Service;

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import './Service.css';
function Service() {

  const lostFoundServices = [
  {
    title: "Secure Item Collection",
    description:
      "All found items are safely collected and stored in a secure location."
  },
  {
    title: "Detailed Cataloging",
    description:
      "Each item is tagged and logged with detailed descriptions for easy identification."
  },
  {
    title: "Lost Item Reporting",
    description:
      "Users can report lost items online or in person with a simple and fast process."
  },
  {
    title: "Matching & Notifications",
    description:
      "We match found items with reports and notify owners promptly."
  },
  {
    title: "Verified Item Return",
    description:
      "Items are returned only to verified owners to ensure security and accuracy."
  },
  {
    title: "Customer Support",
    description:
      "Friendly support staff are available to assist with inquiries and updates."
  },
  {
    title: "Accessible Service Hours",
    description:
      "Our Lost and Found desk is open during regular hours for drop-offs and pickups."
  }
];
useEffect(() => {
      AOS.init({ duration: 8000, once: true });
      AOS.refresh()
    }, []);
  return (
    <div data-aos="fade-up" data-aos-duration="2000">
     <div className="service-container">
      <h1 className="service-title">Our Lost and Found Services</h1>
      <div className="service-grid">
        {lostFoundServices.map((service, index) => (
          <div className="service-card" key={index}>
            <h3 className='service_hrading'>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Service
