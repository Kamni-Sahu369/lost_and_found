import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  Radio,
  Select,
  Checkbox,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Profile.css";
import {
  updateProfile,
  updateProfile_get,
  getPracticeList,
  updateUserPassword,
} from "../../../Api/Service";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

function Profile() {
  const [user, setUser] = useState([]);
  const [regUser, setregUser] = useState([]);

  const [form] = Form.useForm();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const showProfileModal = () => {
    form.setFieldsValue({
      ...user,
      dob: user.dob ? moment(user.dob) : null,
      agreement: user.agreement === "true",
    });
    setIsProfileModalOpen(true);
  };

  const handleProfileCancel = () => {
    setIsProfileModalOpen(false);
    form.resetFields();
  };

  const showPasswordModal = () => setIsPasswordModalOpen(true);
  const handlePasswordCancel = () => setIsPasswordModalOpen(false);

  const handleProfileFinish = async (values) => {
    try {
      await updateProfile(values);
      message.success("Profile updated successfully!");
      setIsProfileModalOpen(false);
      fetchProfile();
    } catch (error) {
      console.error("Profile update failed:", error);
      message.error("Failed to update profile.");
    }
  };

  const handlePasswordFinish = async (values) => {
    alert("cvfbgb db");
    try {
      await updateUserPassword(values.id, values);
      message.success("Password changed successfully!");
      setIsPasswordModalOpen(false);
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Failed to change password.");
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await updateProfile_get();
      setUser(data);
      console.log(data);
      const savedData = JSON.parse(localStorage.getItem("registerData"));
      console.log(savedData);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      message.error("Failed to load profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="main_div">
      {/* Header Buttons */}
      <div className="profile_header_main">
        <Button type="primary" onClick={showProfileModal}>
          Create / Update Profile
        </Button>
        <Button type="primary" onClick={showPasswordModal}>
          Change Password
        </Button>
      </div>

      {/* Profile Modal */}

      {/* <Modal
        title="Create Your Profile"
        open={isProfileModalOpen}
        onCancel={handleProfileCancel}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleProfileFinish}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>

          <Form.Item name="alternatePhone" label="Alternate Contact">
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Gender">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="dob" label="Date of Birth">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="profilePic"
            label="Profile Picture"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              name="profilePic"
              listType="picture"
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="address" label="Address">
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>

          <Form.Item name="state" label="State">
            <Input />
          </Form.Item>

          <Form.Item name="pincode" label="PIN Code">
            <Input />
          </Form.Item>

          <Form.Item name="userType" label="User Type">
            <Select placeholder="Select user type">
              <Option value="regular">Regular</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must accept terms")),
              },
            ]}
          >
            <Checkbox>
              I agree to the <a href="/terms">terms and conditions</a>.
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Profile
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}


      <Modal className="Create_Your_Profile"
  title="Create Your Profile"
  open={isProfileModalOpen}
  onCancel={handleProfileCancel}
  footer={null}
  width={600} // ✅ Smaller width
  bodyStyle={{ maxHeight: "65vh", overflowY: "auto", padding: "20px" }} // ✅ Controlled height and scroll
>
  <Form layout="vertical" form={form} onFinish={handleProfileFinish}>
    <Row gutter={12}>
      <Col span={12}>
        <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
          <Input className="profile_input" placeholder="Full name" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input placeholder="Email" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={12}>
      <Col span={12}>
        <Form.Item name="phone" label="Phone">
          <Input placeholder="Phone" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="alternatePhone" label="Alternate Contact">
          <Input placeholder="Alt phone" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={12}>
      <Col span={12}>
        <Form.Item name="gender" label="Gender">
          <Radio.Group>
            <Radio value="male">Male</Radio><br></br>
            <Radio value="female">Female</Radio><br></br>
            <Radio value="other">Other</Radio><br></br>
          </Radio.Group>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="dob" label="Date of Birth">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item
      name="profilePic"
      label="Profile Picture"
      valuePropName="fileList"
      getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
    >
      <Upload
        name="profilePic"
        listType="picture"
        beforeUpload={() => false}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Form.Item>

    <Form.Item name="address" label="Address">
      <TextArea rows={2} placeholder="Your address" />
    </Form.Item>

    <Row gutter={12}>
      <Col span={8}>
        <Form.Item name="city" label="City">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="state" label="State">
          <Input />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name="pincode" label="PIN Code">
          <Input />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={12}>
      <Col span={12}>
        <Form.Item name="userType" label="User Type">
          <Select placeholder="User type">
            <Option value="regular">Regular</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("You must accept terms")),
            },
          ]}
        >
          <Checkbox>
            I agree to the <a href="/terms">terms</a>.
          </Checkbox>
        </Form.Item>
      </Col>
    </Row>

    <Form.Item style={{ textAlign: "right", marginTop: 10 }}>
      <Button type="primary" htmlType="submit">
        Save Profile
      </Button>
    </Form.Item>
  </Form>
</Modal>


      {/* Password Modal */}
      <Modal className="Change_Password"
        title="Change Password"
        open={isPasswordModalOpen}
        onCancel={handlePasswordCancel}
        footer={null}
        width={450}
      >
        <Form
          layout="vertical"
          onFinish={handlePasswordFinish}
          style={{ width: 350 }}
        >
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("newPassword") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Profile Card */}
      <div>
        <div className="profile_card_main">
          {user.map((i) => (
            <div className="profile-card">
              <img
                src={`http://localhost:8000${i.profile_pic}`}
                alt={i.name}
                className="profile-image"
              />
              <p>
                <strong>Name:</strong> {i.users.name}
              </p>
              <p>
                <strong>Email:</strong> {i.users.email}
              </p>
              <p>
                <strong>city:</strong> {i.city}
              </p>
              <p>
                <strong>Gender:</strong> {i.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong> {i.dob}
              </p>
              <p>
                <strong>Phone:</strong> {i.users.phone}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
