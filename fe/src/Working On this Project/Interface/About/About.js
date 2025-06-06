import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import './About.css';

import { Card } from 'antd'
import User from '../../image/Category_img/user.svg'
import Reporting from '../../image/Category_img/reporting.svg'
import Correct from '../../image/Category_img/correct.svg'

const About = () => {

   useEffect(() => {
      AOS.init({ duration: 8000, once: true });
      AOS.refresh()
    }, []);
  return (
    <div data-aos="fade-up" data-aos-duration="2000">
    <div className="about-glass-section" >
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

export default About;
