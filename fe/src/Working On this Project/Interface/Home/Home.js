import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd'
import "./Home.css"
import '../About/About.css'
import Mobile from '../../image/Category_img/mobiles.svg'
import Bags from '../../image/Category_img/bags.svg'
import Laptop from '../../image/Category_img/laptops.svg'
import Car from '../../image/Category_img/cars.svg'
import Document from '../../image/Category_img/document.svg'
import jewellry from '../../image/Category_img/ewellry.svg'
import Key from '../../image/Category_img/keys.svg'
import Watch from '../../image/Category_img/watch.svg'
import Other from '../../image/Category_img/other.svg'
import Person from '../../image/Category_img/persons.svg'

import User from '../../image/Category_img/user.svg'
import Reporting from '../../image/Category_img/reporting.svg'
import Correct from '../../image/Category_img/correct.svg'
const Home = () => {

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

const items = [
    { path: '/Phone', img: Mobile, label: 'Mobile' },
    { path: '/Bags', img: Bags, label: 'Bag' },
    { path: '/Key', img: Key, label: 'Key' },
    { path: '/Laptop', img: Laptop, label: 'Laptop' },
    { path: '/Watch', img: Watch, label: 'Watch' },
    { path: '/gewellry', img: jewellry, label: 'jewellry' },
    { path: '/Document', img: Document, label: 'Document' },
    { path: '/Car', img: Car, label: 'Car' },
    { path: '/Person', img: Person, label: 'Person' },
    { path: '/Other', img: Other, label: 'Other' },
  ];
  return (
    <div>
      <div className='main_home'>
        <div>
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
        </div>
      </div>

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

<div className="category-container">
        <ul className="category-grid">
          {items.map((item) => (
            <li className="category-item">
              <Link to={item.path} >
                <img src={item.img} alt={item.label} className="category-img" />
                <span className="category-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

       <h1 className='home_h1'>How to post the Ad ?</h1>
      <div className='second_div'>
        <Card className='home_box'>
          <img src={User} className='home_img1'></img>
          <h2>Step 1: Register with us</h2>
          <p className='home_para'>Don't know how to deal with lost or found items near you? Register with your name and email address. If you have registered already, you can use the same account for posting unlimited ads.</p>
        </Card>
        <Card className='home_box'>
          <img src={Correct} className='home_img1' ></img>
          <h2>Step 2: Verify your account</h2>
          <p className='home_para'>Confirm your registration through the verification link which has sent to the given email address and then you can manage the account details now. Use either username or email address for login to your account.</p>
        </Card>
        <Card className='home_boxs'>
          <img src={Reporting} className='home_img2'></img>
          <h2>Step 3: Start reporting</h2>
          <p className='home_para'>You can start creating the ad for the lost or found items now to claim the item or hand over it to the rightful owner. Once done, we will post the ad on the large community where everybody can potentially take action in searching for what you have lost.</p>
        </Card>
      </div>

    </div>
  );
};

export default Home;
