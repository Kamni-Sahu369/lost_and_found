import React, { useEffect, useState } from 'react';
import { Badge, Dropdown, List, Avatar, Typography, message as antdMessage } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Notification.css';

const { Text } = Typography;

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/api/notifications/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotifications(res.data);
    } catch (err) {
      antdMessage.error('Failed to load notifications');
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/`, { is_read: true }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchNotifications();
    } catch (err) {
      antdMessage.error('Failed to mark as read');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const dropdownContent = (
    <div className="notification-dropdown">
      <List
        dataSource={notifications}
        locale={{ emptyText: 'No notifications' }}
        renderItem={(item) => (
          <List.Item
            className="notification-item"
            onClick={() => markAsRead(item.id)}
            style={{ backgroundColor: item.is_read ? '#fff' : '#f0f5ff', cursor: 'pointer' }}
          >
            <List.Item.Meta
              avatar={<Avatar icon={<BellOutlined />} style={{ backgroundColor: '#1890ff' }} />}
              title={<Text strong>{item.title}</Text>}
              description={item.message}
            />
            <div className="notification-time">
              {new Date(item.created_at).toLocaleString()}
            </div>
          </List.Item>
        )}
      />
    </div>
  );

  return (
    <Dropdown overlay={dropdownContent} trigger={['click']} placement="bottomRight" arrow>
      <Badge count={unreadCount} offset={[-5, 5]}>
        <BellOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />
      </Badge>
    </Dropdown>
  );
};

export default NotificationPanel;
