
// PendingPaymentsPage.js

import React, { useEffect, useState } from 'react';
import './Pending_pay.css';

const PendingPaymentsPage = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    payerId: '',
    amount: ''
  });

  // ✅ Load Razorpay Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Fetch payments on mount
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("http://localhost:8000/paymentsList/");
      const data = await res.json();
      console.log("Fetched payments:", data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit to create payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/payments/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payer_id: formData.payerId,
          // receiver_id: 1, // replace with actual receiver_id
          amount: formData.amount
        }),
      });
      setFormData({ payerId: '', amount: '' });
      fetchPayments(); // Refresh table
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  // ✅ Payment Handler
  const handlePayment = async (item) => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Step 1: Create Razorpay Order from Django
    const orderRes = await fetch("http://localhost:8000/payments/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payer_id: item.payer.id,
        // receiver_id: item.receiver?.id || 1, // replace with actual logic
        amount: item.amount
      }),
    });

    const orderData = await orderRes.json();
    if (!orderData || !orderData.transaction_id) {
      alert("Failed to create Razorpay order");
      return;
    }

    // Step 2: Open Razorpay Checkout
    const options = {
      key: "rzp_test_s79mdLqr3Mp1I3", // 🔁 Replace with your live key
      amount: item.amount * 100,
      currency: "INR",
      name: "Payments Portal",
      description: "Pending Payment",
      order_id: orderData.transaction_id,
      handler: async function (response) {
        // Step 3: Confirm payment success to backend
        const confirmRes = await fetch("http://localhost:8000/payments/webhook/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_id: item.id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
          }),
        });

        if (confirmRes.ok) {
          alert("Payment successful and recorded!");
          fetchPayments(); // Refresh table
        } else {
          alert("Payment captured, but failed to save in DB.");
        }
      },
      prefill: {
        name: item.payer?.name || "User",
        email: item.payer?.email || "user@example.com",
        contact: "9999999999",
      },
      theme: { color: "#1d1d1d" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="page-container">
      <h1>Payments Management</h1>

      {/* ✅ Payment Creation Form */}
      {/* <form className="payment-form" onSubmit={handleSubmit}>
        <label>
          Payer ID:
          <input
            type="number"
            name="payerId"
            value={formData.payerId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Create Payment</button>
      </form> */}

      {/* ✅ Payments Table */}
      <div className="table-container">
        <h2>Submitted Payments</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Lost Item</th>
              {/* <th>Found Item</th> */}
              <th>Category</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Payer</th>
              {/* <th>Receiver</th> */}
              <th>Is Paid</th>
              <th>Transaction ID</th>
              {/* <th>Pay Now</th> */}
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.lost_item_detail?.name || '-'}</td>
                  {/* <td>{item.found_item?.name || '-'}</td> */}
                  <td>{item.lost_item_detail?.category || '-'}</td>
                  <td>{item.status}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.payer_detail?.name}</td>
                  {/* <td>{item.receiver_email}</td> */}
                  <td>{item.is_paid ? 'Yes' : 'No'}</td>
                  <td>{item.transaction_id || '-'}</td>
                  {/* <td>
                    {!item.is_paid ? (
                      <button
                        className="pay-now-btn"
                        onClick={() => handlePayment(item)}
                      >
                        Pay Now
                      </button>
                    ) : (
                      "✅ Paid"
                    )}
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingPaymentsPage;



