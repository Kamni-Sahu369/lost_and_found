import React, { useState, useEffect } from "react";
import "./SubCategory.css";
import { Input, TimePicker, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "../../Login/Login";
import { Lost_get, Found_get } from "../../../Api/Service";

import View from "../View/View"
function SubCategory() {
  const location = useLocation();

  console.log("Location State:", location.state); // Debug line

  const [selectedCategoryState, setSelectedCategoryState] = useState(
    location.state && location.state.category ? location.state.category : "all"
  );

  const navigate = useNavigate();
  const [combinedItems, setCombinedItems] = useState([]);

  const handleFind = () => {
    console.log("Find button clicked");
  };

  const handleClick = () => {
    console.log("Report button clicked");
    navigate("/login");
  };

  useEffect(() => {
    console.log("Selected Category:", selectedCategoryState); // Debug line
    fetchItems();
  }, [selectedCategoryState]);

  const fetchItems = async () => {
    try {
      const Lostdata = await Lost_get();
      const Founddata = await Found_get();

      const taggedLost = Lostdata.map((item) => ({ ...item, type: "lost" }));
      const taggedFound = Founddata.map((item) => ({ ...item, type: "found" }));

      const merged = [...taggedLost, ...taggedFound];

      const filtered =
        selectedCategoryState.toLowerCase() === "all"
          ? merged
          : merged.filter(
              (item) =>
                item.category?.toLowerCase() ===
                selectedCategoryState.toLowerCase()
            );

      setCombinedItems(filtered);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const onView = (item) => {
  navigate("/view", { state: { item } });
};

  return (
    <div className="phone_main">
      {/* Row 1 */}
      <div className="phone_row1">
        <div className="phone_category">
          <select
            className="category-select"
            value={selectedCategoryState}
            onChange={(e) => setSelectedCategoryState(e.target.value)}
          >
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
          </select>
        </div>

        <div className="row1-search-field">
          <Input
            placeholder="Enter location"
            prefix={<SearchOutlined />}
            className="input-location"
          />
          <TimePicker
            format="HH:mm"
            defaultValue={dayjs("12:00", "HH:mm")}
            className="input-time"
          />
          <Button type="primary" className="find-button" onClick={handleFind}>
            Find
          </Button>
        </div>
      </div>

      {/* Row 2 */}
      <div className="phone_row2">Showing all recently reported items</div>

      {/* Row 3 */}
      <div className="phone_row3">
        <div className="phone_filter">Filter Options</div>
        <div className="phone_images">
          {combinedItems.map((i) => (
            <div className="phone_col" key={i.id}>
              <img
                src={`https://lost-and-found-co21.onrender.com${i.item_image}`}
                alt={i.name}
                className="item_image"
              />
              <h3>{i.name}</h3>
              <p>{i.description}</p>
              <button onClick={() => onView(i)} className="view_button">View</button>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4 */}
      <div className="report_box">
        <h2>Did you want to report Lost or Found?</h2>
        <p>
          Report your findings online <strong>FOR FREE</strong> & Get REWARDS. <br />
          It's easier than you think!
        </p>
        <button type="button" className="registration_but">
          <Login />
        </button>
      </div>
    </div>
  );
}

export default SubCategory;
