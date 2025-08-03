import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { get_allPayments } from "../../../../Api/InterfaceService"; // ✅ path adjust karein as per your structure
import "./Approval.css"; // 👈 external CSS file for styling (optional)

function ApprovalRequest() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_allPayments()
      .then((data) => {
        setPayments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch payments", err);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "id",
      key: "id",
    },
   {
      title: "User",
      dataIndex: ["lost_item_detail", "user"], // agar nested field ho
      key: "user",
    },
    {
      title: "Claim",
      dataIndex: "claim",
      key: "claim",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];

  return (
    <div className="approval-request-container">
      <h2 className="approval-request-title">Approval Requests</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          dataSource={payments}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
}

export default ApprovalRequest;