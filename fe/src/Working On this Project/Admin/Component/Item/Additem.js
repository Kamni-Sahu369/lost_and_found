import React, { useState, useEffect } from "react";
import LostItem from "../../Component/Item/Lostitem";
import FoundItem from "../../Component/Item/Founditem";
import "../Item/Item.css";


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
