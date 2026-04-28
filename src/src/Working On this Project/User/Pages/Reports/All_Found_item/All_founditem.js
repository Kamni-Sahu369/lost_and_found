import React, { useEffect, useState } from 'react';
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
import {Found_update} from '../../../../Api/Service';
import {Found_delete} from '../../../../Api/Service';
import { Found_get } from '../../../../Api/Service';
import { toast } from 'react-toastify';

const { Search } = Input;
const { Option } = Select;
const BASE_URL = "https://lost-and-found-co21.onrender.com/";
const AllFoundItems = () => {
  const [data, setData] = useState([]); // no initial data
  const [originalData, setOriginalData] = useState([]); // to keep fetched data
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();


  const handleDelete = async (key) => {
  try {
    // Find the item by key to get its real ID
    const itemToDelete = data.find((item) => item.key === key);
    //  toast.success("Item deleted successfully!");
    if (!itemToDelete) {
      message.error("Item not found");
      return;
    }
    await Found_delete(itemToDelete.id);
    const updated = data.filter((item) => item.key !== key);
    setData(updated);
    setOriginalData(updated);
    toast.success("Item deleted successfully!");
  } catch (error) {
    console.error("Delete failed", error);
    message.error("Failed to delete item");
  }
};


  const handlefatchdata = async () => {
  const response = await Found_get(localStorage.getItem("user_id"));
  // Add `key` to each item
  const mappedData = response.map((item) => ({
    ...item,
    key: item.id, // required by Ant Design table
     image: item.item_image,
  }));

  setData(mappedData);
  setOriginalData(mappedData); // ✅ This was missing
};

  useEffect(()=>{
    handlefatchdata();
  },[])
 const handleupdatefounddata = (item) => {
  setSelectedItem(item);             // Set selected item
  form.setFieldsValue(item);        // Pre-fill form
  setEditModalVisible(true);        // Open modal only, do NOT call API here
};
  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalVisible(true);
  };
  const handleEditSubmit = async () => {
  try {
    const values = await form.validateFields();

    // ✅ Make PATCH request with selected item's ID
    const updatedItem = await Found_update(selectedItem.id, values);

    // ✅ Update local table data
    const updatedList = data.map((item) =>
      item.key === selectedItem.key ? { ...item, ...updatedItem } : item
    );

    setData(updatedList);
    setOriginalData(updatedList);
    toast.success("Item updated successfully!");
    setEditModalVisible(false);
  } catch (error) {
    console.error("Update failed", error);
    message.error("Failed to update item");
  }
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
       <a href={`${BASE_URL}${url}`} target="_blank" rel="noopener noreferrer">
            <img src={`${BASE_URL}${url}`} alt="payment proof" width={50} />
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
              onClick={() => handleupdatefounddata(record)}
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
             <img src={`${BASE_URL}${selectedItem.image}`} width={100} alt="proof" />
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
              <Option value="false">Lost</Option>
              <Option value="true">Found</Option>
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
        </Form>
      </Modal>
    </div>
  );
};

export default AllFoundItems;