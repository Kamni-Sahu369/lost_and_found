import React from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const FeedbackForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Feedback Submitted:', values);
    message.success('Thank you for your feedback!');
    form.resetFields();
    // TODO: Send data to backend via fetch/axios
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <Card title="Send Us Your Suggestions or Report an Issue" bordered>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          


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
              Submit Feedback
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FeedbackForm;
