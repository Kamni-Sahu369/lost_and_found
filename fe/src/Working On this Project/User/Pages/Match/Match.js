import React from 'react';
import { Card, Button, Tag } from 'antd';
import {
  CloseOutlined,
  HeartFilled,
  StarFilled,
  RedoOutlined,
  SendOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import './Match.css';

function Match() {
  return (
    <div className="tinder-wrapper">
      <div className="profile-card">
        <img
          src="https://via.placeholder.com/400x700" // Replace with actual image URL
          alt="profile"
          className="profile-image"
        />

        {/* <div className="profile-info">
          <Tag color="green">Nearby</Tag>
          <h2>Advika Sharma <span>20</span></h2>
          <p><EnvironmentOutlined /> 1 km away</p>
        </div> */}
      </div>

      <div className="action-buttons">
        <Button shape="circle" className="action-btn">
          <RedoOutlined />
        </Button>
        <Button shape="circle" className="action-btn cancel">
          <CloseOutlined />
        </Button>
        <Button shape="circle" className="action-btn star">
          <StarFilled />
        </Button>
        <Button shape="circle" className="action-btn like">
          <HeartFilled />
        </Button>
        <Button shape="circle" className="action-btn send">
          <SendOutlined />
        </Button>
      </div>
    </div>
  );
}

export default Match;
