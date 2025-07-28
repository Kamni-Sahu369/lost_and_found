// // src/pages/CategoryManager.jsx

// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   Table,
//   Button,
//   Modal,
//   Input,
//   Form,
//   message,
//   Space,
// } from 'antd';
// import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import {
//   getCategories,
//   postCategory,
//   deleteCategory,
// } from '../../../Api/Service'; // Make sure these are correct paths

// const CategoryManager = () => {
//   const [form] = Form.useForm();
//   const [categories, setCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [searchText, setSearchText] = useState('');

//   const fetchCategories = async () => {
//     try {
//       const res = await getCategories();
//       const formatted = res.data.map((cat) => ({ ...cat, key: cat.id }));
//       setCategories(formatted);
//       setFilteredCategories(formatted);
//       localStorage.setItem('categories', JSON.stringify(formatted)); // ✅ Save to localStorage
//     } catch (err) {
//       message.error('Failed to load categories');
//     }
//   };

//   useEffect(() => {
//     // ✅ Load from localStorage for instant display
//     const cached = localStorage.getItem('categories');
//     if (cached) {
//       const parsed = JSON.parse(cached);
//       setCategories(parsed);
//       setFilteredCategories(parsed);
//     }

//     fetchCategories(); // Fetch from DB and sync
//   }, []);

//   useEffect(() => {
//     const filtered = categories.filter(
//       (cat) =>
//         cat.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         cat.description.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredCategories(filtered);
//   }, [searchText, categories]);

//   const handleAddCategory = async (values) => {
//     try {
//       await postCategory(values);
//       message.success('Category added');
//       setIsModalVisible(false);
//       form.resetFields();
//       fetchCategories(); // will update DB + localStorage
//     } catch (err) {
//       message.error('Error adding category');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteCategory(id);
//       message.success('Category deleted');
//       fetchCategories(); // sync DB + localStorage
//     } catch (err) {
//       message.error('Error deleting category');
//     }
//   };

//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//     },
//     {
//       title: 'Action',
//       render: (_, record) => (
//         <DeleteOutlined
//           style={{ color: 'red', cursor: 'pointer' }}
//           onClick={() => handleDelete(record.id)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <Card>
//         <Space
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             marginBottom: 16,
//             flexWrap: 'wrap',
//             gap: 10,
//           }}
//         >
//           <Input
//             placeholder="Search category..."
//             style={{ width: 250 }}
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <Button
//             type="primary"
//             icon={<PlusOutlined />}
//             onClick={() => setIsModalVisible(true)}
//           >
//             Add Category
//           </Button>
//         </Space>

//         <Table
//           columns={columns}
//           dataSource={filteredCategories}
//           pagination={{ pageSize: 5 }}
//         />
//       </Card>

//       <Modal
//         title="Add Category"
//         open={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={null}
//       >
//         <Form layout="vertical" form={form} onFinish={handleAddCategory}>
//           <Form.Item
//             name="name"
//             label="Category Name"
//             rules={[{ required: true, message: 'Please enter category name' }]}
//           >
//             <Input placeholder="Enter name" />
//           </Form.Item>
//           <Form.Item name="description" label="Description">
//             <Input.TextArea placeholder="Enter description" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Save
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default CategoryManager;






// src/pages/CategoryManager.jsx

import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Input,
  Form,
  message,
  Space,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  getCategories,
  postCategory,
  deleteCategory,
} from '../../../Api/Service'; // Make sure these are correct paths

const CategoryManager = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      const formatted = res.data.map((cat) => ({ ...cat, key: cat.id }));
      setCategories(formatted);
      setFilteredCategories(formatted);
      localStorage.setItem('categories', JSON.stringify(formatted)); // ✅ Save to localStorage
    } catch (err) {
      message.error('Failed to load categories');
    }
  };

  useEffect(() => {
    // ✅ Load from localStorage for instant display
    const cached = localStorage.getItem('categories');
    if (cached) {
      const parsed = JSON.parse(cached);
      setCategories(parsed);
      setFilteredCategories(parsed);
    }

    fetchCategories(); // Fetch from DB and sync
  }, []);

  useEffect(() => {
    const filtered = categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchText.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchText, categories]);

  const handleAddCategory = async (values) => {
    try {
      await postCategory(values);
      message.success('Category added');
      setIsModalVisible(false);
      form.resetFields();
      fetchCategories(); // will update DB + localStorage
    } catch (err) {
      message.error('Error adding category');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      message.success('Category deleted');
      fetchCategories(); // sync DB + localStorage
    } catch (err) {
      message.error('Error deleting category');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <DeleteOutlined
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <Input
            placeholder="Search category..."
            style={{ width: 250 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Add Category
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredCategories}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title="Add Category"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleAddCategory}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManager;
