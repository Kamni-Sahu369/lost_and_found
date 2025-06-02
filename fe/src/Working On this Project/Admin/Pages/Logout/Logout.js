// LogoutCard.js
import React from "react";
import { AlertCircle } from "lucide-react";
import "./Logout.css";

const LogoutCard = ({ onConfirm, onCancel }) => {



  return (
    <div className="logout-page">
      <div className="logout-card">
        <div className="logout-icon">
          <AlertCircle className="icon" />
        </div>
        <h2 className="logout-title">Are you sure you want to logout?</h2>
        <div className="logout-buttons">
          <button className="btn cancel" onClick={onCancel}>Cancel</button>
          <button className="btn confirm" onClick={onConfirm}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutCard;
