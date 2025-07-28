

import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import axios from "axios";
import "./Logout.css";

function Logout() {
  const navigate = useNavigate();

  const handleCancelLogout = () => {
    navigate("/dashboard");
  };

  const handleConfirmLogout = () => {
  try {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    navigate("/");
  } catch (error) {
    console.error("Logout failed:", error);

    // Even in case of error, attempt to clear localStorage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
    navigate("/");
  }
};

  return (
    <div className="logout-page">
      <div className="logout-card">
        <div className="logout-icon">
          <AlertCircle className="icon" />
        </div>
        <h2 className="logout-title">Are you sure you want to logout?</h2>
        <div className="logout-buttons">
          <button className="btn cancel" onClick={handleCancelLogout}>
            Cancel
          </button>
          <button className="btn confirm" onClick={handleConfirmLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
