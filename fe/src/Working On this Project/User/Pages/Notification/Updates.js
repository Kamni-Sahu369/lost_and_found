import React, { useEffect, useState } from "react";
import { Card, Empty, Tag } from "antd";
import { get_userPayments  } from "../../../Api/Service"; // ⬅️ define this API call
import Payment from "./Payment"
function UserPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
  const fetchPayments = async () => {
    try {
      const res = await get_userPayments(localStorage.getItem("user_id")); // API returns array directly
      console.log("User Payments:", res);
      setPayments(Array.isArray(res) ? res : []); // ✅ defensive + correct
    } catch (error) {
      console.error("Failed to fetch payments", error);
    }
  };

  fetchPayments();
}, []);


  return (
    <div style={{ padding: 24 }}>
      <h2>💳 Your Approved Claims & Payments</h2>

      {payments.length === 0 ? (
        <Empty description="No approved claims yet" />
      ) : (
        payments.map((item) => (
          <Card
            key={item.claim_id}
            style={{ marginBottom: 16 }}
            title={`Claim #${item.claim_id}`}
          >
            <p><strong>amount:</strong> {item.amount}</p>
            {/* <p><strong>amount:</strong> {item.amount}</p> */}

            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Location/Time:</strong> {item.location_info}</p>
            {item.receipt_bill && (
              <p>
                <a
                  href={`http://localhost:8000${item.receipt_bill}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Receipt
                </a>
              </p>
            )}

            <Tag color="green">Approved</Tag>

            {item.payment ? (
              <div style={{ marginTop: 12 }}>
                <p><strong>Amount:</strong> ₹{item.payment.amount}</p>
                <p><strong>Status:</strong> {item.payment.status}</p>
                <p><strong>Txn ID:</strong> {item.payment.transaction_id}</p>
                <p><strong>Method:</strong> {item.payment.method}</p>
                <p><strong>Paid At:</strong> {new Date(item.payment.payment_time).toLocaleString()}</p>
              </div>
            ) : (
              <Tag color="orange">
                <Payment amount={item.amount}/>
              </Tag>
            )}
          </Card>
        ))
      )}
    </div>
  );
}

export default UserPayments;
