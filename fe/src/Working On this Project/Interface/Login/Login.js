// import React, { useEffect, useState } from 'react';
// import { Input, Button, Form, Modal, message } from "antd";
// import { useLocation, useNavigate } from 'react-router-dom';

// function Login() {
//   const [openLogin, setOpenLogin] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate(); // fix: call useNavigate outside useEffect

//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (location.pathname === "/login") {
//       setOpenLogin(true);
//     }
//   }, [location]);

//   const handleLogin = async (values) => {
//     try {
//       const response = await fetch("http://localhost:8000/login/", {
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
//       localStorage.setItem("loggedIn",true);
//       localStorage.setItem("role", data.role);
//       const role = localStorage.getItem("role")
//       message.success("Login successful!");

//       // redirect or close modal
//       setOpenLogin(false);
//       if (data.role === "admin"){
//       navigate("/");
//       }
//       else {
//         navigate("/");
//       } // replace with your target route
//     } catch (error) {
//       console.error("Login failed:", error);
//       message.error("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <Button
//         // type="link"
//         // style={{ border: "1px solid white", }}
//         onClick={() => setOpenLogin(true)}
//       // className="Mp_home_beside_btn_second"
//       >
//         Login
//       </Button>

//       <Modal
//         title={
//           <span style={{ color: "darkblue", fontWeight: '700', fontSize: "25px", marginLeft: "35%" }}>
//             Login Page
//           </span>
//         }
//         open={openLogin}
//         onCancel={() => setOpenLogin(false)}
//         footer={null}
//         width={600}
//       >
//         <Form
//           form={form}
//           onFinish={handleLogin}
//           style={{ maxWidth: 500, margin: "5%" }}
//           labelCol={{ span: 4 }}
//         >
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: 'Please enter email/username' }]}
//           >
//             <Input placeholder="Your email" style={{ width: 300 }} />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: 'Please enter password' }]}
//           >
//             <Input.Password placeholder="Special character" style={{ width: 300 }} />
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               style={{ backgroundColor: "green", color: "white", marginLeft: "25%" }}
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// }

// export default Login;



import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Modal, message } from "antd";
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';

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
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });

      if (!response.ok) {
        alert("Invalid username or password");
        return;
      }

      const data = await response.json();
      localStorage.setItem("user_id", data.id);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("role", data.role);

      message.success("Login successful!");
      setOpenLogin(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Something went wrong");
    }
  };

  const onRegister = () => {
    navigate("/register");
    setOpenLogin(false)
  }
  return (
    <div>
      <Button onClick={() => setOpenLogin(true)} className="login-btn">
        Login
      </Button>

      <Modal
        title={<div className="login-title">Login Page</div>}
        open={openLogin}
        onCancel={() => setOpenLogin(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          onFinish={handleLogin}
          className="login-form"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <div className="login-links-top">
            <span onClick={() => navigate('/forgot-password')} className="forgot-password">
              Forgot Password?
            </span>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-btn">
              Submit
            </Button>
          </Form.Item>

          <div className="login-links-bottom">
            <span className="register-link" onClick={onRegister}>
              Don't have an account? <b>Register</b>
            </span>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Login;
