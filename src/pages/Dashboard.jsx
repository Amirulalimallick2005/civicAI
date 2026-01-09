import React from 'react';
import { 
  FileText, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Users,
  TrendingUp,
  Bell
} from 'lucide-react';
import StatsCard from './StatsCard';
import MapView from './MapView';

// --- MANUAL CSS BLOCK ---
const dashboardStyles = (
  <style>{`
    .dashboard-wrapper {
      padding: 2rem;
      background-color: #f8fafc;
      min-height: 100vh;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
    .page-header { margin-bottom: 2rem; }
    .page-title { font-size: 1.875rem; font-weight: 700; color: #0f172a; margin: 0; }
    .page-subtitle { color: #64748b; margin-top: 0.25rem; }
    
    .metrics-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
      gap: 1.5rem; 
      margin-bottom: 2rem; 
    }
    
    .content-layout { 
      display: grid; 
      grid-template-columns: 2fr 1fr; 
      gap: 1.5rem; 
      margin-bottom: 2rem; 
    }
    
    .panel { 
      background: white; 
      border-radius: 0.75rem; 
      border: 1px solid #e2e8f0; 
      box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
      overflow: hidden; 
    }
    .panel-header { 
      background: #f8fafc; 
      padding: 1rem 1.5rem; 
      border-bottom: 1px solid #e2e8f0; 
      display: flex; 
      align-items: center; 
      gap: 0.75rem; 
    }
    .panel-title { font-weight: 600; color: #0f172a; margin: 0; }
    
    .alert-list { max-height: 384px; overflow-y: auto; }
    .alert-item { padding: 1rem; border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }
    .alert-item:hover { background: #fcfcfd; }
    
    .worker-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
      gap: 1rem; 
      padding: 1.5rem; 
    }
    .worker-card { 
      background: #f8fafc; 
      padding: 1rem; 
      border-radius: 0.5rem; 
      border: 1px solid #e2e8f0; 
    }
    
    .btn-blue {
      background: #2563eb;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.2s;
    }
    .btn-blue:hover { background: #1d4ed8; }

    @media (max-width: 1024px) {
      .content-layout { grid-template-columns: 1fr; }
    }
  `}</style>
);

// Mock data
const mockMapMarkers = [
  { id: 'ISS-001', lat: 28.5355, lng: 77.3910, type: 'Pothole', status: 'Pending' },
  { id: 'ISS-002', lat: 28.5365, lng: 77.3920, type: 'Streetlight', status: 'In Progress' },
  { id: 'ISS-003', lat: 28.5345, lng: 77.3900, type: 'Garbage', status: 'Assigned' },
  { id: 'ISS-004', lat: 28.5375, lng: 77.3930, type: 'Water Leak', status: 'Resolved' },
  { id: 'ISS-005', lat: 28.5335, lng: 77.3890, type: 'Drainage', status: 'Pending' },
];

const recentAlerts = [
  { id: 1, type: 'SLA Breach', message: 'Issue CVC-2026-00234 has exceeded SLA time limit', time: '5 minutes ago', severity: 'critical' },
  { id: 2, type: 'High Priority', message: 'New critical pothole reported in Zone A', time: '12 minutes ago', severity: 'high' },
  { id: 3, type: 'Worker Update', message: 'Rajesh Kumar completed issue CVC-2026-00198', time: '25 minutes ago', severity: 'normal' },
  { id: 4, type: 'Escalation', message: 'Issue CVC-2026-00187 escalated to supervisor', time: '1 hour ago', severity: 'high' }
];

const workerStatus = [
  { name: 'Rajesh Kumar', status: 'Available', tasks: 2, zone: 'Zone A' },
  { name: 'Priya Sharma', status: 'Busy', tasks: 4, zone: 'Zone B' },
  { name: 'Amit Patel', status: 'Available', tasks: 1, zone: 'Zone A' },
  { name: 'Sunita Verma', status: 'Busy', tasks: 3, zone: 'Zone C' },
];

export default function Dashboard({ department }) {
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="dashboard-wrapper">
      {dashboardStyles}
      
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Department Dashboard</h1>
        <p className="page-subtitle">Command center for {department || "General Administration"}</p>
      </div>

      {/* Top Metrics */}
      <div className="metrics-grid">
        <StatsCard
          title="Total Issues"
          value="147"
          icon={FileText}
          trend="+12%"
          trendUp={true}
          bgColor="from-blue-50 to-blue-100"
          iconColor="text-blue-600"
          textColor="text-blue-900"
        />
        <StatsCard
          title="Pending"
          value="23"
          icon={Clock}
          bgColor="from-orange-50 to-orange-100"
          iconColor="text-orange-600"
          textColor="text-orange-900"
        />
        <StatsCard
          title="In Progress"
          value="45"
          icon={TrendingUp}
          bgColor="from-yellow-50 to-yellow-100"
          iconColor="text-yellow-600"
          textColor="text-yellow-900"
        />
        <StatsCard
          title="SLA Breached"
          value="8"
          icon={AlertTriangle}
          trend="-3 vs yesterday"
          trendUp={false}
          bgColor="from-red-50 to-red-100"
          iconColor="text-red-600"
          textColor="text-red-900"
        />
      </div>

      {/* Main Content Grid */}
      <div className="content-layout">
        <div className="map-panel">
          <MapView markers={mockMapMarkers || []} />
        </div>

        {/* Recent Alerts Panel */}
        <div className="panel">
          <div className="panel-header">
            <Bell size={20} color="#ea580c" />
            <h3 className="panel-title">Recent Alerts</h3>
          </div>
          
          <div className="alert-list">
            {recentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`alert-item border-l-4 ${getSeverityColor(alert.severity)}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: '#475569' }}>
                    {alert.type}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{alert.time}</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155' }}>{alert.message}</p>
              </div>
            ))}
          </div>
          
          <div style={{ padding: '0.75rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
            <button style={{ border: 'none', background: 'none', color: '#2563eb', fontSize: '0.875rem', cursor: 'pointer' }}>
              View All Alerts →
            </button>
          </div>
        </div>
      </div>

      {/* Worker Availability Summary */}
      <div className="panel">
        <div className="panel-header">
          <Users size={20} color="#2563eb" />
          <h3 className="panel-title">Worker Availability</h3>
        </div>
        
        <div className="worker-grid">
          {workerStatus.map((worker, index) => (
            <div key={index} className="worker-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', background: '#dbeafe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                  <Users size={16} color="#2563eb" />
                </div>
                <span style={{ 
                  fontSize: '0.7rem', 
                  padding: '2px 8px', 
                  borderRadius: '12px',
                  background: worker.status === 'Available' ? '#dcfce7' : '#fef9c3',
                  color: worker.status === 'Available' ? '#15803d' : '#854d0e'
                }}>
                  {worker.status}
                </span>
              </div>
              <p style={{ margin: '0 0 2px 0', fontSize: '0.875rem', fontWeight: '600' }}>{worker.name}</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '0.75rem', color: '#64748b' }}>{worker.zone}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#64748b' }}>
                <CheckCircle size={12} />
                <span>{worker.tasks} active tasks</span>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-blue">Manage All Workers →</button>
        </div>
      </div>
    </div>
  );
}