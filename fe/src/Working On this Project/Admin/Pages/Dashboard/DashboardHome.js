import React, { useEffect, useState } from "react";
import { Input, Table, Spin } from "antd";
import { Lost_get, Found_get, getPracticeList } from "../../../Api/Service"; // adjust if needed
import "./DashboardHome.css";

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

  const cardData = practiceList
    ? [
        {
          title: "Total Users",
          value: practiceList.total_users,
          color: "bg-black text-white",
        },
        {
          title: "Active Users",
          value: practiceList.active_users,
          color: "bg-green-100 text-green-800",
        },
        {
          title: "Inactive Users",
          value: practiceList.inactive_users,
          color: "bg-yellow-100 text-yellow-800",
        },
        {
          title: "Admins",
          value: practiceList.admins,
          color: "bg-purple-100 text-purple-800",
        },
      ]
    : [];

  const filteredLostItems =
    selectedCategory === "All Categories"
      ? lostItems
      : lostItems.filter((item) => item.category === selectedCategory);

  const filteredFoundItems =
    selectedCategory === "All Categories"
      ? foundItems
      : foundItems.filter((item) => item.category === selectedCategory);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "title",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "description",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "date",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "date",
    },
  ];

  return (
    <div className="dashboard_container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header_category">
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
            <option value="vehicles">Vehicles</option>
            <option value="office_study">Office and Study</option>
            <option value="religious_items">Religious Items</option>
          </select>
        </div>

        <div className="input-container">
          <Input.Search
            placeholder="Search lost or found items..."
            enterButton
            size="large"
            onSearch={(value) => console.log("Search:", value)}
            style={{ width: 360 }}
          />
        </div>

        {/* Theme Toggle Dropdown */}
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

      {/* Content */}
      <div className="dashboard-content">
        {/* Member Stats */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`rounded-2xl shadow-md p-6 ${card.color} transition-all duration-300 hover:scale-105`}
              >
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lost Items */}
        <div className="lost-items">
          <h3 style={{ color: "red" }}>Lost Items</h3>
          <div className="card-row">
            {filteredLostItems.map((item) => (
              <div className="card" key={item.id}>
                <img
                  className="item_img"
                  src={`http://localhost:8000${item.item_image}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Found Items */}
        <div className="found-items">
          <h3 style={{ color: "red" }}>Found Items</h3>
          <div className="card-row">
            {filteredFoundItems.map((item) => (
              <div className="card" key={item.id}>
                <img
                  className="item_img"
                  src={`http://localhost:8000${item.item_image}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* All User Data - Practice Table */}
        <div style={{ padding: 24 }}>
          <h1>All Users Data</h1>
          {loading ? (
            <Spin tip="Loading..." />
          ) : (
            <Table
              dataSource={practiceList?.users || []}
              columns={columns}
              rowKey="id"
              bordered
              pagination={{ pageSize: 5 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
