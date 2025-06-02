import React from 'react';
import { Card, Form, Input, Rate, Button, message } from 'antd';

const { TextArea } = Input;

const FeedbackCard = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Feedback Submitted:', values);
    message.success('Thank you for your feedback!');
    form.resetFields();
    // TODO: API call here to send feedback to backend
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto' }}>
      <Card title="Share Your Feedback" bordered>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
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
      </Card>
    </div>
  );
};

export default FeedbackCard;
