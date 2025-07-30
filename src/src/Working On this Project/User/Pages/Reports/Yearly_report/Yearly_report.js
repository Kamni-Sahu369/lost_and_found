import React, { useState } from 'react';
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
import './Yearly_report.css';

const { Search } = Input;
const { Option } = Select;

const YearlyReport = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

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
      message.success('Report updated');
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
      const statusMatch = status === 'All' || !status ? true : item.status === status;
      return searchMatch && statusMatch;
    });
    setData(filtered);
  };

  const columns = [
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Item Name', dataIndex: 'itemName', key: 'itemName' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Total Items Reported', dataIndex: 'totalItemsReported', key: 'totalItemsReported' },
    { title: 'Total Matched Items', dataIndex: 'totalMatchedItems', key: 'totalMatchedItems' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={url} alt="report" width={50} />
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
      <h2>Yearly Report</h2>

      <div className="search-filter-container">
        <Search
          placeholder="Search yearly reports"
          allowClear
          onSearch={handleSearch}
          className="oval-search"
          style={{ width: '60%' }}
        />

        <Select defaultValue="All" onChange={handleFilter} style={{ width: '35%' }}>
          <Option value="All">All</Option>
          <Option value="Complete">Complete</Option>
          <Option value="In Progress">In Progress</Option>
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

      <Modal
        title="View Yearly Report"
        open={viewModalVisible}
        footer={null}
        onCancel={() => setViewModalVisible(false)}
      >
        {selectedItem && (
          <ul>
            <li><strong>Year:</strong> {selectedItem.year}</li>
            <li><strong>Item Name:</strong> {selectedItem.itemName}</li>
            <li><strong>Category:</strong> {selectedItem.category}</li>
            <li><strong>Date:</strong> {selectedItem.date}</li>
            <li><strong>Time:</strong> {selectedItem.time}</li>
            <li><strong>Location:</strong> {selectedItem.location}</li>
            <li><strong>Total Items Reported:</strong> {selectedItem.totalItemsReported}</li>
            <li><strong>Total Matched Items:</strong> {selectedItem.totalMatchedItems}</li>
            <li><strong>Status:</strong> {selectedItem.status}</li>
            <li>
              <img src={selectedItem.image} alt="Yearly Report" width={100} />
            </li>
          </ul>
        )}
      </Modal>

      <Modal
        title="Edit Yearly Report"
        open={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
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
          <Form.Item name="totalItemsReported" label="Total Items Reported" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="totalMatchedItems" label="Total Matched Items" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Complete">Complete</Option>
              <Option value="In Progress">In Progress</Option>
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

export default YearlyReport;