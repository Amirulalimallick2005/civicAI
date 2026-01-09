import React from 'react';
import { 
  LayoutDashboard, FileText, Users, BarChart3, AlertCircle, Settings, Shield 
} from 'lucide-react';

const sidebarStyles = (
  <style>{`
    .sidebar-container {
      width: 260px;
      background: white;
      border-right: 1px solid #e2e8f0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      font-family: sans-serif;
    }
    .sidebar-header { padding: 1.5rem; border-bottom: 1px solid #f1f5f9; }
    .logo-box { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb, #06b6d4); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; }
    .dept-badge { background: #eff6ff; border: 1px solid #dbeafe; padding: 8px; border-radius: 8px; }
    .nav-menu { flex: 1; padding: 1rem; display: flex; flex-direction: column; gap: 4px; }
    .nav-btn { 
      width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px 16px; 
      border-radius: 8px; border: none; background: transparent; cursor: pointer; 
      color: #64748b; transition: 0.2s; font-size: 14px;
    }
    .nav-btn:hover { background: #f8fafc; color: #0f172a; }
    .nav-btn.active { background: #eff6ff; color: #2563eb; font-weight: 600; border: 1px solid #dbeafe; }
    .sidebar-footer { padding: 1rem; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; text-align: center; }
  `}</style>
);

export default function Sidebar({ currentPage, onNavigate, department }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'issues', label: 'Issues', icon: FileText },
    { id: 'workers', label: 'Workers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'sla', label: 'SLA', icon: AlertCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="sidebar-container">
      {sidebarStyles}
      <div className="sidebar-header">
        <div className="logo-box">
          <div className="logo-icon"><Shield size={24} /></div>
          <div>
            <div style={{ fontWeight: 'bold', color: '#0f172a' }}>CivicConnect</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Authority Portal</div>
          </div>
        </div>
        {department && (
          <div className="dept-badge">
            <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: 'bold', textTransform: 'uppercase' }}>Department</div>
            <div style={{ fontSize: '13px', color: '#1e3a8a', fontWeight: '500' }}>{department}</div>
          </div>
        )}
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate && onNavigate(item.id)}
              className={`nav-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">© 2026 CivicConnect</div>
    </div>
  );
}