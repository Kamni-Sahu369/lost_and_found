// src/Working On this Project/Landing/PublicLayout.js

import React from "react";
import Header from "../Interface/Header/Header";
import Footer from "../Interface/Footer/Footer";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
