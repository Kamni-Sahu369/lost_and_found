
import React, { useEffect, useState } from "react";
import { payment_receipts } from "../../../Api/Service";

function Payment_receipts() {
  const [payments, setPayments] = useState([]); // array for multiple payments

  useEffect(() => {
    const fetch_payment = async () => {
      try {
        const response = await payment_receipts();
        console.log(response, "Fetched payments");
        setPayments(response); // should be a list now
      } catch (error) {
        console.error("Failed to fetch payment receipts:", error);
      }
    };

    fetch_payment();
  }, []);

  return (
    <div>
      <h2>Payment Receipts</h2>
      {payments.length > 0 ? (
        payments.map((payment, index) => (
          <div key={index} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
            <p>Amount: ₹{payment.amount}</p>
            <p>Status: {payment.status}</p>
            <p>Date: {payment.date}</p>
            <p>Session ID: {payment.session_id}</p>
          </div>
        ))
      ) : (
        <p>Loading or no payment found</p>
      )}
    </div>
  );
}

export default Payment_receipts;

