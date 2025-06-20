// // src/components/CheckoutButton.js
// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51Rbg3MQTfWQgOkzpBqJZktgOL1U9TVvyZ3qoqxrygWmK7BQ1HgNUJ0eBc7NFFme7D8b7I5HFf4UC9ETmMLjsQUWN00hYuyPu7N'); // Replace with your key

// const CheckoutButton = () => {
//   const handleClick = async () => {
//     const res = await fetch('http://localhost:8000/create-checkout-session/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         product_name: 'T-shirt',
//         amount: 880, // in dollars
//       }),
//     });

//     const data = await res.json();
//     console.log("Data ",data)
//     if (data.sessionId) {
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: data.sessionId });
//     } else {
//       alert('Failed to create Stripe session.');
//     }
//   };

//   return <button onClick={handleClick}>Pay Now</button>;
// };

// export default CheckoutButton;









// src/components/CheckoutButton.js
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { get_userPayments } from "../../../Api/Service";

const stripePromise = loadStripe(
  "pk_test_51Rbg3MQTfWQgOkzpBqJZktgOL1U9TVvyZ3qoqxrygWmK7BQ1HgNUJ0eBc7NFFme7D8b7I5HFf4UC9ETmMLjsQUWN00hYuyPu7N"
);

const CheckoutButton = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [userEmail, setUserEmail] = useState(""); // optional: for sending email

  useEffect(() => {
    const getPayment = async () => {
      try {
        const response = await get_userPayments(); // this should return { amount: 880, email: "user@example.com", ... }
        console.log("Payment Info:", response);
        setPaymentInfo(response);
        setUserEmail(response?.email); // optional if needed by backend
      } catch (err) {
        console.error("Error fetching payment data", err);
      }
    };

    getPayment();
  }, []);

  const handleClick = async () => {
    if (!paymentInfo?.amount) {
      alert("Amount is missing.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/create-checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: paymentInfo.amount, // in ₹ (backend multiplies by 100)
          email: userEmail,           // optional, for Stripe receipt
        }),
      });

      const data = await res.json();
      console.log("Stripe session data:", data);

      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert(data.error || "Failed to create Stripe session.");
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
      alert("Payment failed.");
    }
  };

  return (
    <button onClick={handleClick} disabled={!paymentInfo}>
      Pay Now
    </button>
  );
};

export default CheckoutButton;

