import React, { useState, useRef } from "react";
import { Select, Option } from 'antd';
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
  Space,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Mp_reg_post, otp_varify } from "../../Api/Service";
import "./Registration.css";
// import { Toaster, toast } from 'react-hot-toast';

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const onFinish = async (values) => {
    try {
      const response = await Mp_reg_post(values);
      console.log("Success hai:", response.data.email);
      localStorage.setItem("Ankit data", JSON.stringify(response.data));


      alert("Send Otp in your email");
      setEmail(response.data.email);
      setIsModalOpen(true);

      form.resetFields();

      // ✅ Redirect to login (optional, uncomment if needed)
      // setTimeout(() => {
      //   navigate("/Login");
      // }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/, ""); // allow only digit
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOk = () => {
    console.log("Entered OTP:", otp.join(""));

    const data = { email: email, otp: otp.join("") };
    console.log(data, "data");
    const res = otp_varify(data);
    console.log(res, "res");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="main_rigration">
      <div className="register-container">
        <div className="register-box">
          <Title level={2} style={{ textAlign: "center" }}>
            Registration Form
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

            {/* <Form.Item name="country" label="Country">
              <Input placeholder="Country" />
            </Form.Item> */}

            <Form.Item name="country" label="Country">
              <Select placeholder="Select a country">
                <Select.Option value="india">India</Select.Option>
                <Select.Option value="usa">USA</Select.Option>
                <Select.Option value="uk">UK</Select.Option>
                <Select.Option value="australia">Australia</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^\d{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              ]}
            >
              <Input
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter phone number"
                onKeyPress={(e) => {
                  // Block any non-digit key
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  // Remove any pasted non-digit characters
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
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
              <Button
                type="primary"
                htmlType="submit"
                block
              // onClick={showModal}
              >
                CREATE ACCOUNT
              </Button>

              <Modal
                title="Basic Modal"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Space>
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      maxLength={1}
                      value={digit}
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) => handleChange(e.target.value, index)}
                      style={{
                        width: 48,
                        height: 48,
                        textAlign: "center",
                        fontSize: "20px",
                        borderRadius: 8,
                      }}
                    />
                  ))}
                </Space>
              </Modal>
            </Form.Item>
            {/* <Text style={{ display: "block", textAlign: "center" }}>
              Already have an account?
            </Text> */}
          </Form>
          {/* <button type="button">
            <Login />
          </button> */}

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px" }}>
            <Text style={{ margin: 0 }}>Already have an account?</Text>
            <button type="button" className="registration_but">
              <Login />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

