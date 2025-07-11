// import React from 'react';
// import { Form, Input, Button, Select, message, Card } from 'antd';

// const { TextArea } = Input;
// const { Option } = Select;

// const FeedbackForm = () => {
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     console.log('Feedback Submitted:', values);
//     message.success('Thank you for your feedback!');
//     form.resetFields();
//     // TODO: Send data to backend via fetch/axios
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: '40px auto' }}>
//       <Card title="View Suggestions" bordered>
//         <Form
//           layout="vertical"
//           form={form}
//           onFinish={onFinish}
//         >
          


//           <Form.Item
//             name="type"
//             label="Type of Message"
//             rules={[{ required: true, message: 'Please select a type' }]}
//           >
//             <Select placeholder="Select type">
//               <Option value="suggestion">Suggestion</Option>
//               <Option value="bug">Bug Report</Option>
//               <Option value="question">Question</Option>
//               <Option value="other">Other</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             name="subject"
//             label="Subject"
//             rules={[{ required: true, message: 'Please enter a subject' }]}
//           >
//             <Input placeholder="Short subject of your message" />
//           </Form.Item>

//           <Form.Item
//             name="message"
//             label="Message"
//             rules={[{ required: true, message: 'Please enter your message' }]}
//           >
//             <TextArea rows={4} placeholder="Write your suggestion or issue here..." />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               Submit Feedback
//             </Button>
//           </Form.Item>
//         </Form>
//       </Card>
//     </div>
//   );
// };

// export default FeedbackForm;















// components/SuggestionManager.jsx
import React, { useEffect, useState } from 'react';
import '../Notification/Suggestion/Suggestion.css'
import {
  Card,
  Table,
  Button,
  Modal,
  Input,
  Form,
  Select,
  message,
} from 'antd';
import {
  getSuggestions,
  postSuggestion,
  deleteSuggestion,
} from '../../../Api/Service';
import { DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const SuggestionManager = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem("user_id");

const fetchSuggestions = async () => {
  try {
    const response = await getSuggestions(userId);
    const formatted = response.map((item) => ({
      ...item,
      key: item.id,
    }));
    setSuggestions(formatted);
    setFilteredSuggestions(formatted); // ✅ Add this line
  } catch (error) {
    console.error("Error loading feedback:", error);
  }
};

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = suggestions.filter((item) =>
      item.type.toLowerCase().includes(value.toLowerCase()) ||
      item.subject.toLowerCase().includes(value.toLowerCase()) ||
      item.message.toLowerCase().includes(value.toLowerCase()) ||
      (role === 'admin' && item.user?.name?.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredSuggestions(filtered);
  };

  const handleSubmit = async (values) => {
    try {
      
      await postSuggestion(values);
      message.success('Suggestion submitted!');
      form.resetFields();
      setModalOpen(false);
      fetchSuggestions();
    } catch (err) {
      message.error('Submission failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSuggestion(id);
      message.success('Deleted');
      fetchSuggestions();
    } catch {
      message.error('Delete failed');
    }
  };

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Subject', dataIndex: 'subject',key: 'subject' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  if (role === 'admin') {
    columns.push({
      title: 'User',
      render: (record) => record.user?.name || 'N/A',
    });
  }

  columns.push({
    title: 'Action',
    render: (record) => (
      <Button
        type="link"
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleDelete(record.id)}
      />
    ),
  });

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
        <Input
          placeholder="Search by type, subject, message..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
        {role !== 'admin' && (
          <Button type="primary" onClick={() => setModalOpen(true)}>
            New Suggestion
          </Button>
        )}
      </div>

      <Card
        title={<span className="card-title"> Submitted Suggestions</span>}
        bordered={false}
        className="suggestion-card"
      >
        <Table
        className="custom-suggestion-table"
          dataSource={filteredSuggestions}
          columns={columns}
          locale={{ emptyText: 'No suggestions found' }}
          // className="suggestion-table"
          pagination={{ pageSize: 5 }}
           rowClassName={(_, index) =>
      index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
    }bordered
        />
      </Card>
      <Modal
        title="Submit a Suggestion"
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type">
              <Option value="suggestion">Suggestion</Option>
              <Option value="bug">Bug Report</Option>
              <Option value="question">Question</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SuggestionManager;
