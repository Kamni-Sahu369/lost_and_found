
// import React, { useEffect, useState } from "react";
// import { Card, Row, Col, Empty, Spin } from "antd";


// const All_founditem = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchFoundItems = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/api/found-items/");
//       if (!response.ok) throw new Error("Failed to fetch found items");
//       const data = await response.json();
//       setItems(data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFoundItems();
//   }, []);

//   return (
//     <div style={{ padding: "24px" }}>
//       <h2>📦 Found Items</h2>

//       {loading ? (
//         <Spin tip="Loading..." />
//       ) : items.length === 0 ? (
//         <Empty description="No found items yet." />
//       ) : (
//         <Row gutter={[16, 16]}>
//           {items.map((item) => (
//             <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
//               <Card
//                 hoverable
//                 title={item.name}
//                 cover={
//                   <img
//                     alt={item.name}
//                     src={`http://localhost:8000${item.item_image}`}
//                     style={{ height: 180, objectFit: "cover", borderRadius: 4 }}
//                   />
//                 }
//               >
//                 <p><strong>Category:</strong> {item.category}</p>
//                 <p><strong>Date:</strong> {item.date}</p>
//                 <p><strong>Time:</strong> {item.time}</p>
//                 <p><strong>Location:</strong> {item.location}</p>
//                 <p><strong>Description:</strong> {item.description || "N/A"}</p>
//                 <p><strong>Status:</strong> {item.status ? "Active" : "Inactive"}</p>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default All_founditem;



















import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  message,
  Modal,
  Form,
  Tooltip,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import './All_founditem.css';

const { Search } = Input;
const { Option } = Select;

const AllFoundItems = () => {
  const [data, setData] = useState([]); // no initial data
  const [originalData, setOriginalData] = useState([]); // to keep fetched data
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  const handleDelete = (key) => {
    const updated = data.filter((item) => item.key !== key);
    setData(updated);
    setOriginalData(updated); // update original data too
    message.success('Item deleted');
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalVisible(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    form.setFieldsValue(item);
    setEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      const updated = data.map((item) =>
        item.key === selectedItem.key ? { ...item, ...values } : item
      );
      setData(updated);
      setOriginalData(updated);
      message.success('Item updated');
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
      const searchMatch = Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

      const statusMatch =
        status === 'All' || !status ? true : item.status === status;

      return searchMatch && statusMatch;
    });

    setData(filtered);
  };

  const columns = [
    { title: 'Item Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={url} alt="item" width={50} />
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
    <div className="found-items-container">
      <h2>All Found Items</h2>

      <div className="search-filter-container">
        <Search
          placeholder="Search across all fields"
          allowClear
          onSearch={handleSearch}
          style={{ width: '60%' }}
          className="oval-search"
        />

        <Select
          placeholder="Filter by Status"
          onChange={handleFilter}
          defaultValue="All"
          style={{ width: '35%' }}
        >
          <Option value="All">All</Option>
          <Option value="Lost">Lost</Option>
          <Option value="Found">Found</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 5 }}
        rowKey="key"
        scroll={{ x: 'max-content' }}
      />

      {/* View Modal */}
      <Modal
        title="View Item Details"
        open={viewModalVisible}
        footer={null}
        onCancel={() => setViewModalVisible(false)}
      >
        {selectedItem && (
          <ul>
            <li><strong>Name:</strong> {selectedItem.name}</li>
            <li><strong>Category:</strong> {selectedItem.category}</li>
            <li><strong>Status:</strong> {selectedItem.status}</li>
            <li><strong>Date:</strong> {selectedItem.date}</li>
            <li><strong>Time:</strong> {selectedItem.time}</li>
            <li><strong>Location:</strong> {selectedItem.location}</li>
            <li><img src={selectedItem.image} alt="item" width="100" /></li>
          </ul>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Item"
        open={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => setEditModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Option value="Lost">Lost</Option>
              <Option value="Found">Found</Option>
            </Select>
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="time" label="Time" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllFoundItems;