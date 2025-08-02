// import React, { useEffect, useState } from 'react';
// import { Table, Input, Space, Tag, Modal, Form, Button } from 'antd';
// import { EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
// import { Lost_get, Found_get, Lost_update, Found_update, Lost_delete, Found_delete } from '../../../Api/Service.js';
// import './Item.css';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const LostFoundTable = () => {
//   const [data, setData] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [editRecord, setEditRecord] = useState(null);
//   const [form] = Form.useForm();

//   const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
//   const [deleteRecord, setDeleteRecord] = useState(null);

//   // Fetch items
//   // const fetchItems = async () => {
//   //   try {
//   //     const [lostDataRaw, foundDataRaw] = await Promise.all([Lost_get(), Found_get()]);

//   //     const lostData = lostDataRaw.map((item, index) => ({
//   //       key: `L-${index + 1}`,
//   //       id: item.id,
//   //       name: item.name,
//   //       category: item.category,
//   //       status: false,
//   //       type: 'Lost',
//   //       date: item.date,
//   //       time: item.time,
//   //       location: item.location,
//   //       image: item.item_image,
//   //       description: item.description,
//   //     }));

//   //     const foundData = foundDataRaw.map((item, index) => ({
//   //       key: `F-${index + 1}`,
//   //       id: item.id,
//   //       name: item.name,
//   //       category: item.category,
//   //       status: true,
//   //       type: 'Found',
//   //       date: item.date,
//   //       time: item.time,
//   //       location: item.location,
//   //       image: item.item_image,
//   //       description: item.description,
//   //     }));

//   //     setData([...lostData, ...foundData]);
//   //   } catch (error) {
//   //     console.error('Error fetching items:', error);
//   //   }
//   // };



// const fetchItems = async () => {
//   try {
//     const lostDataRaw = await Lost_get();  // ✅ user ka lost data
//     const foundDataRaw = await Found_get();  // ✅ user ka found data

//     const lostData = lostDataRaw.map((item, index) => ({
//       key: `L-${index + 1}`,
//       id: item.id,
//       name: item.name,
//       category: item.category,
//       status: false,
//       type: 'Lost',
//       date: item.date,
//       time: item.time,
//       location: item.location,
//       image: item.item_image,
//       description: item.description,
//     }));

//     const foundData = foundDataRaw.map((item, index) => ({
//       key: `F-${index + 1}`,
//       id: item.id,
//       name: item.name,
//       category: item.category,
//       status: true,
//       type: 'Found',
//       date: item.date,
//       time: item.time,
//       location: item.location,
//       image: item.item_image,
//       description: item.description,
//     }));

//     setData([...lostData, ...foundData]);
//   } catch (error) {
//     console.error('Error fetching items:', error);
//   }
// };




//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // Filters
//   const filteredData = data.filter(
//     (item) =>
//       item.name.toLowerCase().includes(searchText.toLowerCase()) &&
//       item.category.toLowerCase().includes(categoryFilter.toLowerCase())
//   );

//   // View image
//   const handleView = async (record) => {
//     try {
//       let res;
//       if (record.status) {
//         res = await Found_get(record.id);
//       } else {
//         res = await Lost_get(record.id);
//       }
//       setSelectedImage(res.item_image);
//       setIsModalVisible(true);
//     } catch (err) {
//       console.error('Error fetching item:', err);
//     }
//   };

//   // Edit item
//   const handleEdit = (record) => {
//     setEditRecord(record);
//     form.setFieldsValue(record);
//     setIsEditModalVisible(true);
//   };

//   const handleUpdate = async () => {
//     try {
//       const values = await form.validateFields();
//       if (editRecord.status) {
//         await Found_update(editRecord.id, values);
//       } else {
//         await Lost_update(editRecord.id, values);
//       }
//       setIsEditModalVisible(false);
//       fetchItems();
//     } catch (err) {
//       console.error('Error updating item:', err);
//     }
//   };

//   // Delete item
//   const handleDeleteClick = (record) => {
//     setDeleteRecord(record);
//     setIsDeleteModalVisible(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       if (deleteRecord.status) {
//         await Found_delete(deleteRecord.id);
//       } else {
//         await Lost_delete(deleteRecord.id);
//       }
//       setIsDeleteModalVisible(false);
//       fetchItems();
//     } catch (err) {
//       console.error('Error deleting item:', err);
//     }
//   };

//   // Columns
//   const columns = [
//     { title: 'Item Name', dataIndex: 'name', key: 'name' },
//     { title: 'Category', dataIndex: 'category', key: 'category' },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color={status ? 'green' : 'red'}>
//           {status ? 'Found' : 'Lost'}
//         </Tag>
//       ),
//     },
//     { title: 'Date', dataIndex: 'date', key: 'date' },
//     { title: 'Time', dataIndex: 'time', key: 'time' },
//     { title: 'Location', dataIndex: 'location', key: 'location' },
//     {
//       title: 'Image',
//       key: 'image',
//       render: (_, record) => (
//         <EyeOutlined
//           style={{ color: 'green', cursor: 'pointer' }}
//           title="View Image"
//           onClick={() => handleView(record)}
//         />
//       ),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <EditOutlined
//             style={{ color: '#1890ff', cursor: 'pointer' }}
//             title="Edit"
//             onClick={() => handleEdit(record)}
//           />
//           <DeleteOutlined
//             style={{ color: 'red', cursor: 'pointer' }}
//             title="Delete"
//             onClick={() => handleDeleteClick(record)}
//           />
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="lostfound-container">
//       <div className="table-header">
//         <Input
//           placeholder="Search by item name..."
//           prefix={<SearchOutlined />}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="search-input"
//         />

//         <Input
//           placeholder="Filter by category..."
//           prefix={<SearchOutlined />}
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//           className="search-input"
//           style={{ marginLeft: '10px' }}
//         />
//       </div>

//       <div className="table-card">
//         <h3 className="table-title">Submitted Items</h3>
//         <Table
//           columns={columns}
//           dataSource={filteredData}
//           pagination={{ pageSize: 5 }}
//           bordered={false}
//           size="middle"
//         />
//       </div>

//       {/* View Image Modal */}
//       <Modal
//         title="Item Image"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         {selectedImage ? (
//           <img
//             src={`http://127.0.0.1:8000${selectedImage}`}
//             alt="Item"
//             style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
//           />
//         ) : (
//           <p>No image available.</p>
//         )}
//       </Modal>

//       {/* Edit Item Modal */}
//       <Modal
//         title="Edit Item"
//         visible={isEditModalVisible}
//         onCancel={() => setIsEditModalVisible(false)}
//         onOk={handleUpdate}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="name" label="Name" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="location" label="Location" rules={[{ required: true }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Description">
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         title="Delete Item"
//         visible={isDeleteModalVisible}
//         onCancel={() => setIsDeleteModalVisible(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
//             Cancel
//           </Button>,
//           <Button key="delete" type="primary" danger onClick={handleDeleteConfirm}>
//             Delete
//           </Button>,
//         ]}
//       >
//         <p>Do you want to delete this item?</p>
//       </Modal>
//     </div>
//   );
// };

// export default LostFoundTable;










import React, { useEffect, useState } from 'react';
import { Table, Input, Space, Tag, Modal, Form, Button } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { Lost_get, Found_get, Lost_update, Found_update, Lost_delete, Found_delete } from '../../../Api/Service.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Item.css';

const LostFoundTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [form] = Form.useForm();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  // Fetch items
  const fetchItems = async () => {
    try {
      const lostDataRaw = await Lost_get(localStorage.getItem("user_id"));
      const foundDataRaw = await Found_get(localStorage.getItem("user_id"));

      const lostData = lostDataRaw.map((item, index) => ({
        key: `L-${index + 1}`,
        id: item.id,
        name: item.name,
        category: item.category,
        status: false,
        type: 'Lost',
        date: item.date,
        time: item.time,
        location: item.location,
        image: item.item_image,
        description: item.description,
      }));

      const foundData = foundDataRaw.map((item, index) => ({
        key: `F-${index + 1}`,
        id: item.id,
        name: item.name,
        category: item.category,
        status: true,
        type: 'Found',
        date: item.date,
        time: item.time,
        location: item.location,
        image: item.item_image,
        description: item.description,
      }));

      setData([...lostData, ...foundData]);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Error fetching items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Filters
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      item.category.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  // View image
  const handleView = async (record) => {
    try {
      let res;
      if (record.status) {
        res = await Found_get(record.id);
      } else {
        res = await Lost_get(record.id);
      }
      setSelectedImage(res.item_image);
      setIsModalVisible(true);
    } catch (err) {
      console.error('Error fetching item:', err);
      toast.error('Error fetching image');
    }
  };

  // Edit item
  const handleEdit = (record) => {
    setEditRecord(record);
    form.setFieldsValue(record);
    setIsEditModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      if (editRecord.status) {
        await Found_update(editRecord.id, values);
      } else {
        await Lost_update(editRecord.id, values);
      }
      setIsEditModalVisible(false);
      fetchItems();
      toast.success('Item updated successfully!');
    } catch (err) {
      console.error('Error updating item:', err);
      toast.error('Update failed!');
    }
  };

  // Delete item
  const handleDeleteClick = (record) => {
    setDeleteRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteRecord.status) {
        await Found_delete(deleteRecord.id);
      } else {
        await Lost_delete(deleteRecord.id);
      }
      setIsDeleteModalVisible(false);
      fetchItems();
      toast.success('Item deleted successfully!');
    } catch (err) {
      console.error('Error deleting item:', err);
      toast.error('Delete failed!');
    }
  };

  // Columns
  const columns = [
    { title: 'Item Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Found' : 'Lost'}
        </Tag>
      ),
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <EyeOutlined
          style={{ color: 'green', cursor: 'pointer' }}
          title="View Image"
          onClick={() => handleView(record)}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: '#1890ff', cursor: 'pointer' }}
            title="Edit"
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ color: 'red', cursor: 'pointer' }}
            title="Delete"
            onClick={() => handleDeleteClick(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="lostfound-container">
      <div className="table-header">
        <Input
          placeholder="Search by item name..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <Input
          placeholder="Filter by category..."
          prefix={<SearchOutlined />}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="search-input"
          style={{ marginLeft: '10px' }}
        />
      </div>

      <div className="table-card">
        <h3 className="table-title">Submitted Items</h3>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          bordered={false}
          size="middle"
        />
      </div>

      {/* View Image Modal */}
      <Modal
        title="Item Image"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedImage ? (
          <img
            src={`http://127.0.0.1:8000${selectedImage}`}
            alt="Item"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        ) : (
          <p>No image available.</p>
        )}
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        title="Edit Item"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Item"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDeleteConfirm}>
            Delete
          </Button>,
        ]}
      >
        <p>Do you want to delete this item?</p>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LostFoundTable;
