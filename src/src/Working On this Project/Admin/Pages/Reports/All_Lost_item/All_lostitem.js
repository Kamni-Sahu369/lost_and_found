// import React, { useEffect, useState } from 'react';
// import {
//   Table,
//   Button,
//   Space,
//   Input,
//   Select,
//   message,
//   Modal,
//   Form,
//   Tooltip,
// } from 'antd';
// import {
//   EyeOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from '@ant-design/icons';
// import './All_lostitem.css';
// import {
//   fatch_all_lostitem,
//   Lost_delete,
//   Lost_update,
// } from '../../../../Api/Service';

// const { Search } = Input;
// const { Option } = Select;

// // ✅ Update your base URL
// const BASE_URL = "http://127.0.0.1:8000";

// const AllLostItems = () => {
//   const [data, setData] = useState([]);
//   const [originalData, setOriginalData] = useState([]);
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [searchValue, setSearchValue] = useState('');
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [form] = Form.useForm();

//    const handleFetchData = async () => {
//     try {
//       const result = await fatch_all_lostitem();
//       const updated = result.map((item) => ({
//         ...item,
//         key: item.id,
//         image: item.item_image,
//       }));
//       setData(updated);
//       setOriginalData(updated);
//     } catch (error) {
//       console.error(error);
//       message.error('Failed to fetch data');
//     }
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   // DELETE
//   const handleDelete = async (id) => {
//     try {
//       await Lost_delete(id);
//       const updated = data.filter((item) => item.id !== id);
//       setData(updated);
//       setOriginalData(updated);
//       message.success('Item deleted successfully');
//     } catch (error) {
//       console.error(error);
//       message.error('Failed to delete item');
//     }
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   // ✅ DELETE
//   const handleDelete = async (id) => {
//     try {
//       await Lost_delete(id);
//       const updated = data.filter((item) => item.id !== id);
//       setData(updated);
//       setOriginalData(updated);
//       message.success('Item deleted successfully');
//     } catch (error) {
//       console.error(error);
//       message.error('Failed to delete item');
//     }
//   };

//   // ✅ VIEW
//   const handleView = (item) => {
//     setSelectedItem(item);
//     setViewModalVisible(true);
//   };

//   // EDIT
//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     form.setFieldsValue(item);
//     setEditModalVisible(true);
//   };

//   const handleEditSubmit = async () => {
//     try {
//       const values = await form.validateFields();
//       await Lost_update(selectedItem.id, values);

//      const updated = data.map((item) =>
//       item.key === selectedItem.key ? { ...item, ...updated } : item
//     );
//       setData(updated);
//       setOriginalData(updated);
//       message.success('Item updated successfully');
//       setEditModalVisible(false);
//     } catch (error) {
//       console.error(error);
//       message.error('Failed to update item');
//     }
//   };

//   // ✅ FILTERING
//   const handleSearch = (value) => {
//     setSearchValue(value);
//     filterData(value, statusFilter);
//   };

//   const handleFilter = (value) => {
//     setStatusFilter(value);
//     filterData(searchValue, value);
//   };

//   const filterData = (search, status) => {
//     const filtered = originalData.filter((item) => {
//       const searchMatch = Object.values(item)
//         .join(' ')
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const statusMatch =
//         status === 'All' || !status ? true : item.status === status;

//       return searchMatch && statusMatch;
//     });

//     setData(filtered);
//   };

//   // ✅ TABLE COLUMNS
//   const columns = [
//     { title: 'Item Name', dataIndex: 'name', key: 'name' },
//     { title: 'Category', dataIndex: 'category', key: 'category' },
//     { title: 'Status', dataIndex: 'status', key: 'status' },
//     { title: 'Date', dataIndex: 'date', key: 'date' },
//     { title: 'Time', dataIndex: 'time', key: 'time' },
//     { title: 'Location', dataIndex: 'location', key: 'location' },
//     {
//       title: 'Image',
//       dataIndex: 'image',
//       key: 'image',
//       render: (url) => (
//        <a href={`${BASE_URL}${url}`} target="_blank" rel="noopener noreferrer">
//             <img src={`${BASE_URL}${url}`} alt="payment proof" width={50} />
//           </a>
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Tooltip title="View">
//             <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
//           </Tooltip>
//           <Tooltip title="Edit">
//             <Button
//               type="primary"
//               icon={<EditOutlined />}
//               onClick={() => handleEdit(record)}
//             />
//           </Tooltip>
//           <Tooltip title="Delete">
//             <Button
//               danger
//               icon={<DeleteOutlined />}
//               onClick={() => handleDelete(record.id)}
//             />
//           </Tooltip>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="lost-items-container">
//       <h2>All Lost Items</h2>

//       <div className="search-filter-container">
//         <Search
//           placeholder="Search across all fields"
//           allowClear
//           onSearch={handleSearch}
//           style={{ width: '60%' }}
//           className="oval-search"
//         />

//         <Select
//           placeholder="Filter by Status"
//           onChange={handleFilter}
//           defaultValue="All"
//           style={{ width: '35%' }}
//         >
//           <Option value="All">All</Option>
//           <Option value="Lost">Lost</Option>
//           <Option value="Found">Found</Option>
//         </Select>
//       </div>

//       <Table
//         columns={columns}
//         dataSource={data}
//         bordered
//         pagination={{ pageSize: 5 }}
//         rowKey="id"
//         scroll={{ x: 'max-content' }}
//       />

//       {/* View Modal */}
//       <Modal
//         title="View Item Details"
//         open={viewModalVisible}
//         footer={null}
//         onCancel={() => setViewModalVisible(false)}
//       >
//         {selectedItem && (
//           <ul>
//             <li><strong>Name:</strong> {selectedItem.name}</li>
//             <li><strong>Category:</strong> {selectedItem.category}</li>
//             <li><strong>Status:</strong> {selectedItem.status}</li>
//             <li><strong>Date:</strong> {selectedItem.date}</li>
//             <li><strong>Time:</strong> {selectedItem.time}</li>
//             <li><strong>Location:</strong> {selectedItem.location}</li>
//             <li><img src={`${BASE_URL}${selectedItem.image}`} alt="item" width="100" /></li>
//           </ul>
//         )}
//       </Modal>

//       {/* Edit Modal */}
//       <Modal
//         title="Edit Item"
//         open={editModalVisible}
//         onOk={handleEditSubmit}
//         onCancel={() => setEditModalVisible(false)}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="status" label="Status" rules={[{ required: true }]}>
//             <Select>
//               <Option value="Lost">Lost</Option>
//               <Option value="Found">Found</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item name="date" label="Date" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="time" label="Time" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="location" label="Location" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default AllLostItems;





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
import './All_lostitem.css';
import {
  fatch_all_lostitem,
  Lost_delete,
  Lost_update,
} from '../../../../Api/Service';

const { Search } = Input;
const { Option } = Select;

const BASE_URL = "http://127.0.0.1:8000";

const AllLostItems = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchValue, setSearchValue] = useState('');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  const handleFetchData = async () => {
    try {
      const result = await fatch_all_lostitem();
      const updated = result.map((item) => ({
        ...item,
        key: item.id,
        image: item.item_image,
      }));
      setData(updated);
      setOriginalData(updated);
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await Lost_delete(id);
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
      setOriginalData(updated);
      message.success('Item deleted successfully');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete item');
    }
  };

  // ✅ VIEW
  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalVisible(true);
  };

  // ✅ EDIT
  const handleEdit = (item) => {
    setSelectedItem(item);
    form.setFieldsValue(item);
    setEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await Lost_update(selectedItem.id, values);

      const updated = data.map((item) =>
        item.id === selectedItem.id ? { ...item, ...values } : item
      );
      setData(updated);
      setOriginalData(updated);
      message.success('Item updated successfully');
      setEditModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error('Failed to update item');
    }
  };

  // ✅ FILTERING
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
          <img src={`${BASE_URL}${url}`} alt="item" width={50} />
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
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="lost-items-container">
      <h2>All Lost Items</h2>

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
        rowKey="id"
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
            <li><img src={`${BASE_URL}${selectedItem.image}`} alt="item" width="100" /></li>
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
        </Form>
      </Modal>
    </div>
  );
};

export default AllLostItems;
