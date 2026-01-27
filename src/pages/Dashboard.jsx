import React, { useState, useEffect, useCallback } from 'react';
import { 
  FileText, Clock, AlertTriangle, CheckCircle, 
  Users, TrendingUp, Bell, Map as MapIcon, 
  Download, MoreVertical, X, MapPin, Search,
  Filter
} from 'lucide-react';
import StatsCard from './StatsCard';
import MapView from './MapView';
import IssueTable from './IssueTable';

const dashboardStyles = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    
    .dashboard-wrapper {
      background: transparent; 
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #0f172a;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    .glass-panel {
      background: #ffffff;
      border-radius: 16px;
      border: 1px solid rgba(226, 232, 240, 0.8);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .header-flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      flex-shrink: 0;
    }

    .page-title { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin: 0; letter-spacing: -0.025em; }
    .page-subtitle { color: #64748b; font-size: 0.85rem; font-weight: 500; margin: 0; }

    .main-layout {
      display: grid;
      grid-template-columns: 1.3fr 1fr; 
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      align-items: start;
    }

    .map-header, .feed-header {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .map-visual-container {
      position: relative;
      height: 450px;
      margin: 0;
      overflow: hidden;
    }

    .alert-list { 
      height: 450px; 
      overflow-y: auto; 
    }
    
    .alert-item {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #f8fafc;
      transition: all 0.2s ease;
      border-left: 4px solid transparent;
    }
    .alert-item:hover { background: #f8fafc; border-left-color: #3b82f6; }

    .notification-banner {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #0f172a;
      color: white;
      padding: 0.8rem 1.2rem;
      border-radius: 12px;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
    }

    .notif-container { position: relative; }
    .notif-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      background: #ef4444;
      color: white;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 5px;
      border-radius: 10px;
      border: 2px solid white;
    }
    .notif-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 320px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      z-index: 1100;
      display: flex;
      flex-direction: column;
    }
    .notif-item-dropdown {
      padding: 12px 16px;
      border-bottom: 1px solid #f1f5f9;
      cursor: pointer;
    }
    .notif-item-dropdown:hover { background: #f8fafc; }

    .badge {
      font-size: 0.65rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
    }

    .pulse {
      width: 8px;
      height: 8px;
      background: #ef4444;
      border-radius: 50%;
      animation: shadowPulse 2s infinite;
    }

    @keyframes shadowPulse {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }

    .action-btn {
      background: #2563eb;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .worker-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    @media (max-width: 1200px) { 
        .main-layout { grid-template-columns: 1fr; }
    }
  `}</style>
);

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newIssueAlert, setNewIssueAlert] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Use .trim() to prevent empty space mismatches in IssueTable worker filters
  const department = (localStorage.getItem("authDept") || "Garbage").trim();

  const fetchReports = useCallback(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/authority/reports/${encodeURIComponent(department)}`);
      let data = await response.json();

      if (data.length === 0) {
        const fallback = await fetch(`http://127.0.0.1:8000/authority/reports/${encodeURIComponent(department.toLowerCase())}`);
        if (fallback.ok) {
          const fallbackData = await fallback.json();
          if (fallbackData.length > 0) data = fallbackData;
        }
      }
      
      setReports(prevReports => {
        if (prevReports.length > 0 && data.length > prevReports.length) {
          const newItems = data.filter(newItem => !prevReports.some(oldItem => oldItem.id === newItem.id));
          if (newItems.length > 0) {
            const newNotifs = newItems.map(item => ({
              id: item.id,
              title: `New Incident: ${department}`,
              desc: `${item.ai_prediction} at ${item.address.split(',')[0]}`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }));
            setNotifications(prev => [...newNotifs, ...prev]);
            setUnreadCount(prev => prev + newNotifs.length);
            setNewIssueAlert(true);
            setTimeout(() => setNewIssueAlert(false), 8000);
          }
        }
        return data;
      });
      setLoading(false);
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
      setLoading(false);
    }
  }, [department]);

  const updateReportStatus = async (reportId, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/authority/reports/update/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) fetchReports();
    } catch (error) {
      console.error("Status Update Error:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchReports();
    const interval = setInterval(fetchReports, 5000);
    return () => clearInterval(interval);
  }, [fetchReports]);

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return { bg: '#fee2e2', text: '#991b1b' };
      case 'medium': return { bg: '#fef3c7', text: '#92400e' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'Pending').length,
    active: reports.filter(r => r.status === 'In Progress').length,
    resolved: reports.filter(r => r.status === 'Resolved').length
  };

  return (
    <div className="dashboard-wrapper">
      {dashboardStyles}
      
      {newIssueAlert && (
        <div className="notification-banner">
          <Bell size={18} color="#60a5fa" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>New Incident Reported</span>
          <X size={16} onClick={() => setNewIssueAlert(false)} style={{ cursor: 'pointer', opacity: 0.6 }} />
        </div>
      )}

      <div className="header-flex">
        <div>
          <h1 className="page-title">{department} Command Center</h1>
          <p className="page-subtitle">Real-time resource orchestration and incident monitoring</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="notif-container">
            <button 
              className="glass-panel" 
              onClick={() => { setShowDropdown(!showDropdown); setUnreadCount(0); }}
              style={{ padding: '10px', cursor: 'pointer', position: 'relative', flexDirection: 'row', justifyContent: 'center' }}
            >
              <Bell size={20} color={unreadCount > 0 ? "#2563eb" : "#64748b"} />
              {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
            </button>

            {showDropdown && (
              <div className="notif-dropdown">
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Notifications</span>
                  <X size={14} onClick={() => setShowDropdown(false)} style={{ cursor: 'pointer' }} />
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {notifications.length > 0 ? notifications.map((n, i) => (
                    <div key={i} className="notif-item-dropdown">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e293b' }}>{n.title}</span>
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{n.time}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{n.desc}</p>
                    </div>
                  )) : (
                    <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>No new notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="glass-panel" style={{ padding: '8px 12px', flexDirection: 'row', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}>
            <Download size={14} /> Export Data
          </button>
          <button className="action-btn">
              <TrendingUp size={14} /> Performance Insights
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatsCard title="Total Reports" value={stats.total} icon={FileText} bgColor="from-blue-500/10 to-transparent" iconColor="text-blue-600" />
        <StatsCard title="Action Required" value={stats.pending} icon={Clock} bgColor="from-rose-500/10 to-transparent" iconColor="text-rose-600" />
        <StatsCard title="In Progress" value={stats.active} icon={AlertTriangle} bgColor="from-amber-500/10 to-transparent" iconColor="text-amber-600" />
        <StatsCard title="Completed" value={stats.resolved} icon={CheckCircle} bgColor="from-emerald-500/10 to-transparent" iconColor="text-emerald-600" />
      </div>

      <div className="main-layout">
        <div className="glass-panel">
          <div className="map-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapIcon size={18} color="#2563eb" />
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>Geographic Heatmap</h3>
            </div>
            <span style={{ background: '#eff6ff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, color: '#2563eb', border: '1px solid #dbeafe' }}>
              {reports.length} Active Incidents
            </span>
          </div>
          <div className="map-visual-container">
            <MapView 
              markers={reports.map(r => ({
                id: r.id, lat: parseFloat(r.latitude), lng: parseFloat(r.longitude),
                type: r.ai_prediction, status: r.status, severity: r.severity, address: r.address 
              }))} 
              onStatusUpdate={updateReportStatus}
            />
          </div>
        </div>

        <div className="glass-panel">
          <div className="feed-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="pulse"></div>
              <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>Live Incident Stream</h3>
            </div>
            <Filter size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
          </div>
          <div className="alert-list">
            {loading ? (
                <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                   <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Loading {department} records...</p>
                </div>
            ) : reports.length > 0 ? (
              [...reports].reverse().map((report) => {
                const sev = getSeverityStyle(report.severity);
                return (
                  <div key={report.id} className="alert-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#3b82f6' }}>INC-{report.id.toString().slice(-4).toUpperCase()}</span>
                      <span className="badge" style={{ backgroundColor: sev.bg, color: sev.text }}>{report.severity || 'Normal'}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>{report.ai_prediction}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', color: '#64748b' }}>
                      <MapPin size={10} />
                      <p style={{ margin: 0, fontSize: '0.7rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{report.address}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <Search size={32} color="#e2e8f0" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>No issues currently reported for {department}.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- CRITICAL: THE INCIDENT MANAGEMENT TABLE --- */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <FileText size={18} color="#2563eb" />
          <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>Manage Incident Reports</h3>
        </div>
        <IssueTable 
          issues={reports} 
          onRefresh={fetchReports} 
          currentDepartment={department} 
        />
      </div>

      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="#2563eb" />
            <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1rem' }}>Personnel Deployment Status</h3>
          </div>
        </div>
        <div className="worker-grid">
            {[
                { name: 'Rajesh Kumar', status: 'Active', zone: 'Sector A-1' },
                { name: 'Suresh Raina', status: 'Active', zone: 'Central Plaza' },
                { name: 'Ananya Iyer', status: 'Active', zone: 'North Park' },
                { name: 'Vikram Singh', status: 'Active', zone: 'Industrial Area' },
            ].map((worker, index) => (
            <div key={index} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800 }}>{worker.name}</p>
                <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>{worker.status}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{worker.zone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}