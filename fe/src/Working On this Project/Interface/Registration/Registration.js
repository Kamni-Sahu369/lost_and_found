// import React, { useState, useRef } from "react";
// import Login from "../Login/Login";
// import {
//   Form,
//   Input,
//   Button,
//   Checkbox,
//   Typography,
//   message,
//   notification,
//   Modal,
//   Space,
// } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import { Link, useNavigate } from "react-router-dom";
// import { Mp_reg_post } from "../../Api/Service";
// import "./Registration.css";
// // import { Toaster, toast } from 'react-hot-toast';

// const { Title, Text } = Typography;

// const Register = () => {
//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     try {
//       const response = await Mp_reg_post(values);
//       console.log("Success:", response);

//       // ✅ Notification on success
//       alert("successfully Registration");

//       // ✅ Reset form after submission
//       form.resetFields();

//       // ✅ Redirect to login (optional, uncomment if needed)
//       // setTimeout(() => {
//       //   navigate("/Login");
//       // }, 1500);
//     } catch (error) {
//       console.error("Registration failed:", error);
//       message.error("Registration failed. Please try again.");
//     }
//   };

//   const [isModalOpen, setIsModalOpen] = useState(true);
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const inputsRef = useRef([]);

//   const handleChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value.replace(/\D/, ""); // allow only digit
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputsRef.current[index + 1]?.focus();
//     }
//   };

//   const handleOk = () => {
//     console.log("Entered OTP:", otp.join(""));
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="main_rigration">
//       <div className="register-container">
//         <div className="register-box">
//           <Title level={2} style={{ textAlign: "center" }}>
//             • Registration Form •
//           </Title>
//           <Form form={form} layout="vertical" onFinish={onFinish}>
//             <Form.Item
//               name="name"
//               label="Name"
//               rules={[{ required: true, message: "Please enter your name" }]}
//             >
//               <Input placeholder="Name" />
//             </Form.Item>

//             <Form.Item
//               name="email"
//               label="Email Address"
//               rules={[
//                 { required: true, message: "Please enter your email" },
//                 { type: "email", message: "Enter a valid email" },
//               ]}
//             >
//               <Input placeholder="Email address" />
//             </Form.Item>

//             <Form.Item name="country" label="Country">
//               <Input placeholder="Country" />
//             </Form.Item>

//             <Form.Item
//               name="phone"
//               label="Phone"
//               rules={[
//                 { required: true, message: "Please enter your phone number" },
//               ]}
//             >
//               <Input placeholder="Phone" />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 { required: true, message: "Please enter your password" },
//               ]}
//             >
//               <Input.Password
//                 placeholder="Password"
//                 iconRender={(visible) =>
//                   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                 }
//               />
//             </Form.Item>

//             <Form.Item
//               name="agreement"
//               valuePropName="checked"
//               rules={[
//                 {
//                   validator: (_, value) => {
//                     return value
//                       ? Promise.resolve()
//                       : Promise.reject(new Error("You must agree to continue"));
//                   },
//                 },
//               ]}
//             >
//               <Checkbox>I agree to the terms and conditions.</Checkbox>
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 block
//                 onClick={showModal}
//               >
//                 CREATE ACCOUNT
//               </Button>

//               <Modal
//                 title="Basic Modal"
//                 closable={{ "aria-label": "Custom Close Button" }}
//                 open={isModalOpen}
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//               >
//                 <Space>
//                   {otp.map((digit, index) => (
//                     <Input
//                       key={index}
//                       maxLength={1}
//                       value={digit}
//                       ref={(el) => (inputsRef.current[index] = el)}
//                       onChange={(e) => handleChange(e.target.value, index)}
//                       style={{
//                         width: 48,
//                         height: 48,
//                         textAlign: "center",
//                         fontSize: "20px",
//                         borderRadius: 8,
//                       }}
//                     />
//                   ))}
//                 </Space>
//               </Modal>
//             </Form.Item>
//             <Text style={{ display: "block", textAlign: "center" }}>
//               Already have an account?
//             </Text>
//           </Form>
//           <button type="button">
//             <Login />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;




import React, { useState, useRef } from "react";
import Login from "../Login/Login";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
  Modal,
  Space,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Mp_reg_post } from "../../Api/Service";
import "./Registration.css";

const { Title, Text } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  // Store form values temporarily until OTP is confirmed
  const [formValues, setFormValues] = useState(null);

  // Show OTP modal after form validation
  const onFinish = (values) => {
    setFormValues(values);
    setIsModalOpen(true);
  };

  // Handle OTP inputs change
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return; // only digits allowed
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // When OTP modal OK clicked - verify OTP and submit form
  const handleOk = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      message.error("Please enter a 6-digit OTP.");
      return;
    }

    try {
      // You can add OTP verification here if needed before sending registration

      // Call registration API with form data + OTP if needed
      const response = await Mp_reg_post({
        ...formValues,
        otp: enteredOtp,
      });
      console.log("Success:", response);
      message.success("Successfully Registered!");

      form.resetFields();
      setOtp(["", "", "", "", "", ""]);
      setIsModalOpen(false);

      // Navigate to login page after registration
      navigate("/Login");
    } catch (error) {
      console.error("Registration failed:", error);
      message.error("Registration failed. Please try again.");
    }
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
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("You must agree to continue")),
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
            <Button
              type="link"
              onClick={() => {
                navigate("/Login");
              }}
              style={{ display: "block", margin: "10px auto", textAlign: "center" }}
            >
              Login Here
            </Button>
          </Form>

          <Modal
            title={<span style={{color:"blue"}}>Enter OTP</span>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Verify"
            footer={null}
            closable={false}
            
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
        </div>
      </div>
    </div>
  );
};

export default Register;
