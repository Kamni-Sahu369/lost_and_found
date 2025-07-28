
import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Rate,
  Button,
  Modal,
  Table,
  message,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './Feedback.css';
import { Feedback_post, Feedback_get,Feedback_delete } from '../../../../Api/Service';

const { TextArea } = Input;

const FeedbackManager = () => {
  const [form] = Form.useForm();
  const [feedbackList, setFeedbackList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const role = localStorage.getItem("role"); // 'user' or 'admin'
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Feedback_get(userId); // backend handles filtering if needed
        const formatted = response.map((item) => ({
          ...item,
          key: item.id,
        }));
        setFeedbackList(formatted);
      } catch (error) {
        console.error("Error loading feedback:", error);
      }
    };
    fetchData();
  }, [userId]);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        user: userId,
      };
      const response = await Feedback_post(payload);
      setFeedbackList(prev => [
        { ...response, key: response.id },
        ...prev,
      ]);
      form.resetFields();
      setIsModalOpen(false);
      message.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      message.error("Failed to submit feedback");
    }
  };

  const filteredData = feedbackList.filter(
    (item) =>
      item.feedback.toLowerCase().includes(searchText.toLowerCase()) ||
      String(item.rating).includes(searchText)
  );

  const columns = [
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rate) => <Rate disabled value={rate} />,
    },
    {
      title: 'Submitted At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  if (role === "admin") {
    columns.splice(2, 0, {
      title: 'Submitted By',
      key: 'submittedBy',
      render: (record) => record.user?.name || 'N/A',
    });

    columns.push({
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            setSelectedFeedbackId(record.id);
            setIsDeleteModalOpen(true);
          }}
        />
      ),
    });
  }

  const confirmDelete = async () => {
    try {
      await Feedback_delete(selectedFeedbackId);
      setFeedbackList(prev => prev.filter(item => item.id !== selectedFeedbackId));
      message.success("Feedback deleted successfully!");
    } catch (error) {
      console.error("Failed to delete feedback:", error);
      message.error("Failed to delete feedback");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedFeedbackId(null);
    }
  };

  return (
    <div className="feedback-manager-container">
      <div className="feedback-manager-header">
        <Input
          placeholder="Search feedback..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="feedback-search"
        />
        {role !== "admin" && (
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Give Feedback
          </Button>
        )}
      </div>

      <Card title="All Feedback" className="feedback-table-card">
        <Table
         className="custom-feedback-table"
          dataSource={filteredData}
          columns={columns}
          rowKey="key"
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
          rowClassName={(_, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }  bordered
        />
      </Card>

      <Modal
        title="Share Your Feedback"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="feedback"
            label="Your Feedback"
            rules={[{ required: true, message: 'Please enter your feedback' }]}
          >
            <TextArea rows={4} placeholder="Write your thoughts here..." />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rate Us"
            rules={[{ required: true, message: 'Please rate us' }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalOpen}
        onOk={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this feedback?</p>
      </Modal>

    </div>
  );
};

export default FeedbackManager;
