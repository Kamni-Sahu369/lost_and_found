
// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Row,
//   Col,
//   Upload,
//   message,
//   Select,
//   DatePicker,
//   TimePicker,
// } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { Lost_post } from "../../../Api/Service";
// import "./Lostitem.css"; // 👈 Import external CSS
// import { toast } from 'react-toastify';

// const { Option } = Select;

// const LostForm = () => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);

//   const onFinish = async (values) => {
//     if (fileList.length === 0) {
//       message.error("Please upload an image");
//       return;
//     }

//     values.item_image = fileList[0].originFileObj;

//     try {
//       const response = await Lost_post(values);
//       console.log("Success:", response);
//       toast.success("Lost item posted successfully!");
//       form.resetFields();
//       setFileList([]);
//     } catch (error) {
//       console.error("Post failed:", error);
//       message.error("Post failed. Please try again.");
//     }
//   };

//   const handleChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   const beforeUpload = (file) => {
//     const isImage = file.type.startsWith("image/");
//     if (!isImage) {
//       message.error("Only image files are allowed!");
//     }
//     return isImage || Upload.LIST_IGNORE;
//   };

//   return (
//     <div className="lost-form-container">
//       <h2>Post Lost Item</h2>
//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
//               <Input placeholder="Enter item name" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="category"
//               label="Category"
//               rules={[{ required: true, message: "Please select a category" }]}
//             >
//               <Select placeholder="Select a category">
//                 <Option value="personal_belongings">Personal Belongings</Option>
//                 <Option value="bags_accessories">Bags and Accessories</Option>
//                 <Option value="documents">Documents</Option>
//                 <Option value="electronics">Electronics</Option>
//                 <Option value="clothing_wearables">Clothing and Wearables</Option>
//                 <Option value="kids_items">Kids' Items</Option>
//                 <Option value="pets">Pets</Option>
//                 <Option value="vehicles_related">Vehicles and Related Items</Option>
//                 <Option value="office_study">Office and Study Items</Option>
//                 <Option value="religious_items">Religious Items</Option>
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item name="date" label="Lost Date" rules={[{ required: true }]}>
//               <DatePicker style={{ width: "100%" }} />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item name="time" label="Lost Time" rules={[{ required: true }]}>
//               <TimePicker style={{ width: "100%" }} />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item name="location" label="Location" rules={[{ required: true }]}>
//               <Input placeholder="Where did you lose it?" />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item name="description" label="Description">
//               <Input.TextArea rows={3} placeholder="Brief description" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item label="Upload Image" required>
//               <Upload
//                 listType="picture-card"
//                 fileList={fileList}
//                 onChange={handleChange}
//                 beforeUpload={beforeUpload}
//                 maxCount={1}
//               >
//                 {fileList.length >= 1 ? null : (
//                   <div className="lost-form-upload-icon">
//                     <PlusOutlined />
//                     <div style={{ marginTop: 8 }}>Upload</div>
//                   </div>
//                 )}
//               </Upload>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default LostForm;









import React, { useState, useEffect } from "react";
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
import { Lost_post } from "../../../Api/Service";
import { getCategories } from "../../../Api/Service";
import "./Lostitem.css"; // 👈 Import external CSS

const { Option } = Select;

const LostForm = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("Please upload an image");
      return;
    }

    values.item_image = fileList[0].originFileObj;

    try {
      const response = await Lost_post(values);
      console.log("Success:", response);
      message.success("Lost item posted successfully!");
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fatchCategories();
  }, []);
  const fatchCategories = async () => {
    const response = await getCategories();
    console.log("Fetched categories:", response.data);
    setCategories(response.data);
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
      <h2>Post Lost Item</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Item Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter item name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select a category">
                {categories.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="date"
              label="Lost Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="time"
              label="Lost Time"
              rules={[{ required: true }]}
            >
              <TimePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true }]}
            >
              <Input placeholder="Where did you lose it?" />
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
                    <div style={{ marginTop: 10 }}>Upload</div>
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

export default LostForm;
