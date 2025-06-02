// import React from 'react';
// import { Form, Input, Button, Row, Col } from 'antd';

// const FoundItemForm = () => {
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     console.log('Form values:', values);
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: '0 auto', padding: 24, background: '#fff', borderRadius: 8 }}>
//       <h2>Found Item Post</h2>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//       >
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item name="itemName" label="Item Name" rules={[{ required: true, message: 'Please enter item name' }]}>
//               <Input placeholder="Enter item name" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item name="itemCategory" label="Category" rules={[{ required: true, message: 'Please enter category' }]}>
//               <Input placeholder="Enter category" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item name="foundDate" label="Found Date" rules={[{ required: true, message: 'Please enter found date' }]}>
//               <Input placeholder="Enter found date" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item name="foundLocation" label="Found Location" rules={[{ required: true, message: 'Please enter location' }]}>
//               <Input placeholder="Enter found location" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item name="description" label="Description">
//               <Input.TextArea rows={3} placeholder="Enter brief description of the item" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item name="finderName" label="Your Name" rules={[{ required: true, message: 'Please enter your name' }]}>
//               <Input placeholder="Enter your name" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit Found Item
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default FoundItemForm;




import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  message,
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Found_post } from "../../../Api/Service"; // Change API call to found_post
import "./Lostitem.css"; // Same CSS can be used

const { Option } = Select;

const FoundForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload an image");
      return;
    }

    values.item_image = fileList[0].originFileObj;

    try {
      const response = await Found_post(values); // Changed API function
      console.log("Success:", response);
      alert("Found item posted successfully!");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Post failed:", error);
      message.error("Post failed. Please try again.");
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Only image files are allowed!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  return (
    <div className="lost-form-container">
      <h2>Post Found Item</h2> {/* Changed heading */}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
              <Input placeholder="Enter item name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select a category">
                <Option value="personal_belongings">Personal Belongings</Option>
                <Option value="bags_accessories">Bags and Accessories</Option>
                <Option value="documents">Documents</Option>
                <Option value="electronics">Electronics</Option>
                <Option value="clothing_wearables">Clothing and Wearables</Option>
                <Option value="kids_items">Kids' Items</Option>
                <Option value="pets">Pets</Option>
                <Option value="vehicles_related">Vehicles and Related Items</Option>
                <Option value="office_study">Office and Study Items</Option>
                <Option value="religious_items">Religious Items</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="date" label="Found Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="time" label="Found Time" rules={[{ required: true }]}>
              <TimePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="location" label="Location" rules={[{ required: true }]}>
              <Input placeholder="Where did you find it?" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} placeholder="Brief description" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Upload Image" required>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : (
                  <div className="lost-form-upload-icon">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FoundForm;
