// src/Working On this Project/Landing/DashboardLayout.js

import React from "react";
import Sidebar from "../Admin/Component/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="landing_container">
      <div>
        <Sidebar />
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
