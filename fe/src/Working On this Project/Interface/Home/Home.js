

import React from 'react';
import "./Home.css"
import Service from "../Service/Service";
import About from "../About/About";
import Register from '../Registration/Registration';
import Category from '../Category/Category'
const Home = () => {
  return (
    <div className='main_home'>
      <div id="about">
        <About />
      </div>

      <div id="service" >
        <Service />
      </div>

      <div id="register">
        <Register />
      </div>

      <div id='category'>
        <Category />
      </div>
    </div>
  );
};

export default Home;
