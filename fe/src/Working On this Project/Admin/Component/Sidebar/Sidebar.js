import React, { useState } from 'react';
import {
  Home,
  User,
  LogOut,
  PackageSearch,
  Menu,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  ThumbsUp,
  Bell,
  Layers,
  Link,
  FileText,
  CreditCard,
  Search,
  FilePlus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // for Item dropdown
  const [showRequest, setShowRequest] = useState(false);

  const navigate = useNavigate();

  const topMenus = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
    { name: 'Category', icon: <Layers size={20} />, path: '/Categorys' },
    {
      name: 'Item',
      icon: <PackageSearch size={20} />,
      children: [
        { name: 'Add Item', path: '/Additem' },
        { name: 'List Items', path: '/Listitem' },
      ],
    },
    { name: 'Match', icon: <Link size={20} />, path: '/match' },
  ];
  const requestMenu = {
    name: 'Request',
    icon: <FilePlus size={20} />,
    children: [
      { name: 'Pending', path: '/request/pending' },
      { name: 'Approval', path: '/request/approval' },
    ],
  };
  const PaymentMenu = {
    name: 'Payment',
    icon: <CreditCard size={20} />,
    children: [
      { name: 'Pending Paymenet', path: '/Pending_pay' },
      { name: 'Complete Payment', path: '/Complete_pay' },
    ],
  };

  const OtherMenus = [
    { name: 'Suggestion', icon: <MessageCircle size={20} />, path: '/suggestion' },
    { name: 'Feedback', icon: <ThumbsUp size={20} />, path: '/feedback' },
    { name: 'Notification', icon: <Bell size={20} />, path: '/Notification' },
    { name: 'Reports', icon: <FileText size={20} />, path: '/Reports' },
  ]


  // const notificationMenu = {
  //   name: 'Notification',
  //   icon: <Bell size={20} />,
  //   children: [
  //     { name: 'Suggestion', path: '/suggestion' },
  //     { name: 'Feedback', path: '/feedback' },
  //     { name: 'Updates', path: '/updates' },
  //     { name: 'Payment Receipts', path: '/payment_receipts' },
  //   ],
  // };

  const logoutMenu = { name: 'Logout', icon: <LogOut size={20} />, path: '/logout' };

  return (
    <div className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button onClick={() => setOpen(!open)} className="toggle-btn">
          <Menu size={28} />
        </button>
      </div>

      <div className="sidebar-content">
        <div className="menu-group">
          {topMenus.map((menu, index) => (
            <div key={index}>
              <div
                className="menu-item"
                onClick={() => {
                  if (menu.children) {
                    setOpenDropdown(openDropdown === menu.name ? null : menu.name);
                  } else {
                    navigate(menu.path);
                  }
                }}
              >
                {menu.icon}
                {open && <span className="menu-text">{menu.name}</span>}
                {menu.children && open && (
                  <span>
                    {openDropdown === menu.name ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </span>
                )}
              </div>

              {menu.children && openDropdown === menu.name && open && (
                <div className="settings-submenu">
                  {menu.children.map((child, idx) => (
                    <div
                      key={idx}
                      className="settings-submenu-item"
                      onClick={() => navigate(child.path)}
                    >
                      {child.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/*request Menu */}
          <div>
            <div className="settings-header" onClick={() => setShowRequest(!showRequest)}>
              <div className="settings-icon-label">
                {requestMenu.icon}
                {open && <span className="menu-text">{requestMenu.name}</span>}
              </div>
              {open && (
                <span>
                  {showRequest ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
              )}
            </div>

            {showRequest && open && (
              <div className="settings-submenu">
                {requestMenu.children.map((submenu, idx) => (
                  <div
                    key={idx}
                    className="settings-submenu-item"
                    onClick={() => navigate(submenu.path)}
                  >
                    {submenu.name}
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* Payment Menu */}
          {<div>
            <div className="settings-header" onClick={() => setShowSettings(!showSettings)}>
              <div className="settings-icon-label">
                {PaymentMenu.icon}
                {open && <span className="menu-text">{PaymentMenu.name}</span>}
              </div>
              {open && (
                <span>
                  {showSettings ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
              )}
            </div>

            {showSettings && open && (
              <div className="settings-submenu">
                {PaymentMenu.children.map((submenu, idx) => (
                  <div key={idx} className="settings-submenu-item" onClick={() => navigate(submenu.path)}>
                    {submenu.name}
                  </div>
                ))}
              </div>
            )}
          </div>}

          {/* Other Menu */}
          {OtherMenus.map((menu, index) => (
            <div key={index} className="menu-item" onClick={() => navigate(menu.path)}>
              {menu.icon}
              {open && <span className="menu-text">{menu.name}</span>}
            </div>
          ))}


          {/* Notification Menu */}
          {/* <div>
            <div className="settings-header" onClick={() => setShowNotification(!showNotification)}>
              <div className="settings-icon-label">
                {notificationMenu.icon}
                {open && <span className="menu-text">{notificationMenu.name}</span>}
              </div>
              {open && (
                <span>
                  {showNotification ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
              )}
            </div>

            {showNotification && open && (
              <div className="settings-submenu">
                {notificationMenu.children.map((submenu, idx) => (
                  <div key={idx} className="settings-submenu-item" onClick={() => navigate(submenu.path)}>
                    {submenu.name}
                  </div>
                ))}
              </div>
            )}
          </div> */}
        </div>

        <div className="logout">
          <div className="menu-item" onClick={() => navigate(logoutMenu.path)}>
            {logoutMenu.icon}
            {open && <span className="menu-text">{logoutMenu.name}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
