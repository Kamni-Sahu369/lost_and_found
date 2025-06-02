
import React, { useState } from "react";
import { Button, Modal, Form, Input, DatePicker, Upload, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Item.css";
import LostItem from "../../Component/Item/Lostitem";
import FoundItem from "../../Component/Item/Founditem";

const { TextArea } = Input;

const Item = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("lost");

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log("Profile Data:", values);
    // API call if needed
  };

  return (
    <div className="profile_wrapper1">
      <div className="profile_header">
        <Button
          type="primary"
          className="profile_header_btn"
          onClick={showModal}
        >
          Create Your Profile
        </Button>

        <Modal
          title="Create Your Profile"
          open={open}
          onCancel={handleCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>


            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email", message: "Enter valid email" }]}
            >
              <Input placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item name="phone" label="Phone Number">
              <Input placeholder="Optional phone number" />
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

            <Form.Item name="profilePic" label="Profile Picture">
              <Upload name="profile" listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item name="address" label="Address">
              <TextArea rows={2} placeholder="Your full address" />
            </Form.Item>

            {/* <Form.Item name="bio" label="Bio / About">
              <TextArea rows={3} placeholder="Tell us something about yourself" />
            </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Profile
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <main className="profile_main1">
        <div className="profile_left">
          <p onClick={() => setSelectedTab("lost")}>Lost Item</p>
          <p onClick={() => setSelectedTab("found")}>Found Item</p>
          <p onClick={() => setSelectedTab("pending")}>Pending Claim Requests</p>
        </div>

        <div className="profile_center">
          {selectedTab === "lost" && <LostItem />}
          {selectedTab === "found" && <FoundItem/>}
          {selectedTab === "pending" && <div>Pending Claim Requests Component Here</div>}
        </div>
      </main>

      {/* <footer className="profile_footer">
        <p>© 2025 SmartE Platform</p>
      </footer> */}
    </div>
  );
};

export default Item;

