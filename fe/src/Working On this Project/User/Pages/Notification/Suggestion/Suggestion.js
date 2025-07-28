
// import React, { useState } from 'react';
// import './Suggestion.css';
// import {postSuggestion} from '../../../../Api/Service'
// import { DeleteOutlined } from '@ant-design/icons';
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   message,
//   Card,
//   Table,
//   Modal,
// } from 'antd';

// const { TextArea } = Input;
// const { Option } = Select;

// const FeedbackForm = () => {
//   const [form] = Form.useForm();
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [searchText, setSearchText] = useState('');
//    const role = localStorage.getItem("role"); // 'user' or 'admin'
//   const userId = localStorage.getItem("user_id");

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     form.resetFields();
//   };

// const onFinish = async (values) => {
//   try {
//     const payload = {
//         ...values,
//         user: userId,
//       };

//     const response = await postSuggestion(payload); 
//     const newFeedback = {
//       key: response.id || Date.now(), 
//       type: response.type,
//       subject: response.subject,
//       message: response.message,
//     };


//     const updatedList = [newFeedback, ...feedbackList];
//     setFeedbackList(updatedList);

//     localStorage.setItem('feedbackList', JSON.stringify(updatedList));

//     message.success('Thank you for your feedback!');
//     form.resetFields();
//     setIsModalVisible(false);
//   } catch (error) {
//     console.error('Error submitting suggestion:', error);
//     message.error('Failed to submit feedback. Please try again.');
//   }
// };



//   const handleDelete = (key) => {
//     const updatedList = feedbackList.filter((item) => item.key !== key);
//     setFeedbackList(updatedList);
//     message.info('Feedback deleted.');
//   };

//   const filteredFeedback = feedbackList.filter(
//     (item) =>
//       item.type.toLowerCase().includes(searchText.toLowerCase()) ||
//       item.subject.toLowerCase().includes(searchText.toLowerCase()) ||
//       item.message.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const columns = [
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//     },
//     {
//       title: 'Subject',
//       dataIndex: 'subject',
//       key: 'subject',
//     },
//     {
//       title: 'Message',
//       dataIndex: 'message',
//       key: 'message',
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <DeleteOutlined
//           style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
//           onClick={() => handleDelete(record.key)}
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="feedback-container">
//       <div className="feedback-header">
//         <Input
//           placeholder="Search feedback..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           className="feedback-search"
//         />
//         <Button type="primary" onClick={showModal}>
//           Give suggestion
//         </Button>
//       </div>

//       <Modal
//         className="Suggestions_Modal"
//         title="Send Us Your Suggestions or Report an Issue"
//         open={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//         destroyOnClose
//       >
//         <Form layout="vertical" form={form} onFinish={onFinish}>
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
//               Submit suggestion
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Card
//         className="suggestion_table"
//         title="Submitted Suggestions"
//         style={{ width: '100%' }}
//       >
//         <Table
//           dataSource={filteredFeedback}
//           columns={columns}
//           pagination={{ pageSize: 5 }}
//           locale={{ emptyText: 'No feedback submitted yet.' }}
//           scroll={{ x: true }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default FeedbackForm;












import React, { useEffect, useState } from 'react';
import './Suggestion.css';
import {
  getSuggestions,
  postSuggestion,
} from '../../../../Api/Service';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Card,
  Table,
  Modal,
} from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const FeedbackForm = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const role = localStorage.getItem('role'); // e.g., 'admin' or 'user'
  const userId = localStorage.getItem('user_id');

  // 🔁 Fetch suggestions from backend on load
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getSuggestions(); // GET request
        const formatted = data.map((item) => ({
          key: item.id,
          type: item.type,
          subject: item.subject,
          message: item.message,
        }));
        setFeedbackList(formatted);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    };

    fetchFeedback();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        user: userId,
      };

      const response = await postSuggestion(payload);

      const newFeedback = {
        key: response.id || Date.now(),
        type: response.type,
        subject: response.subject,
        message: response.message,
      };

      const updatedList = [newFeedback, ...feedbackList];
      setFeedbackList(updatedList);

      message.success('Thank you for your feedback!');
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      message.error('Failed to submit feedback. Please try again.');
    }
  };

  const handleDelete = (key) => {
    const updatedList = feedbackList.filter((item) => item.key !== key);
    setFeedbackList(updatedList);
    message.info('Feedback deleted.');
  };

  const filteredFeedback = feedbackList.filter(
    (item) =>
      item.type.toLowerCase().includes(searchText.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchText.toLowerCase()) ||
      item.message.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Message', dataIndex: 'message', key: 'message' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <DeleteOutlined
          style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <Input
          placeholder="Search feedback..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="feedback-search"
        />
        <Button type="primary" onClick={showModal}>
          Give suggestion
        </Button>
      </div>

      <Modal
        className="Suggestions_Modal"
        title="Send Us Your Suggestions or Report an Issue"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="type"
            label="Type of Message"
            rules={[{ required: true, message: 'Please select a type' }]}
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
            rules={[{ required: true, message: 'Please enter a subject' }]}
          >
            <Input placeholder="Short subject of your message" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <TextArea rows={4} placeholder="Write your suggestion or issue here..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit suggestion
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Card
  className="suggestion_table"
  title="Submitted Suggestions"
  style={{
    width: '100%',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  }}
>
  <Table
    className="custom-suggestion-table"
    dataSource={filteredFeedback}
    columns={columns}
    pagination={{ pageSize: 5 }}
    locale={{ emptyText: 'No feedback submitted yet.' }}
    scroll={{ x: true }}
    rowClassName={(_, index) =>
      index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
    }
    bordered
  />
</Card>
    </div>
  );
};

export default FeedbackForm;



