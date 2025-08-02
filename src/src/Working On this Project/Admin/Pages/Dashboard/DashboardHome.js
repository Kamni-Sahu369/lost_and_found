import React, { useEffect, useState } from "react";
import { Input, Modal, Spin } from "antd";
import {
  Lost_get,
  Found_get,
  getPracticeList,
  Lost_getById,
  Found_getById,
} from "../../../Api/Service";
import "./DashboardHome.css";
import { Select } from 'antd';
import { ToastContainer, toast } from "react-toastify";
function DashboardHome() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [practiceList, setPracticeList] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "default"
  );
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
const { Option } = Select;
  useEffect(() => {
    fetchUserStats();
    fetchLostItems();
    fetchFoundItems();
  }, []);

  const fetchUserStats = async () => {
    setLoading(true);
    try {
      const data = await getPracticeList();
      setPracticeList(data);
    } catch (err) {
      console.error("Failed to fetch user stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light-theme", "dark-theme");

    if (theme === "dark") {
      root.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      root.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  const handleSelect = (value) => {
    setTheme(value);
    setOpen(false);
  };

  const fetchLostItems = async () => {
    try {
      const data = await Lost_get();
      setLostItems(data);
    } catch (error) {
      console.error("Error fetching lost items:", error);
    }
  };

  const fetchFoundItems = async () => {
    try {
      const data = await Found_get();
      setFoundItems(data);
    } catch (error) {
      console.error("Error fetching found items:", error);
    }
  };

  const handleItemClick = async (item, type) => {
    try {
      let data;
      if (type === "lost") {
        const find_data = filteredLostItems.find((o) => o.id === item.id);
        // data = await Lost_getById(item.id);
        console.log(find_data);
        setSelectedItem(find_data);
      } else {
        // data = await Found_getById(item.id);
        const find_data = filteredFoundItems.find((o) => o.id === item.id);
        setSelectedItem(find_data);
      }

      setIsModalVisible(true);
    } catch (err) {
      console.error("Error fetching item details", err);
    }
  };

  const filteredLostItems =
    selectedCategory === "All Categories"
      ? lostItems
      : lostItems.filter((item) => item.category === selectedCategory);

  const filteredFoundItems =
    selectedCategory === "All Categories"
      ? foundItems
      : foundItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="dashboard_container">
      {/* Header + Theme */}
      <div className="dashboard-header">
        <select
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All Categories">All Categories</option>
          <option value="personal_belongings">Personal Belongings</option>
          <option value="bags_accessories">Bags and Accessories</option>
          <option value="documents">Documents</option>
          <option value="electronics">Electronics</option>
          <option value="clothing_wearables">Clothing and Wearables</option>
          <option value="kids_items">Kids' Items</option>
          <option value="pets">Pets</option>
          <option value="vehicles_related">Vehicles and Related Items</option>
          <option value="office_study">Office and Study Items</option>
          <option value="religious_items">Religious Items</option>
          <option value="others">Others</option>
        </select>

        <Input.Search
          placeholder="Search lost or found items..."
          enterButton
          size="large"
          style={{ width: 360 }}
          onSearch={(value) => console.log("Search:", value)}
        />

        <div className="dropdown-container">
          <button className="dropdown-button" onClick={() => setOpen(!open)}>
            🌐 Theme
          </button>
          {open && (
            <div className="dropdown-menu">
              <button onClick={() => handleSelect("light")}>🌞 Light</button>
              <button onClick={() => handleSelect("dark")}>🌚 Dark</button>
              <button onClick={() => handleSelect("default")}>⚙️ System</button>
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="dashboard-content">
        <div className="card-container">
          {practiceList &&
            [
              { title: "Total Users", value: practiceList.total_users },
              { title: "Active Users", value: practiceList.active_users },
              { title: "Inactive Users", value: practiceList.inactive_users },
              { title: "Admins", value: practiceList.admins },
            ].map((card, idx) => (
              <div className="stat-card" key={idx}>
                <h3>{card.title}</h3>
                <p>{card.value}</p>
              </div>
            ))}
        </div>

        {/* Lost Items */}
        <h3 className="section-titlelost">Lost Items</h3>
        <div className="card-row">
          {filteredLostItems.map((item) => (
            <div
              className="card"
              key={item.id}
              onClick={() => handleItemClick(item, "lost")}
            >
              <img
                src={`http://localhost:8000${item.item_image}`}
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        {/* Found Items */}
        <h3 className="section-titlefound">Found Items</h3>
        <div className="card-row">
          {filteredFoundItems.map((item) => (
            <div
              className="card"
              key={item.id}
              onClick={() => handleItemClick(item, "found")}
            >
              <img
                src={`http://localhost:8000${item.item_image}`}
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        okText="OK"
        cancelButtonProps={{ style: { display: "none" } }}
        title="Item Details"
      >
        {selectedItem && (
          <div>
            <p>
              <strong>Name:</strong> {selectedItem.name}
            </p>
            <p>
              <strong>Description:</strong> {selectedItem.description}
            </p>
            <p>
              <strong>Category:</strong> {selectedItem.category}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {selectedItem.location_found || selectedItem.location}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {selectedItem.date_reported || selectedItem.date}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default DashboardHome;
