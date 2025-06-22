// src/pages/Success.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { message } from "antd";

const Success = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      alert("🎉 Payment successful!");
      // ✅ Optional: Call your backend to verify session & store in DB
    }
  }, [location]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>✅ Payment Completed</h1>
      <p>Your payment has been successfully processed.</p>
    </div>
  );
};

export default Success;
