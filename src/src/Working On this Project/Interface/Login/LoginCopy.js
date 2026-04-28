// import React, { useEffect, useState } from 'react';
// import { Input, Button, Form, Modal, message } from "antd";
// import { useLocation, useNavigate } from 'react-router-dom';
// import './Login.css';

// function Login() {
//   const [openLogin, setOpenLogin] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (location.pathname === "/login") {
//       setOpenLogin(true);
//     }
//   }, [location]);

//   const handleLogin = async (values) => {
//     try {
//       const response = await fetch("https://lost-and-found-co21.onrender.com/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: values.email,
//           password: values.password
//         })
//       });

//       if (!response.ok) {
//         alert("Invalid username or password");
//         return;
//       }

//       const data = await response.json();
//       localStorage.setItem("user_id", data.id);
//       localStorage.setItem("access_token", data.access_token);
//       localStorage.setItem("refresh_token", data.refresh_token);
//       localStorage.setItem("loggedIn", true);
//       localStorage.setItem("role", data.role);

//       message.success("Login successful!");
//       setOpenLogin(false);
//       navigate("/view");
//     } catch (error) {
//       console.error("Login failed:", error);
//       message.error("Something went wrong");
//     }
//   };

//   const onRegister = () => {
//     navigate("/register");
//     setOpenLogin(false)
//   }
//   return (
//     <div>
//       <Button onClick={() => setOpenLogin(true)} className="login-btn">
//         Login
//       </Button>

//       <Modal
//         title={<div className="login-title">Login Page</div>}
//         open={openLogin}
//         onCancel={() => setOpenLogin(false)}
//         footer={null}
//         width={600}
//       >
//         <Form
//           form={form}
//           onFinish={handleLogin}
//           className="login-form"
//           layout="vertical"
//         >
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: 'Please enter your email' }]}
//           >
//             <Input placeholder="Enter your email" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: 'Please enter your password' }]}
//           >
//             <Input.Password placeholder="Enter your password" />
//           </Form.Item>

//           <div className="login-links-top">
//             <span onClick={() => navigate('/forgot-password')} className="forgot-password">
//               Forgot Password?
//             </span>
//           </div>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="submit-btn">
//               Submit
//             </Button>
//           </Form.Item>

//           <div className="login-links-bottom">
//             <span className="register-link" onClick={onRegister}>
//               Don't have an account? <b>Register</b>
//             </span>
//           </div>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default Login;

import React, { useEffect, useState } from "react";
import { Input, Button, Form, Modal, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [openLogin, setOpenLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (location.pathname === "/login") {
      setOpenLogin(true);
    }
  }, [location]);

  const handleLogin = async (values) => {
    try {
      const response = await fetch("https://lost-and-found-co21.onrender.com/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        alert("Invalid username or password");
        return;
      }
      const data = await response.json();
      localStorage.setItem("user_id", data.id);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      // localStorage.setItem("loggedIn", true);
      localStorage.setItem("role", data.role);
      alert("Login successful!");
      setOpenLogin(false);

      // Redirect back to item view if needed
      if (location.state?.next && location.state?.item) {
        navigate(location.state.next, {
          state: { item: location.state.item, openModal: true },
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <div style={{margin:"15%",width:"500px"}}>
      {/* <Button onClick={() => setOpenLogin(true)} className="login-btn">
        Login
      </Button> */}

      {/* <Modal
        title="Login Page"
        open={openLogin}
        onCancel={() => setOpenLogin(false)}
        footer={null}
        width={600}
      > */}
        <Form form={form} onFinish={handleLogin} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      {/* </Modal> */}
    </div>
  );
}

export default Login;
