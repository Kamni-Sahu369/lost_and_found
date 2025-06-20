
// import React, { useState } from "react";
// import { Button, Modal, Form, Input, DatePicker, Upload, Radio } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import "./Item.css";
// import LostItem from "../../Component/Item/Lostitem";
// import FoundItem from "../../Component/Item/Founditem";

// const { TextArea } = Input;

// const Item = () => {
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("lost");

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   // const onFinish = (values) => {
//   //   console.log("Profile Data:", values);
//   //   // API call if needed
//   // };

//   return (
//     <div className="profile_wrapper1">
//       <div className="profile_header">
       
//       </div>

//       <main className="profile_main1">
//         <div className="profile_left">
//           <p onClick={() => setSelectedTab("lost")}>Lost Item</p>
//           <p onClick={() => setSelectedTab("found")}>Found Item</p>
//           <p onClick={() => setSelectedTab("pending")}>Pending Claim Requests</p>
//         </div>

//         <div className="profile_center">
//           {selectedTab === "lost" && <LostItem />}
//           {selectedTab === "found" && <FoundItem/>}
//           {selectedTab === "pending" && <div>Pending Claim Requests Component Here</div>}
//         </div>
//       </main>

//       {/* <footer className="profile_footer">
//         <p>© 2025 SmartE Platform</p>
//       </footer> */}
//     </div>
//   );
// };

// export default Item;




import React, { useState, useEffect } from "react";
import LostItem from "../../Component/Item/Lostitem";
import FoundItem from "../../Component/Item/Founditem";
import "./Item.css";

const Item = () => {
  const [selectedTab, setSelectedTab] = useState("lost");

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    const root = document.documentElement;
    root.classList.remove("light-theme", "dark-theme");
    root.classList.add(`${theme}-theme`);
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case "lost":
        return <LostItem />;
      case "found":
        return <FoundItem />;
      case "pending":
        return (
          <div className="placeholder">
            <h2>🕓 Pending Requests</h2>
            <p>No pending requests at this time.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="item-page-wrapper">
      {/* Header Tabs */}
      <header className="tab-header">
        <h1 className="tab-title"> Lost & Found Panel</h1>
        <nav className="tab-nav">
          <button
            className={selectedTab === "lost" ? "tab active" : "tab"}
            onClick={() => setSelectedTab("lost")}
          >
            📦 Lost Items
          </button>
          <button
            className={selectedTab === "found" ? "tab active" : "tab"}
            onClick={() => setSelectedTab("found")}
          >
            🔍 Found Items
          </button>
          <button
            className={selectedTab === "pending" ? "tab active" : "tab"}
            onClick={() => setSelectedTab("pending")}
          >
            🕓 Pending Requests
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="tab-content">{renderContent()}</main>
    </div>
  );
};

export default Item;
