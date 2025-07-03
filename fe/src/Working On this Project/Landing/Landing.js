// Interface
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Interface/Header/Header";
import Footer from "../Interface/Footer/Footer";
import Home from "../Interface/Home/Home";
import Sidebar from "../Admin/Component/Sidebar/Sidebar";
import About from "../Interface/About/About";
import Service from "../Interface/Service/Service";
import Register from "../Interface/Registration/Registration";
import Category from "../Interface/Category/Category";
import SubCategory from "../Interface/Category/SubCategory/SubCategory";
import View from "../Interface/Category/View/View";
// Admin
import Dashboard from "../Admin/Pages/Dashboard/DashboardHome";
import Item from "../Admin/Pages/Item/Item";
import Profile from "../Admin/Pages/Profile/Profile";
import Match from "../Admin/Pages/Match/Match";
import Setting from "../Admin/Pages/Setting/Setting";
import Suggestion from "../Admin/Pages/Notification/Suggestion";
import Feedback from "../Admin/Pages/Notification/Feedback";
import Logout from "../Admin/Pages/Logout/Logout";
import Updates from "../Admin/Pages/Notification/Updates"
import Payment_Receipts from "../Admin/Pages/Notification/Payment" 
// User
import UserDashboard from "../User/Pages/Dashboard/DashboardHome";
import UserItem from "../User/Pages/Item/Item";
import UserProfile from "../User/Pages/Profile/Profile";
import UserMatch from "../User/Pages/Match/Match";
import UserSetting from "../User/Pages/Setting/Setting";
import UserSuggestion from "../User/Pages/Notification/Suggestion";
import UserFeedback from "../User/Pages/Notification/Feedback";
import UserUpdates from "../User/Pages/Notification/Updates"
import Success from "../User/Pages/Notification/Success"
import Payment_receipts from "../User/Pages/Notification/Payment_receipts"

import UserLogout from "../User/Pages/Logout/Logout";
import LoginCopy from "../Interface/Login/LoginCopy"
import "./Landing.css"; // External CSS import

function Landing() {
  const [open, setOpen] = useState(true);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [role, setRole] = useState(localStorage.getItem("role")); // get role from localStorage

  useEffect(() => {
    const checkLogin = () => {
      const isLoggedInNow = localStorage.getItem("loggedIn") === "true";
      const currentRole = localStorage.getItem("role");
      if (isLoggedInNow !== loggedIn) setLoggedIn(isLoggedInNow);
      if (currentRole !== role) setRole(currentRole);
    };

    const intervalId = setInterval(checkLogin, 500);
    return () => clearInterval(intervalId);
  }, [loggedIn, role]);
  return (
    <BrowserRouter>
      {loggedIn ? (
        <div className="landing_container">
          <div>
            {/* <Sidebar /> */}
              <Sidebar open={open} setOpen={setOpen} />
         <div className={`dashboard-content ${open ? "sidebar-open" : "sidebar-closed"}`}></div>
          </div>
          <div className="dashboard-content">
            <Routes>
              {role === "admin" ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/item" element={<Item />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/match" element={<Match />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/suggestion" element={<Suggestion />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/updates" element={<Updates />} />
                  <Route path="/payment_receipts" element={<Payment_Receipts />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<UserDashboard />} />{" "}
                  {/* Your user dashboard */}
                  <Route path="/item" element={<UserItem />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/match" element={<UserMatch />} />
                  <Route path="/setting" element={<UserSetting />} />
                  <Route path="/suggestion" element={<UserSuggestion />} />
                  <Route path="/feedback" element={<UserFeedback />} />
                  <Route path="/updates" element={<UserUpdates />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/logout" element={<UserLogout />} />
                  <Route path="/payment_receipts" element={<Payment_receipts />} />
                  {/* Add more user-specific routes here */}
                </>
              )}+
              
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category" element={<Category />} />
            <Route path="/subcategory" element={<SubCategory />} />
            <Route path="/view" element={<View />} />
            <Route path="/loginCopy" element={<LoginCopy />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default Landing;
