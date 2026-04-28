


import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  Button,
  Tooltip,
  Modal,
  Tag,
  Empty,
  Avatar,
  Descriptions,
  Image,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Pending.css";
import { toast } from "react-toastify";
import { get_claimItem } from "../../../../Api/InterfaceService";
import { post_payment } from "../../../../Api/Service";

function Pending() {
  const [claims, setClaims] = useState([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [lost_items,setLostItems]=useState(null)
  const [paymentAmount, setPaymentAmount] = useState("");
  const [user_id, setUserid] = useState("");

  const getClaims = async () => {
    const data = await get_claimItem();
    setClaims(data);
  };

  useEffect(() => {
    getClaims();
  }, []);

  const handleApprove = (id,lost_item, user_id) => {
    setSelectedClaimId(id);
    setUserid(user_id);
    setPaymentModalVisible(true);
    setLostItems(lost_item)
  };

  const handleReject = (id) => {
    Modal.confirm({
      title: "Reject Claim?",
      content: "Are you sure you want to reject this claim?",
      okText: "Yes, Reject",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        setClaims((prev) => prev.filter((item) => item.id !== id));
      },
    });
  };

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
      payer: user_id,
      lost_item:lost_items
    };

    try {
      await post_payment(paymentData);
      toast.success("Claim Approved & Payment Recorded!");

      setClaims((prevClaims) =>
        prevClaims.filter((claim) => claim.id !== selectedClaimId)
      );

      setPaymentModalVisible(false);
      setPaymentAmount("");
      setSelectedClaimId(null);
    } catch (err) {
      alert("Failed to record payment");
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h3 style={{ marginBottom: 12 }}>📋 Pending Claims</h3>

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
              style={{
                marginBottom: 16,
                padding: 12,
                borderRadius: 6,
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
              title={
                <div
                  className="card-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "14px",
                  }}
                >
                  <div>
                    <Avatar
                      icon={<UserOutlined />}
                      size="small"
                      style={{ marginRight: 6 }}
                    />
                    <strong>{claim.users?.name}</strong>
                    <Tag
                      color="blue"
                      style={{ marginLeft: 6, fontSize: "10px", padding: "0 6px" }}
                    >
                      {claim.status.toUpperCase()}
                    </Tag>
                  </div>
                  <span style={{ color: "#888", fontSize: "12px" }}>
                    {new Date(claim.created_at).toLocaleString()}
                  </span>
                </div>
              }
            >
              <Descriptions column={2} size="small" layout="vertical" bordered>
                <Descriptions.Item label="Description">
                  {claim.description}
                </Descriptions.Item>
                <Descriptions.Item label="Location">
                  {claim.location_info}
                </Descriptions.Item>

                <Descriptions.Item label="Email">
                  {claim.users?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {claim.users?.phone}
                </Descriptions.Item>

                {claim.lost_item_detail && (
                  <>
                    <Descriptions.Item label="Lost Item Name">
                      {claim.lost_item_detail.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">
                      {claim.lost_item_detail.category}
                    </Descriptions.Item>

                    <Descriptions.Item label="Lost Date">
                      {claim.lost_item_detail.date}
                    </Descriptions.Item>
                    <Descriptions.Item label="Time">
                      {claim.lost_item_detail.time}
                    </Descriptions.Item>

                    <Descriptions.Item label="Item Description" span={2}>
                      {claim.lost_item_detail.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Lost Location" span={2}>
                      {claim.lost_item_detail.location}
                    </Descriptions.Item>

                    {claim.lost_item_detail.item_image && (
                      <Descriptions.Item label="Image" span={2}>
                        <Image
                          width={150}
                          src={`https://lost-and-found-co21.onrender.com${claim.lost_item_detail.item_image}`}
                          alt="Lost item"
                          style={{ borderRadius: 6 }}
                        />
                      </Descriptions.Item>
                    )}
                  </>
                )}

                {claim.receipt_bill && (
                  <Descriptions.Item label="Proof">
                    <a
                      href={`https://lost-and-found-co21.onrender.com${claim.receipt_bill}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileTextOutlined /> View
                    </a>
                  </Descriptions.Item>
                )}
              </Descriptions>

              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                }}
              >
                <Tooltip title="Approve Claim">
                  <Button
                    type="primary"
                    size="small"
                    icon={<CheckCircleOutlined />}
                    onClick={() => handleApprove(claim.id,claim.lost_item_detail.id, claim.user)}
                  >
                    Approve
                  </Button>
                </Tooltip>
                <Tooltip title="Reject Claim">
                  <Button
                    danger
                    size="small"
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
        okText="Confirm"
        cancelText="Cancel"
      >
        <label>Payment Amount (₹):</label>
        <input
          type="number"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          style={{ width: "100%", marginTop: 8, padding: 6 }}
          placeholder="Enter amount"
        />
      </Modal>
    </div>
  );
}

export default Pending;
