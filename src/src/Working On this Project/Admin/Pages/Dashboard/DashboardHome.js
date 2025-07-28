// import React, { useEffect, useState } from "react";
// import { Input, Table, Spin } from "antd";
// import { Lost_get, Found_get, getPracticeList } from "../../../Api/Service";
// import "./DashboardHome.css";

// function DashboardHome() {
//   const [lostItems, setLostItems] = useState([]);
//   const [foundItems, setFoundItems] = useState([]);
//   const [practiceList, setPracticeList] = useState(null);
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "default"
//   );
//   const [open, setOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUserStats();
//     fetchLostItems();
//     fetchFoundItems();
//   }, []);

//   const fetchUserStats = async () => {
//     setLoading(true);
//     try {
//       const data = await getPracticeList();
//       setPracticeList(data);
//     } catch (err) {
//       console.error("Failed to fetch user stats", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const root = document.documentElement;
//     root.classList.remove("light-theme", "dark-theme");

//     if (theme === "dark") {
//       root.classList.add("dark-theme");
//       localStorage.setItem("theme", "dark");
//     } else if (theme === "light") {
//       root.classList.add("light-theme");
//       localStorage.setItem("theme", "light");
//     } else {
//       localStorage.removeItem("theme");
//     }
//   }, [theme]);

//   const handleSelect = (value) => {
//     setTheme(value);
//     setOpen(false);
//   };

//   const fetchLostItems = async () => {
//     try {
//       const data = await Lost_get();
//       setLostItems(data);
//     } catch (error) {
//       console.error("Error fetching lost items:", error);
//     }
//   };

//   const fetchFoundItems = async () => {
//     try {
//       const data = await Found_get();
//       setFoundItems(data);
//     } catch (error) {
//       console.error("Error fetching found items:", error);
//     }
//   };

//   const cardData = practiceList
//     ? [
//       {
//         title: "Total Users",
//         value: practiceList.total_users,
//         color: "bg-black text-white",
//       },
//       {
//         title: "Active Users",
//         value: practiceList.active_users,
//         // color: "bg-green-100 text-green-800",
//       },
//       {
//         title: "Inactive Users",
//         value: practiceList.inactive_users,
//         color: "bg-yellow-100 text-yellow-800",
//       },
//       {
//         title: "Admins",
//         value: practiceList.admins,
//         color: "bg-purple-100 text-purple-800",
//       },
//     ]
//     : [];

//   const filteredLostItems =
//     selectedCategory === "All Categories"
//       ? lostItems
//       : lostItems.filter((item) => item.category === selectedCategory);

//   const filteredFoundItems =
//     selectedCategory === "All Categories"
//       ? foundItems
//       : foundItems.filter((item) => item.category === selectedCategory);

//   // const columns = [
//   //   { title: "ID", dataIndex: "id", key: "id" },
//   //   { title: "Name", dataIndex: "name", key: "name" },
//   //   { title: "Email", dataIndex: "email", key: "email" },
//   //   { title: "Country", dataIndex: "country", key: "country" },
//   //   { title: "Phone", dataIndex: "phone", key: "phone" },
//   // ];



//   const columns = [
//     { title: "ID", dataIndex: "id", key: "id" },
//     { title: "Name", dataIndex: "name", key: "name" },
//     { title: "Email", dataIndex: "email", key: "email" },
//     { title: "Country", dataIndex: "country", key: "country" },
//     { title: "Phone", dataIndex: "phone", key: "phone" },

//   ];

//   return (
//     <div className="dashboard_container">
//       <div className="dashboard-header">
//         <select
//           className="category-select"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//         >
//           <option value="All Categories">All Categories</option>
//           <option value="personal_belongings">Personal Belongings</option>
//           <option value="bags_accessories">Bags and Accessories</option>
//           <option value="documents">Documents</option>
//           <option value="electronics">Electronics</option>
//           <option value="clothing_wearables">Clothing and Wearables</option>
//           <option value="kids_items">Kids' Items</option>
//           <option value="pets">Pets</option>
//           <option value="vehicles">Vehicles</option>
//           <option value="office_study">Office and Study</option>
//           <option value="religious_items">Religious Items</option>
//         </select>

//         <Input.Search
//           placeholder="Search lost or found items..."
//           enterButton
//           size="large"
//           onSearch={(value) => console.log("Search:", value)}
//           style={{ width: 360 }}
//         />

//         <div className="dropdown-container">
//           <button className="dropdown-button" onClick={() => setOpen(!open)}>🌐 Theme</button>
//           {open && (
//             <div className="dropdown-menu">
//               <button onClick={() => handleSelect("light")}>🌞 Light</button>
//               <button onClick={() => handleSelect("dark")}>🌚 Dark</button>
//               <button onClick={() => handleSelect("default")}>⚙️ System</button>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="dashboard-content">
//         <div className="card-container">
//           {/* {cardData.map((card, idx) => (
//             <div className="stat-card"  key={idx}>
//               <h3>{card.title}</h3>
//               <p>{card.value}</p>
//             </div>
//           ))} */}



//           {cardData.map((card, idx) => (
//             <div className={`stat-card ${card.title === "Total Users" ? "total-users" :
//                 card.title === "Active Users" ? "active-users" :
//                   card.title === "Inactive Users" ? "inactive-users" :
//                     card.title === "Admins" ? "admins" : ""
//               }`} key={idx}>
//               <h3>{card.title}</h3>
//               <p>{card.value}</p>
//             </div>
//           ))}

//         </div>

//         <h3 className="section-titlelost">Lost Items</h3>
//         <div className="card-row">
//           {filteredLostItems.map((item) => (
//             <div className="card" key={item.id}>
//               <img src={`http://localhost:8000${item.item_image}`} alt={item.name} />
//               <p>{item.name}</p>
//             </div>
//           ))}
//         </div>

//         <h3 className="section-titlefound">Found Items</h3>
//         <div className="card-row">
//           {filteredFoundItems.map((item) => (
//             <div className="card" key={item.id}>
//               <img src={`http://localhost:8000${item.item_image}`} alt={item.name} />
//               <p>{item.name}</p>
//             </div>
//           ))}
//         </div>

//         {/* <div className="table-section">
//           <h2>All Users Data</h2>
//           {loading ? (
//             <Spin tip="Loading..." />
//           ) : (
//             <div className="table-wrapper">
//               <Table
//                 dataSource={practiceList?.users || []}
//                 columns={columns}
//                 rowKey="id"
//                 bordered
//                 pagination={{ pageSize: 5 }}
//               />
//             </div>
//           )}
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default DashboardHome;















import React, { useEffect, useState } from "react";
import { Input, Table, Spin } from "antd";
import { Lost_get, Found_get, getPracticeList } from "../../../Api/Service";
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
        // color: "bg-green-100 text-green-800",
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

  // const columns = [
  //   { title: "ID", dataIndex: "id", key: "id" },
  //   { title: "Name", dataIndex: "name", key: "name" },
  //   { title: "Email", dataIndex: "email", key: "email" },
  //   { title: "Country", dataIndex: "country", key: "country" },
  //   { title: "Phone", dataIndex: "phone", key: "phone" },
  // ];



  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Phone", dataIndex: "phone", key: "phone" },

  ];

  return (
    <div className="dashboard_container">
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
          onSearch={(value) => console.log("Search:", value)}
          style={{ width: 360 }}
        />

        <div className="dropdown-container">
          <button className="dropdown-button" onClick={() => setOpen(!open)}>🌐 Theme</button>
          {open && (
            <div className="dropdown-menu">
              <button onClick={() => handleSelect("light")}>🌞 Light</button>
              <button onClick={() => handleSelect("dark")}>🌚 Dark</button>
              <button onClick={() => handleSelect("default")}>⚙️ System</button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-content">
        <div className="card-container">
          {/* {cardData.map((card, idx) => (
            <div className="stat-card"  key={idx}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))} */}



          {cardData.map((card, idx) => (
            <div className={`stat-card ${card.title === "Total Users" ? "total-users" :
                card.title === "Active Users" ? "active-users" :
                  card.title === "Inactive Users" ? "inactive-users" :
                    card.title === "Admins" ? "admins" : ""
              }`} key={idx}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))}

        </div>

        <h3 className="section-titlelost">Lost Items</h3>
        <div className="card-row">
          {filteredLostItems.map((item) => (
            <div className="card" key={item.id}>
              <img src={`http://localhost:8000${item.item_image}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        <h3 className="section-titlefound">Found Items</h3>
        <div className="card-row">
          {filteredFoundItems.map((item) => (
            <div className="card" key={item.id}>
              <img src={`http://localhost:8000${item.item_image}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        {/* <div className="table-section">
          <h2>All Users Data</h2>
          {loading ? (
            <Spin tip="Loading..." />
          ) : (
            <div className="table-wrapper">
              <Table
                dataSource={practiceList?.users || []}
                columns={columns}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
              />
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default DashboardHome;