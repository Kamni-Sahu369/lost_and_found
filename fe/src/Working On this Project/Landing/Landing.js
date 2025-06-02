
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "../Interface/Header/Header";
import Footer from "../Interface/Footer/Footer";
import Home from "../Interface/Home/Home";
import Sidebar from '../Admin/Component/Sidebar/Sidebar';


import Dashboard from '../Admin/Pages/Dashboard/DashboardHome';
import Item from '../Admin/Pages/Item/Item';
import Profile from '../Admin/Pages/Profile/Profile';
import Match from '../Admin/Pages/Match/Match';
import Setting from '../Admin/Pages/Setting/Setting';
import Logout from '../Admin/Pages/Logout/Logout'


import './Landing.css'; // External CSS import

function Landing() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  useEffect(() => {
    const checkLogin = () => {
      const isLoggedInNow = localStorage.getItem("loggedIn") === "true";
      if (isLoggedInNow !== loggedIn) {
        setLoggedIn(isLoggedInNow);
      }
    };

    const intervalId = setInterval(checkLogin, 500); // har 500ms check kare

    return () => clearInterval(intervalId);
  }, [loggedIn]);

  return (
    <BrowserRouter>
      {loggedIn ? (
        <div className="landing_container">
          <Sidebar />
          <div className="dashboard-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/item" element={<Item />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/match" element={<Match />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default Landing;
