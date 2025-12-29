import React, { useState } from 'react';
import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';

const Topbar = () => {
  const [notifications] = useState([
    { id: 1, text: 'New issue reported in Zone 4', time: '5 min ago' },
    { id: 2, text: 'Worker assignment completed', time: '1 hour ago' },
    { id: 3, text: 'System maintenance scheduled', time: '2 hours ago' },
  ]);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search issues, workers, reports..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="topbar-right">
        <button className="topbar-btn help-btn">
          <HelpCircle size={20} />
        </button>
        
        <div className="notification-dropdown">
          <button className="topbar-btn notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <div className="notification-dropdown-content">
            {notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                <div className="notification-text">{notification.text}</div>
                <div className="notification-time">{notification.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="user-dropdown">
          <div className="user-profile">
            <div className="profile-avatar">AD</div>
            <div className="profile-info">
              <span className="profile-name">Authority Department</span>
              <span className="profile-role">Admin Panel</span>
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;