import React, { useEffect, useState } from 'react';
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
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './Payment_report.css';
import { get_userPayments } from '../../../../Api/Service'; // Adjust path as needed

const { Search } = Input;
const { Option } = Select;

const PaymentReport = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const loggedInUserId = localStorage.getItem("user_id");

        const response = await get_userPayments();
        const updated = response
          .filter((item) => item.payer_detail?.id?.toString() === loggedInUserId)
          .map((item) => ({
            key: item.id,
            paymentId: item.payment_id || 'N/A',
            amount: `₹${item.amount}`,
            status: item.status,
            date: new Date(item.created_at).toLocaleDateString(),
            time: new Date(item.created_at).toLocaleTimeString(),
            itemName: item?.lost_item_detail?.name || item?.found_item_detail?.name || 'N/A',
            category: item?.lost_item_detail?.category || item?.found_item_detail?.category || 'N/A',
            location: item?.lost_item_detail?.location || item?.found_item_detail?.location || 'N/A',
            image: item?.lost_item_detail?.item_image || item?.found_item_detail?.item_image || 'https://via.placeholder.com/100',
            month: new Date(item.created_at).toLocaleString('default', { month: 'long' }),
            year: new Date(item.created_at).getFullYear(),
          }));

        setData(updated);
        setOriginalData(updated);
      } catch (error) {
        console.error("Error loading payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalVisible(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    form.setFieldsValue(item);
    setEditModalVisible(true);
  };

  const handleDelete = (key) => {
    const updated = data.filter((item) => item.key !== key);
    setData(updated);
    setOriginalData(updated);
    message.success('Entry deleted');
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      const updated = data.map((item) =>
        item.key === selectedItem.key ? { ...item, ...values } : item
      );
      setData(updated);
      setOriginalData(updated);
      message.success('Payment updated');
      setEditModalVisible(false);
    });
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    filterData(value, statusFilter);
  };

  const handleFilter = (value) => {
    setStatusFilter(value);
    filterData(searchValue, value);
  };

  const filterData = (search, status) => {
    const filtered = originalData.filter((item) => {
      const searchMatch = Object.values(item).join(' ').toLowerCase().includes(search.toLowerCase());
      const statusMatch = status === 'All' || !status ? true : item.status === status.toLowerCase();
      return searchMatch && statusMatch;
    });
    setData(filtered);
  };

  const columns = [
    { title: 'Payment ID', dataIndex: 'paymentId', key: 'paymentId' },
    { title: 'Month', dataIndex: 'month', key: 'month' },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={url} alt="payment proof" width={50} />
        </a>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="report-container">
      <h2>My Payment Report</h2>

      <div className="search-filter-container">
        <Search
          placeholder="Search payment records"
          allowClear
          onSearch={handleSearch}
          className="oval-search"
          style={{ width: '60%' }}
        />

        <Select defaultValue="All" onChange={handleFilter} style={{ width: '35%' }}>
          <Option value="All">All</Option>
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="failed">Failed</Option>
        </Select>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="key"
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: 'max-content' }}
      />

      {/* View Modal */}
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
            <li><strong>Year:</strong> {selectedItem.year}</li>
            <li><strong>Item Name:</strong> {selectedItem.itemName}</li>
            <li><strong>Category:</strong> {selectedItem.category}</li>
            <li><strong>Date:</strong> {selectedItem.date}</li>
            <li><strong>Time:</strong> {selectedItem.time}</li>
            <li><strong>Location:</strong> {selectedItem.location}</li>
            <li><strong>Amount:</strong> {selectedItem.amount}</li>
            <li><strong>Status:</strong> {selectedItem.status}</li>
            <li>
              <img src={selectedItem.image} alt="Payment Proof" width={100} />
            </li>
          </ul>
        )}
      </Modal>

      {/* Edit Modal */}
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
          <Form.Item name="month" label="Month" rules={[{ required: true }]}>
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
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <Input type="time" />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="paid">Paid</Option>
              <Option value="pending">Pending</Option>
              <Option value="failed">Failed</Option>
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
