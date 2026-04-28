import React, { useEffect, useState } from "react";
import { Card, List, Button, Tooltip, Modal, Tag, Empty } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./Updates.css";
import { get_claimItem } from "../../../Api/InterfaceService";
import { post_payment } from "../../../Api/Service";
function Updates() {
  const [claims, setClaims] = useState([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [user_id,setUserid]=useState('')
  // const [userName, setUserName] = useState()
  // const user_id = localStorage.getItem("user_id");
  // Fetch claims on mount
  const getClaims = async () => {
    const data = await get_claimItem();
    console.log("Fetched claims:", data);
    setClaims(data);
  };

  useEffect(() => {
    getClaims();
  }, []);

  // Open modal for approval
  const handleApprove = (id,user_id) => {
    setSelectedClaimId(id);
    setUserid(user_id)
    setPaymentModalVisible(true);
  };

  // Confirm rejection
  const handleReject = (id) => {
    Modal.confirm({
      title: "Reject Claim?",
      content: "Are you sure you want to reject this claim?",
      okText: "Yes, Reject",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        alert("Claim Rejected.");
        setClaims((prev) => prev.filter((item) => item.id !== id));
        // 🟡 Backend call for rejection can be added here
      },
    });
  };

  // Modal confirm approve
  const confirmApproval = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
      alert("Please enter a valid payment amount");
      return;
    }

    const paymentData = {
      claim: selectedClaimId,
      amount: Number(paymentAmount),
      status: "pending",
      transaction_id: "TXN" + Date.now(),
      method: "Manual",
      user: user_id, // ⬅️ hardcoded user_id (use dynamic one if needed)
      // user_name : userName
    };

    try {
      const res = await post_payment(paymentData);
      console.log("Payment response:", res);
      alert("Claim Approved & Payment Recorded!");

      setClaims((prevClaims) => prevClaims.filter((claim) => claim.id !== selectedClaimId));

      setPaymentModalVisible(false);
      setPaymentAmount("");
      setSelectedClaimId(null);
    } catch (err) {
      console.error("Payment error:", err);
      alert("Failed to record payment");
    }
  };
  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: 16 }}>📋 Pending Claims</h2>

      {claims.length === 0 ? (
        <Empty description="No pending claims" />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={claims}
          renderItem={(claim) => (
            <Card
              key={claim.id}
              className="claim-card"
              title={
                <div className="card-header">
                  <span>
                    👤 <strong>{claim.users.name}</strong>
                    <Tag color="blue" style={{ marginLeft: 10 }}>
                      Submitted
                    </Tag>
                  </span>
                  <span className="date">
                    {new Date(claim.submitted_at).toLocaleString()}
                  </span>
                </div>
              }
            >
              <p>
                <strong>Description:</strong> {claim.description}
              </p>
              <p>
                <strong>Location/Time:</strong> {claim.location_info}
              </p>

              {claim.receipt_bill && (
                <p>
                  <FileTextOutlined />{" "}
                  <a
                    href={`https://lost-and-found-co21.onrender.com${claim.receipt_bill}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Attached Proof
                  </a>
                </p>
              )}

              <div className="action-buttons">
                <Tooltip title="Approve Claim">
                  <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleApprove(claim.id,claim.user)}
                  >
                    Approve
                  </Button>
                </Tooltip>

                <Tooltip title="Reject Claim">
                  <Button
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={() => handleReject(claim.id)}
                  >
                    Reject
                  </Button>
                </Tooltip>
              </div>
            </Card>
          )}
        />
      )}

      {/* Payment Modal */}
      <Modal
        title="Enter Payment Details"
        visible={paymentModalVisible}
        onOk={confirmApproval}
        onCancel={() => {
          setPaymentModalVisible(false);
          setPaymentAmount("");
          setSelectedClaimId(null);
        }}
        okText="Confirm & Approve"
      >
        <label>Payment Amount (₹):</label>
        <input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          style={{ width: "100%", marginTop: 8, padding: 8 }}
          placeholder="Enter amount"
        />
      </Modal>
    </div>
  );
}

export default Updates;
