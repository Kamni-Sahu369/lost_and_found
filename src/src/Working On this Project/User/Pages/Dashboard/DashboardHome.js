import React, { useEffect, useState } from "react";
import { Input, Modal, Spin } from "antd";
import { Lost_get, Found_get } from "../../../Api/Service";
import "./DashboardHome.css";

function DashboardHome() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "default");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
   const [selectedItem, setSelectedItem] = useState(null);
   const [isModalVisible, setIsModalVisible] = useState(false);

  // Theme switcher
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

  // Fetch Lost Items
  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const data = await Lost_get(localStorage.getItem("user_id"));
        setLostItems(data);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };
    fetchLostItems();
  }, []);

  // Fetch Found Items
  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const data = await Found_get(localStorage.getItem("user_id"));
        setFoundItems(data);
      } catch (error) {
        console.error("Error fetching found items:", error);
      }
    };
    fetchFoundItems();
  }, []);

  // Card stats
  const cardData = [
  {
    title: "Total Users",
    value: 120,
    bgColor: "#e3f2fd",
    textColor: "#1565c0",
  },
  {
    title: "Active Users",
    value: 95,
    bgColor: "#e8f5e9",
    textColor: "#2e7d32",
  },
  {
    title: "Inactive Users",
    value: 25,
    bgColor: "#fff3e0",
    textColor: "#ef6c00",
  },
  {
    title: "Admins",
    value: 5,
    bgColor: "#ede7f6",
    textColor: "#6a1b9a",
  },
];



 const handleItemClick = async (item, type) => {
    try {
      let data;
      if (type === "lost") {
        const find_data=filteredLostItems.find(o=>o.id===item.id)
        // data = await Lost_getById(item.id);
        console.log(find_data)
          setSelectedItem(find_data);
        
      } else {
        // data = await Found_getById(item.id);
         const find_data=filteredFoundItems.find(o=>o.id===item.id)
         setSelectedItem(find_data);
      }
    
      setIsModalVisible(true);
    } catch (err) {
      console.error("Error fetching item details", err);
    }
  };

  // Filtered Data by Category
  const filteredLostItems =
    selectedCategory === "All Categories"
      ? lostItems
      : lostItems.filter((item) => item.category === selectedCategory);

  const filteredFoundItems =
    selectedCategory === "All Categories"
      ? foundItems
      : foundItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="dashboard-container">
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
          <option value="vehicles">Vehicles</option>
          <option value="office_study">Office and Study</option>
          <option value="religious_items">Religious Items</option>
        </select>

        <Input.Search
          placeholder="Search lost or found items..."
          enterButton
          size="large"
          className="search-bar"
          onSearch={(value) => console.log("Search:", value)}
        />

        <div className="theme-dropdown">
          <button onClick={() => setOpen(!open)}>🌐 Theme</button>
          {open && (
            <div className="dropdown-menu">
              <button onClick={() => handleSelect("light")}>🌞 Light</button>
              <button onClick={() => handleSelect("dark")}>🌚 Dark</button>
              <button onClick={() => handleSelect("default")}>⚙️ System</button>
            </div>
          )}
        </div>
      </div>

      {/* Card Section */}
      {/* <div className="cards-section">
        {cardData.map((card, index) => (
          <div key={index} className="info-card">
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div> */}

      {/* Lost Items */}
       <h3 className="section-titlelost">Lost Items</h3>
        <div className="card-row">
          {filteredLostItems.map((item) => (
            <div className="card" key={item.id} onClick={() => handleItemClick(item, "lost")}>
              <img src={`https://lost-and-found-co21.onrender.com${item.item_image}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

      {/* Found Items */}
      <h3 className="section-titlefound">Found Items</h3>
        <div className="card-row">
          {filteredFoundItems.map((item) => (
            <div className="card" key={item.id} onClick={() => handleItemClick(item, "found")}>
              <img src={`https://lost-and-found-co21.onrender.com${item.item_image}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>


 <Modal
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        okText="OK"
        cancelButtonProps={{ style: { display: "none" } }}
        title="Item Details"
      >
        {selectedItem && (
          <div >
            <p><strong>Name:</strong> {selectedItem.name}</p>
            <p><strong>Description:</strong> {selectedItem.description}</p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Location:</strong> {selectedItem.location_found || selectedItem.location}</p>
            <p><strong>Date:</strong> {selectedItem.date_reported || selectedItem.date}</p>
          </div>
        )}
      </Modal>


    </div>
  );
}

export default DashboardHome;