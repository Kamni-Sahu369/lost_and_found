
// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from "../Interface/Header/Header";
// import Footer from "../Interface/Footer/Footer";
// import Home from "../Interface/Home/Home";
// import Sidebar from '../Admin/Component/Sidebar/Sidebar';
// import About from '../Interface/About/About'
// import Service from "../Interface/Service/Service";
// import Register from "../Interface/Registration/Registration";
// import Category from '../Interface/Category/Category'
// import Categoryfolder from '../Interface/Categoryfolder/Categoryfolder'

// import Dashboard from '../Admin/Pages/Dashboard/DashboardHome';
// import Item from '../Admin/Pages/Item/Item';
// import Profile from '../Admin/Pages/Profile/Profile';
// import Match from '../Admin/Pages/Match/Match';
// import Setting from '../Admin/Pages/Setting/Setting';
// import Suggestion from '../Admin/Pages/Notification/Suggestion'
// import Feedback from '../Admin/Pages/Notification/Feedback'
// import Logout from '../Admin/Pages/Logout/Logout'

// import Phone from '../Interface/Categoryfolder/Phone/Phone'
// import Key from '../Interface/Categoryfolder/Key/Key'
// import Car from '../Interface/Categoryfolder/Car/Car'
// import Jewellry from '../Interface/Categoryfolder/Jewellry/Jewellry'
// import Watch from '../Interface/Categoryfolder/Watch/Watch'
// import Document from '../Interface/Categoryfolder/Document/Document'
// import Bag from '../Interface/Categoryfolder/Bag/Bag'
// import Laptop from '../Interface/Categoryfolder/Laptop/Laptop'
// import Other from '../Interface/Categoryfolder/Other/Other'
// import Person from '../Interface/Categoryfolder/Person/Person'

// import './Landing.css'; // External CSS import

// function Landing() {
//   const [loggedIn, setLoggedIn] = useState(
//     localStorage.getItem("loggedIn") === "true"
//   );

//   useEffect(() => {
//     const checkLogin = () => {
//       const isLoggedInNow = localStorage.getItem("loggedIn") === "true";
//       if (isLoggedInNow !== loggedIn) {
//         setLoggedIn(isLoggedInNow);
//       }
//     };

//     const intervalId = setInterval(checkLogin, 500); // har 500ms check kare

//     return () => clearInterval(intervalId);
//   }, [loggedIn]);

//   return (
//     <BrowserRouter>
//       {loggedIn ? (
//         <div className="landing_container">
//           <Sidebar />
//           <div className="dashboard-content">
//             <Routes>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/item" element={<Item />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/match" element={<Match />} />
//               <Route path="/setting" element={<Setting />} />
//               {/* notification */}
//               <Route path="/suggestion" element={<Suggestion />} />
//               <Route path="/feedback" element={<Feedback />} />
//               <Route path="/logout" element={<Logout />} />



//             </Routes>
//           </div>
//         </div>
//       ) : (
//         <>
//           <Header />
//           <Routes>
//             <Route path="/home" element={<Home/>} />
//             <Route path='/About' element={<About />}></Route>
//             <Route path='/About' element={<About />}></Route>
//             <Route path='/Service' element={<Service />}></Route>
//             <Route path='/Register' element={<Register />}></Route>
//             <Route path='/category' element={<Category />}></Route>

//             <Route path='/Phone' element={<Phone />}></Route>
//             <Route path='/Bag' element={<Bag />}></Route>
//             <Route path='/Key' element={<Key />}></Route>
//             <Route path='/Laptop' element={<Laptop />}></Route>
//             <Route path='/Watch' element={<Watch />}></Route>
//             <Route path='/Document' element={<Document />}></Route>
//             <Route path='/Jewellry' element={<Jewellry />}></Route>
//             <Route path='/Other' element={<Other />}></Route>
//             <Route path='/Car' element={<Car />}></Route>
//             <Route path='/Person' element={<Person />}></Route>
//           </Routes>
//           <Footer />
//         </>
//       )}
//     </BrowserRouter>
//   );
// }

// export default Landing;





import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "../Interface/Header/Header";
import Footer from "../Interface/Footer/Footer";
import Home from "../Interface/Home/Home";
import Sidebar from '../Admin/Component/Sidebar/Sidebar';
import About from '../Interface/About/About'
import Service from "../Interface/Service/Service";
import Register from "../Interface/Registration/Registration";
import Category from '../Interface/Category/Category'
import Categoryfolder from '../Interface/Categoryfolder/Categoryfolder'



// Admin
import Dashboard from '../Admin/Pages/Dashboard/DashboardHome';
import Item from '../Admin/Pages/Item/Item';
import Profile from '../Admin/Pages/Profile/Profile';
import Match from '../Admin/Pages/Match/Match';
import Setting from '../Admin/Pages/Setting/Setting';
import Suggestion from '../Admin/Pages/Notification/Suggestion'
import Feedback from '../Admin/Pages/Notification/Feedback'
import Logout from '../Admin/Pages/Logout/Logout'

// User
import UserDashboard from '../User/Pages/Dashboard/DashboardHome'
import UserItem from '../User/Pages/Item/Item';
import UserProfile from '../User/Pages/Profile/Profile';
import UserMatch from '../User/Pages/Match/Match';
import UserSetting from '../User/Pages/Setting/Setting';
import UserSuggestion from '../User/Pages/Notification/Suggestion'
import UserFeedback from '../User/Pages/Notification/Feedback'
import UserLogout from '../User/Pages/Logout/Logout'



import Phone from '../Interface/Categoryfolder/Phone/Phone'
import Key from '../Interface/Categoryfolder/Key/Key'
import Car from '../Interface/Categoryfolder/Car/Car'
import Jewellry from '../Interface/Categoryfolder/Jewellry/Jewellry'
import Watch from '../Interface/Categoryfolder/Watch/Watch'
import Document from '../Interface/Categoryfolder/Document/Document'
import Bag from '../Interface/Categoryfolder/Bag/Bag'
import Laptop from '../Interface/Categoryfolder/Laptop/Laptop'
import Other from '../Interface/Categoryfolder/Other/Other'
import Person from '../Interface/Categoryfolder/Person/Person'

import './Landing.css'; // External CSS import

function Landing() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [role, setRole] = useState(localStorage.getItem("role")); // get role from localStorage

  useEffect(() => {
    const checkLogin = () => {
      const isLoggedInNow = localStorage.getItem("loggedIn") === "true";
      const currentRole = localStorage.getItem("role");
      if (isLoggedInNow !== loggedIn) setLoggedIn(isLoggedInNow);
      if (currentRole !== role) setRole(currentRole);
    };

    const intervalId = setInterval(checkLogin, 500);
    return () => clearInterval(intervalId);
  }, [loggedIn, role]);
  return (
    <BrowserRouter>
      {loggedIn ? (
        <div className="landing_container">
          <Sidebar />
          <div className="dashboard-content">
            <Routes>
              {role === "admin" ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/item" element={<Item />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/match" element={<Match />} />
                  <Route path="/setting" element={<Setting />} />
                  <Route path="/suggestion" element={<Suggestion />} />
                  <Route path="/feedback" element={<Feedback />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<UserDashboard />} /> {/* Your user dashboard */}
                  <Route path="/item" element={<UserItem />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/match" element={<UserMatch />} />
                  <Route path="/setting" element={<UserSetting />} />
                  <Route path="/suggestion" element={<UserSuggestion />} />
                  <Route path="/feedback" element={<UserFeedback />} />
                  <Route path="/logout" element={<UserLogout />} />
                  {/* Add more user-specific routes here */}
                </>
              )}
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/register" element={<Register />} />
            <Route path="/category" element={<Category />} />

            {/* Category folder routes */}
            <Route path="/phone" element={<Phone />} />
            <Route path="/bag" element={<Bag />} />
            <Route path="/key" element={<Key />} />
            <Route path="/laptop" element={<Laptop />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/document" element={<Document />} />
            <Route path="/jewellry" element={<Jewellry />} />
            <Route path="/other" element={<Other />} />
            <Route path="/car" element={<Car />} />
            <Route path="/person" element={<Person />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  )
}

export default Landing
