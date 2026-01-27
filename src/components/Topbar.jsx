import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LogOut } from 'lucide-react';

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
    
    /* Left side made much wider to accommodate long search bar */
    .topbar-left { flex: 1; display: flex; align-items: center; }
    
    .search-wrapper { 
      display: flex; 
      align-items: center; 
      background: #f1f5f9; 
      padding: 10px 16px; 
      border-radius: 10px; 
      /* Increased width and max-width for a more expansive look */
      width: 100%;
      max-width: 600px; 
      gap: 12px;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }
    
    .search-wrapper:focus-within {
      background: white;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .search-input { 
      border: none; 
      background: transparent; 
      outline: none; 
      font-size: 14px; 
      width: 100%; 
      color: #1e293b;
    }

    .topbar-right { 
      display: flex; 
      align-items: center; 
      padding-left: 2rem;
    }
    
    .user-profile { 
      display: flex; 
      align-items: center; 
      gap: 12px; 
      padding: 6px 12px;
      border-radius: 10px;
    }
    
    .avatar { 
      width: 36px; 
      height: 36px; 
      background: linear-gradient(135deg, #2563eb, #1d4ed8); 
      color: white; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      font-weight: bold; 
      font-size: 13px; 
      box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
    }
    
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: 13px; font-weight: 700; color: #0f172a; }
    .user-role { font-size: 11px; color: #64748b; font-weight: 500; }
    
    .logout-btn { 
      margin-left: 8px;
      color: #94a3b8; 
      cursor: pointer; 
      background: none; 
      border: none; 
      padding: 8px; 
      border-radius: 8px;
      transition: all 0.2s;
    }
    
    .logout-btn:hover { 
      color: #ef4444; 
      background: #fef2f2;
    }
  `}</style>
);

const Topbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("authEmail") || "Authority Admin";
  // Get first letter or email prefix for avatar
  const displayName = adminEmail.split('@')[0];

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
          <Search size={18} color="#64748b" strokeWidth={2.5} />
          <input 
            type="text" 
            placeholder="Search by Incident ID, Address, or Status..." 
            className="search-input" 
          />
        </div>
      </div>
      
      <div className="topbar-right">
        <div className="user-profile">
          <div className="avatar">
            {displayName.substring(0, 2).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{displayName}</span>
            <span className="user-role">Authorized Personnel</span>
          </div>
          <button onClick={handleLogout} className="logout-btn" title="Sign Out">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;