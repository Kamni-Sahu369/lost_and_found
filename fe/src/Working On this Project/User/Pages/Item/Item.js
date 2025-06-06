
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

  // const onFinish = (values) => {
  //   console.log("Profile Data:", values);
  //   // API call if needed
  // };

  return (
    <div className="profile_wrapper1">
      <div className="profile_header">
       
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

