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
  const [showSettings, setShowSettings] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showRequest, setShowRequest] = useState(false);
  const [showReports, setShowReports] = useState(false); // <- for Reports dropdown

  const navigate = useNavigate();

  const topMenus = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
    // { name: 'Category', icon: <Layers size={20} />, path: '/Categorys' },
    {
      name: 'Item',
      icon: <PackageSearch size={20} />,
      children: [
        { name: 'Add Item', path: '/Additem' },
        { name: 'List Items', path: '/Listitem' },
      ],
    },
    // { name: 'Match', icon: <Link size={20} />, path: '/match' },
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

  const reportMenu = {
    name: 'Reports',
    icon: <FileText size={20} />,
    children: [
      { name: 'All Lost Items', path: '/All_lostitem' },
      { name: 'All Found Items', path: 'All_founditem' },
      { name: 'Match Items', path: '/Matchitem' },
      { name: 'Monthly Report', path: '/Monthly_report' },
      { name: 'Yearly Report', path: '/Yearly_report' },
      { name: 'Payment Report', path: '/Payment_report' },
    ],
  };

  const OtherMenus = [
    { name: 'Suggestion', icon: <MessageCircle size={20} />, path: '/suggestion' },
    { name: 'Feedback', icon: <ThumbsUp size={20} />, path: '/feedback' },
    { name: 'Notification', icon: <Bell size={20} />, path: '/Notification' },
  ];

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
          {/* Top Menus */}
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

          {/* Request Menu */}
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
          <div>
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
          </div>

          {/* Reports Menu Dropdown */}
          <div>
            <div className="settings-header" onClick={() => setShowReports(!showReports)}>
              <div className="settings-icon-label">
                {reportMenu.icon}
                {open && <span className="menu-text">{reportMenu.name}</span>}
              </div>
              {open && (
                <span>
                  {showReports ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
              )}
            </div>

            {showReports && open && (
              <div className="settings-submenu">
                {reportMenu.children.map((submenu, idx) => (
                  <div key={idx} className="settings-submenu-item" onClick={() => navigate(submenu.path)}>
                    {submenu.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Other Menus */}
          {OtherMenus.map((menu, index) => (
            <div key={index} className="menu-item" onClick={() => navigate(menu.path)}>
              {menu.icon}
              {open && <span className="menu-text">{menu.name}</span>}
            </div>
          ))}
        </div>

        {/* Logout */}
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
