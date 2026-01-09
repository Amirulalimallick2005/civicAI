import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, HelpCircle, LogOut } from 'lucide-react';

const topbarStyles = (
  <style>{`
    .topbar-container {
      height: 64px;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1.5rem;
      position: sticky;
      top: 0;
      z-index: 50;
      font-family: sans-serif;
    }
    .topbar-left { flex: 1; }
    .search-wrapper { 
      display: flex; align-items: center; background: #f1f5f9; 
      padding: 6px 12px; border-radius: 8px; width: 300px; gap: 8px;
    }
    .search-input { border: none; background: transparent; outline: none; font-size: 13px; width: 100%; }
    
    .topbar-right { display: flex; align-items: center; gap: 12px; }
    .icon-btn { 
      background: none; border: none; color: #64748b; cursor: pointer; 
      position: relative; padding: 6px; border-radius: 6px;
    }
    .icon-btn:hover { background: #f8fafc; color: #0f172a; }
    .badge { 
      position: absolute; top: 0; right: 0; background: #ef4444; 
      color: white; font-size: 10px; padding: 2px 5px; border-radius: 10px; 
    }
    
    .user-profile { display: flex; align-items: center; gap: 10px; border-left: 1px solid #e2e8f0; padding-left: 1rem; }
    .avatar { width: 32px; height: 32px; background: #2563eb; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; }
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: 13px; font-weight: 600; color: #0f172a; }
    .user-role { font-size: 11px; color: #64748b; }
    .logout-btn { color: #ef4444; cursor: pointer; background: none; border: none; padding: 5px; }
  `}</style>
);

const Topbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("authEmail") || "Authority Admin";

  const handleLogout = () => {
    localStorage.clear();
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <header className="topbar-container">
      {topbarStyles}
      <div className="topbar-left">
        <div className="search-wrapper">
          <Search size={16} color="#64748b" />
          <input type="text" placeholder="Search reports..." className="search-input" />
        </div>
      </div>
      
      <div className="topbar-right">
        <button className="icon-btn"><HelpCircle size={20} /></button>
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">{adminName.substring(0, 2).toUpperCase()}</div>
          <div className="user-info">
            <span className="user-name">{adminName}</span>
            <span className="user-role">Admin Panel</span>
          </div>
          <button onClick={handleLogout} className="logout-btn" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;