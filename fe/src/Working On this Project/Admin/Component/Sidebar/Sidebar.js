import React, { useState } from 'react';
import {
  Home,
  User,
  Settings,
  LogOut,
  PackageSearch,
  Menu,
  ChevronDown,
  ChevronRight,
  Bell,
  Search 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const topMenus = [
    { name: 'Dashboard', icon: <Home size={20}  />, path: '/' },
    { name: 'Item', icon: <PackageSearch size={20} />, path: '/item' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
    { name: 'Match', icon: <Search  size={20} />, path: '/match' },
  ];

  const settingsMenu = {
    name: 'Settings',
    icon: <Settings size={20} />,
    children: [
      { name: 'Change Password', path: '/settings/change-password' },
      { name: 'Notification', path: '/settings/notifications' },
      { name: 'Privacy', path: '/settings/privacy' },
    ],
  };

  const notificationMenu = {
    name: 'Notification',
    icon: <Bell size={20} />,
    children: [
      { name: 'Suggestion', path: '/suggestion' },
      { name: 'Feedback', path: '/feedback' },
      { name: 'Updates', path: '/updates' }
    ],
  };

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
            <div key={index} className="menu-item" onClick={() => navigate(menu.path)}>
              {menu.icon}
              {open && <span className="menu-text">{menu.name}</span>}
            </div>
          ))}

          {/* Settings Menu */}
          <div>
            <div className="settings-header" onClick={() => setShowSettings(!showSettings)}>
              <div className="settings-icon-label">
                {settingsMenu.icon}
                {open && <span className="menu-text">{settingsMenu.name}</span>}
              </div>
              {open && (
                <span>
                  {showSettings ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </span>
              )}
            </div>

            {showSettings && open && (
              <div className="settings-submenu">
                {settingsMenu.children.map((submenu, idx) => (
                  <div key={idx} className="settings-submenu-item" onClick={() => navigate(submenu.path)}>
                    {submenu.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notification Menu */}
          <div>
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
          </div>
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
