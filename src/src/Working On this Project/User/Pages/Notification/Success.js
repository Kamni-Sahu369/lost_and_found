

import { useEffect, useState } from "react";

function Success() {
  const [sessionData, setSessionData] = useState(null);

  const sessionId = new URLSearchParams(window.location.search).get("session_id");

  useEffect(() => {
    if (sessionId) {
      fetch(`https://lost-and-found-co21.onrender.com/api/stripe/session/${sessionId}/`)
        .then((res) => res.json())
        .then((data) => {
          setSessionData(data);
          localStorage.setItem("paymentData", JSON.stringify(data)); // ✅ Store in localStorage
        })
        .catch((err) => {
          console.error("Session fetch error:", err);
        });
    } else {
      // ✅ Load from localStorage if session_id not found
      const savedData = localStorage.getItem("paymentData");
      if (savedData) {
        setSessionData(JSON.parse(savedData));
      }
    }
  }, [sessionId]);

  // Optional cleanup on unmount (remove old data)
  useEffect(() => {
    return () => {
      localStorage.removeItem("paymentData");
    };
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1 style={{ color: "green" }}>✅ Payment Success</h1>
      {sessionData ? (
        <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <p><strong>Payment ID:</strong> {sessionData.payment_intent}</p>
          <p><strong>Email:</strong> {sessionData.customer_email}</p>
          <p><strong>Amount Paid:</strong> ₹{sessionData.amount_total / 100}</p>
          <p><strong>Status:</strong> {sessionData.payment_status}</p>
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
}

export default Success;

