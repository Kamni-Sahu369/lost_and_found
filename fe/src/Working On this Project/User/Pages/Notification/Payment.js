// src/components/CheckoutButton.js
import React, { useState , useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { get_userPayments } from "../../../Api/Service";
const stripePromise = loadStripe(
  "pk_test_51Rbg3MQTfWQgOkzpBqJZktgOL1U9TVvyZ3qoqxrygWmK7BQ1HgNUJ0eBc7NFFme7D8b7I5HFf4UC9ETmMLjsQUWN00hYuyPu7N"
); // Replace with your key

const CheckoutButton = () => {
  const [newPayemnt, setnewPayment] = useState();

  const handleClick = async () => {
    const res = await fetch("http://localhost:8000/create-checkout-session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: "T-shirt",
        amount: 880, // in dollars
      }),
    });

    const data = await res.json();
    console.log("Data ", data);
    if (data.sessionId) {
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      alert("Failed to create Stripe session.");
    }
  };

  const get_payment = async () => {
    const response = await get_userPayments();
    console.log("Amount", response);
    setnewPayment(response);
  };
  useEffect(() => {
    get_payment();
  }, []);

  return <button onClick={handleClick}>Pay Now</button>;
};

export default CheckoutButton;
