import React ,{useState} from "react";
import Login from "../Login/Login";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  notification,
  Modal,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Mp_reg_post } from "../../Api/Service";
import "./Registration.css";
// import { Toaster, toast } from 'react-hot-toast';

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await Mp_reg_post(values);
      console.log("Success:", response);

      // ✅ Notification on success
      alert("successfully Registration");

      // ✅ Reset form after submission
      form.resetFields();

      // ✅ Redirect to login (optional, uncomment if needed)
      // setTimeout(() => {
      //   navigate("/Login");
      // }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);
      message.error("Registration failed. Please try again.");
    }
  };

  // const Modelopen = () => {
  //   return <Login />;
  //   // alert("xbhd")
  // };


  const Modelopen = () => {
  setIsModalOpen(true);
};

const handleCancel = () => {
  setIsModalOpen(false);
};

  return (
    <div className="main_rigration">
      <div className="register-container">
        <div className="register-box">
          <Title level={2} style={{ textAlign: "center" }}>
            • Registration Form •
          </Title>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email" },
              ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>

            <Form.Item name="country" label="Country">
              <Input placeholder="Country" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="Phone" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => {
                    return value
                      ? Promise.resolve()
                      : Promise.reject(new Error("You must agree to continue"));
                  },
                },
              ]}
            >
              <Checkbox>I agree to the terms and conditions.</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                CREATE ACCOUNT
              </Button>
            </Form.Item>
            <Text style={{ display: "block", textAlign: "center" }}>
              Already have an account?
            </Text>
          </Form>
           <button type="button"><Login/></button>
        </div>
      </div>
  
    </div>
  );
};

export default Register;
