import React, { useEffect, useState } from "react";
import { Input, Button, Form, Modal, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [openLogin, setOpenLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // fix: call useNavigate outside useEffect

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        message.error("Invalid username or password");
        return;
      }

      const data = await response.json();
      console.log(data, "hiiiii");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("role", data.role);

      message.success("Login successful!");

      // redirect or close modal
      setOpenLogin(false);

      if (data.role === "admin") {
        navigate("/admin/dashboard"); // admin ka route
      } else {
        navigate("/user/dashboard"); // user ka route
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpenLogin(true)}
        className="Mp_home_beside_btn_second"
      >
        Login
      </Button>

      <Modal
        title={
          <span
            style={{
              color: "darkblue",
              fontWeight: "700",
              fontSize: "25px",
              marginLeft: "35%",
            }}
          >
            Login Page
          </span>
        }
        open={openLogin}
        onCancel={() => setOpenLogin(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          onFinish={handleLogin}
          style={{ maxWidth: 500, margin: "5%" }}
          labelCol={{ span: 4 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email/username" }]}
          >
            <Input placeholder="Your email" style={{ width: 300 }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password
              placeholder="Special character"
              style={{ width: 300 }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "green",
                color: "white",
                marginLeft: "25%",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Login;
