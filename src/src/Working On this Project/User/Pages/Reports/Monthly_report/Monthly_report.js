import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Select,
  Modal,
  Form,
  Space,
  Input,
  Tooltip,
  message,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { get_userPayments } from "../../../../Api/Service";

const { Option } = Select;
const BASE_URL = "https://lost-and-found-co21.onrender.com";

const PaymentReport = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalVisible(true);
  };

 
const handlepayreport = async () => {
  try {
    const response = await get_userPayments();

    const loggedInUserId = localStorage.getItem("user_id");

    const mappedData = response
      .filter((item) => item.payer_detail?.id?.toString() === loggedInUserId)
      .map((item, index) => {
        const createdAt = new Date(item.created_at);
        const month = createdAt.toLocaleString("default", { month: "long" });
        const time = createdAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          key: item.id || index,
          paymentId: item.transaction_id,
          month,
          time,
          itemName: item.lost_item_detail?.name || item.found_item_detail?.name || "N/A",
          category: item.lost_item_detail?.category || item.found_item_detail?.category || "N/A",
          location: item.lost_item_detail?.location || item.found_item_detail?.location || "N/A",
          amount: item.amount,
          status: item.status,
          image: item.lost_item_detail?.item_image || item.found_item_detail?.item_image || "",
        };
      });

    setData(mappedData);
    setOriginalData(mappedData);
  } catch (error) {
    console.error("Failed to load payment report:", error);
    message.error("Failed to load payment report");
  }
};
  useEffect(() => {
    handlepayreport();
  }, []);

  const handleEdit = (item) => {
    setSelectedItem(item);
    form.setFieldsValue(item);
    setEditModalVisible(true);
  };

  const handleDelete = (key) => {
    const updated = data.filter((item) => item.key !== key);
    setData(updated);
    setOriginalData(updated);
    message.success("Entry deleted");
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      const updated = data.map((item) =>
        item.key === selectedItem.key ? { ...item, ...values } : item
      );
      setData(updated);
      setOriginalData(updated);
      message.success("Payment updated");
      setEditModalVisible(false);
    });
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    applyFilters(value, monthFilter);
  };

  const handleMonthFilter = (value) => {
    setMonthFilter(value);
    applyFilters(statusFilter, value);
  };

  const applyFilters = (status, month) => {
    const filtered = originalData.filter((item) => {
      const matchStatus =
        status === "All" || item.status === status;
      const matchMonth =
        month === "All" || item.month === month;
      return matchStatus && matchMonth;
    });
    setData(filtered);
  };

  const months = [
    "All", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const columns = [
    { title: "Payment ID", dataIndex: "paymentId", key: "transaction_id" },
    { title: "Month", dataIndex: "month", key: "month" },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Item Name", dataIndex: "itemName", key: "itemName" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) =>
        url ? (
          <a
            href={`${BASE_URL}${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={`${BASE_URL}${url}`} alt="payment proof" width={50} />
          </a>
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.key)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="report-container">
      <h2>Monthly Payment Report</h2>

      <div className="search-filter-container" style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <Select defaultValue="All" style={{ width: "50%" }} onChange={handleMonthFilter}>
          {months.map((month) => (
            <Option key={month} value={month}>
              {month}
            </Option>
          ))}
        </Select>

        <Select defaultValue="All" style={{ width: "50%" }} onChange={handleStatusFilter}>
          <Option value="All">All</Option>
          <Option value="Paid">Paid</Option>
          <Option value="Pending">Pending</Option>
        </Select>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: "max-content" }}
      />

      <Modal
        title="View Payment Report"
        open={viewModalVisible}
        footer={null}
        onCancel={() => setViewModalVisible(false)}
      >
        {selectedItem && (
          <ul>
            <li><strong>Payment ID:</strong> {selectedItem.paymentId}</li>
            <li><strong>Month:</strong> {selectedItem.month}</li>
            <li><strong>Time:</strong> {selectedItem.time}</li>
            <li><strong>Item Name:</strong> {selectedItem.itemName}</li>
            <li><strong>Category:</strong> {selectedItem.category}</li>
            <li><strong>Location:</strong> {selectedItem.location}</li>
            <li><strong>Amount:</strong> {selectedItem.amount}</li>
            <li><strong>Status:</strong> {selectedItem.status}</li>
            <li>
              {selectedItem.image && (
                <img src={`${BASE_URL}${selectedItem.image}`} width={100} alt="proof" />
              )}
            </li>
          </ul>
        )}
      </Modal>

      <Modal
        title="Edit Monthly Report"
        open={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="paymentId" label="Payment ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="month" label="Month" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="itemName" label="Item Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Paid">Paid</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentReport;
