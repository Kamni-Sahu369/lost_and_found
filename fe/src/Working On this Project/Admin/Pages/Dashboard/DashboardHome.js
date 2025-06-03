import React, { useEffect, useState } from "react";
import { Input ,Button} from "antd";
import { Lost_get ,Found_get } from "../../../Api/Service"; // adjust this import path
import "./DashboardHome.css";

function DashboardHome() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]); // placeholder

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const data = await Lost_get();
        setLostItems(data);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchLostItems();
  }, []);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const data = await Found_get();
        setFoundItems(data);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchFoundItems();
  }, []);

  

  return (
    <div className="dashboard_container">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <select className="category-select">
            <option value="all">All Categories</option>
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
            {/* other options */}
          </select>
        </div>
        {/* <div className="input-container">
          <Input.Search
            placeholder="Search lost or found items..."
            enterButton
            size="large"
            onSearch={(value) => console.log("Search:", value)}
            style={{ width: 360 }}
          />
        </div> */}
        <div>
          <Button>Theam</Button>
        </div>
      </div>

      {/* Middle */}
      <div className="dashboard-content">
        {/* Lost Items */}
        <div className="lost-items">
          <h3>Lost Items</h3>
          <div className="card-row" >
            {lostItems.map((item) => (
              <div className="card">
                <img className="item_img"
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
          <h3>Found Items</h3>
          <div className="card-row">
            {foundItems.map((item) => (
              <div className="card" key={item.id}>
                <img
                  src={`http://localhost:8000${item.item_image}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">Footer content here</div>
    </div>
  );
}

export default DashboardHome;
