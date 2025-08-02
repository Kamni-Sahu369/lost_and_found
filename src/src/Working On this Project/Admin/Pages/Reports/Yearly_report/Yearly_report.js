import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Space,
  Tooltip,
  message,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import "./Payment_report.css";
import { get_userPayments } from "../../../../Api/Service";

const { Search } = Input;
const { Option } = Select;
const BASE_URL = "http://127.0.0.1:8000";

const PaymentReport = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [yearFilter, setYearFilter] = useState("All");
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

      const mappedData = response.map((item, index) => {
        const createdAt = new Date(item.created_at);
        const month = createdAt.toLocaleString("default", { month: "long" });
        const time = createdAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const year = createdAt.getFullYear();

        return {
          key: item.id || index,
          paymentId: item.transaction_id,
          month: month,
          time: time,
          year: year,
          itemName: item.lost_item_detail?.name,
          category: item.lost_item_detail?.category,
          location: item.lost_item_detail?.location,
          amount: item.amount,
          status: item.status,
          image: item.lost_item_detail?.item_image,
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

  const handleSearch = (value) => {
    setSearchValue(value);
    filterData(value, yearFilter);
  };

  const handleYearFilter = (value) => {
    setYearFilter(value);
    filterData(searchValue, value);
  };

  const filterData = (search, year) => {
    const filtered = originalData.filter((item) => {
      const searchMatch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const yearMatch = year === "All" || !year ? true : item.year.toString() === year;
      return searchMatch && yearMatch;
    });
    setData(filtered);
  };

  const columns = [
    { title: "Payment ID", dataIndex: "paymentId", key: "transaction_id" },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Year", dataIndex: "year", key: "year" },
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
          <a href={`${BASE_URL}${url}`} target="_blank" rel="noopener noreferrer">
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

  // Dynamically generate unique year options
  const uniqueYears = [...new Set(originalData.map((item) => item.year.toString()))];

  return (
    <div className="report-container">
      <h2>Yearly Report</h2>

      <div className="search-filter-container">
        <Search
          placeholder="Search payment records"
          allowClear
          onSearch={handleSearch}
          className="oval-search"
          style={{ width: "60%" }}
        />

        <Select
          defaultValue="All"
          onChange={handleYearFilter}
          style={{ width: "35%" }}
        >
          <Option value="All">All Years</Option>
          {uniqueYears.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
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
            <li><strong>Year:</strong> {selectedItem.year}</li>
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
        title="Edit Payment Report"
        open={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="paymentId" label="Payment ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
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
