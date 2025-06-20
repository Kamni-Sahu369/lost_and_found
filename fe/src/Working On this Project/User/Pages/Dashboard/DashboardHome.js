// import React, { useEffect, useState } from "react";
// import { Input } from "antd";
// import { Lost_get, Found_get } from "../../../Api/Service"; // adjust if needed
// import "./DashboardHome.css";
// // import "./ThemeToggleDropdown.css"; // <- custom CSS

// function DashboardHome() {
//   const [lostItems, setLostItems] = useState([]);
//   const [foundItems, setFoundItems] = useState([]);
//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") || "default"
//   );
//   const [open, setOpen] = useState(false);

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
//     // setOpen(false);
//   };

//   // Lost item Fetch
//   useEffect(() => {
//     const fetchLostItems = async () => {
//       try {
//         const data = await Lost_get(localStorage.getItem("user_id"));
//         setLostItems(data);
//         console.log("Lost Items:", data); // Har item me id, name, image, etc. aayega
//       } catch (error) {
//         console.error("Error fetching lost items:", error);
//       }
//     };

//     fetchLostItems();
//   }, []);


//   // Found item Fetch
//   useEffect(() => {
//     const fetchFoundItems = async () => {
//       try {
//         const data = await Found_get(localStorage.getItem("user_id"));
//         setFoundItems(data);
//       } catch (error) {
//         console.error("Error fetching found items:", error);
//       }
//     };

//     fetchFoundItems();
//   }, []);

//   const cardData = [
//     { title: 'Total Users', value: 120, color: 'bg-blue-100 text-blue-800' },
//     { title: 'Active Users', value: 95, color: 'bg-green-100 text-green-800' },
//     { title: 'Inactive Users', value: 25, color: 'bg-yellow-100 text-yellow-800' },
//     { title: 'Admins', value: 5, color: 'bg-purple-100 text-purple-800' },
//   ];



//   return (
//     <div className="dashboard_container">
//       {/* Header */}
//       <div className="dashboard-header">
//         <div className="header_category">
//           <select className="category-select">
//             <option value="all">All Categories</option>
//             <option value="personal_belongings">Personal Belongings</option>
//             <option value="bags_accessories">Bags and Accessories</option>
//             <option value="documents">Documents</option>
//             <option value="electronics">Electronics</option>
//             <option value="clothing_wearables">Clothing and Wearables</option>
//             <option value="kids_items">Kids' Items</option>
//             <option value="pets">Pets</option>
//             <option value="vehicles_related">Vehicles and Related Items</option>
//             <option value="office_study">Office and Study Items</option>
//             <option value="religious_items">Religious Items</option>
//           </select>
//         </div>
//         <div className="input-container">
//           <Input.Search
//             placeholder="Search lost or found items..."
//             enterButton
//             size="large"
//             onSearch={(value) => console.log("Search:", value)}
//             style={{ width: 360 }}
//           />
//         </div>

//         {/* Theme Toggle Dropdown */}
//         <div>
//           <div className="dropdown-container">
//             <button className="dropdown-button" onClick={() => setOpen(!open)}>
//               🌐 Theme
//             </button>
//             {open && (
//               <div className="dropdown-menu">
//                 <button onClick={() => handleSelect("light")}>🌞 Light</button>
//                 <button onClick={() => handleSelect("dark")}>🌚 Dark</button>
//                 <button onClick={() => handleSelect("default")}>
//                   ⚙️ System
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="dashboard-content">
//         {/* member */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             {cardData.map((card, index) => (
//               <div
//                 key={index}
//                 className={`rounded-2xl shadow-md p-6 ${card.color} transition-all duration-300 hover:scale-105`}
//               >
//                 <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
//                 <p className="text-3xl font-bold">{card.value}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/* Lost Items */}
//         <div className="lost-items">
//           <h3>Lost Items</h3>
//           <div className="card-row">
//             {lostItems.map((item) => (
//               <div className="card" key={item.id}>
//                 <img
//                   className="item_img"
//                   src={`http://localhost:8000${item.item_image}`}
//                   alt={item.name}
//                 />
//                 <p>{item.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Found Items */}
//         <div className="found-items">
//           <h3>Found Items</h3>
//           <div className="card-row">
//             {foundItems.map((item) => (
//               <div className="card" key={item.id}>
//                 <img
//                   src={`http://localhost:8000${item.item_image}`}
//                   alt={item.name}
//                 />
//                 <p>{item.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       {/* <div className="dashboard-footer">ankit</div> */}
//     </div>
//   );
// }

// export default DashboardHome;











import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Lost_get, Found_get } from "../../../Api/Service";
import "./DashboardHome.css";

function DashboardHome() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "default");
  const [open, setOpen] = useState(false);

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

  const cardData = [
    { title: "Total Users", value: 120 },
    { title: "Active Users", value: 95 },
    { title: "Inactive Users", value: 25 },
    { title: "Admins", value: 5 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <select className="category-select">
          <option>All Categories</option>
          <option>Personal Belongings</option>
          <option>Bags and Accessories</option>
          <option>Documents</option>
          <option>Electronics</option>
          <option>Clothing and Wearables</option>
          <option>Kids' Items</option>
          <option>Pets</option>
          <option>Vehicles</option>
          <option>Office and Study</option>
          <option>Religious Items</option>
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

      <div className="cards-section">
        {cardData.map((card, index) => (
          <div key={index} className="info-card">
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Lost Items</h3>
        <div className="item-grid">
          {lostItems.map((item) => (
            <div className="item-card" key={item.id}>
              <img src={`http://localhost:8000${item.item_image}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Found Items</h3>
        <div className="item-grid">
          {foundItems.map((item) => (
            <div className="item-card" key={item.id}>
              <img src={`http://localhost:8000${item.item_image}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;

