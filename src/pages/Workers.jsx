import React, { useState } from 'react';
import { Users, UserPlus, MapPin, Phone, CheckCircle, Award, X, Briefcase } from 'lucide-react';

// --- INTERNAL CSS BLOCK ---
const workersStyles = (
  <style>{`
    .workers-page { font-family: 'Inter', sans-serif; color: #1e293b; }
    
    .header-flex { 
      display: flex; justify-content: space-between; align-items: center; 
      margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;
    }
    .header-icon-box { 
      background: #2563eb; padding: 10px; border-radius: 10px; 
      display: flex; align-items: center; justify-content: center;
    }
    .add-worker-btn {
      background: #2563eb; color: white; border: none; padding: 12px 20px;
      border-radius: 12px; font-weight: 600; cursor: pointer; display: flex;
      align-items: center; gap: 8px; transition: 0.2s;
    }
    .add-worker-btn:hover { background: #1d4ed8; }

    /* Grid Layout */
    .workers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    /* Worker Card */
    .worker-card {
      background: white; border-radius: 20px; padding: 1.5rem;
      border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
    .avatar-box { 
      width: 56px; height: 56px; background: #f1f5f9; border-radius: 16px;
      display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700;
    }
    .status-badge {
      font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 20px;
      text-transform: uppercase; border: 1px solid transparent;
    }

    /* Stats Row */
    .worker-stats-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem; }
    .stat-pill { padding: 12px; border-radius: 12px; border: 1px solid #f1f5f9; }
    .stat-label { font-size: 10px; font-weight: 800; margin-bottom: 4px; text-transform: uppercase; }
    
    /* Modal */
    .modal-overlay {
      position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px); display: flex; align-items: center; 
      justify-content: center; z-index: 999; padding: 20px;
    }
    .modal-content {
      background: white; border-radius: 24px; width: 100%; max-width: 500px;
      padding: 2rem; position: relative; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }
    .close-btn { 
      position: absolute; top: 20px; right: 20px; background: none; 
      border: none; cursor: pointer; color: #94a3b8; 
    }
  `}</style>
);

const mockWorkers = [
  { id: 'WK-001', name: 'Rajesh Kumar', phone: '+91 98765 43210', zone: 'Zone A', availability: 'Available', activeTasks: 2, issuesResolved: 47, avgResolutionTime: '2.5 days' },
  { id: 'WK-002', name: 'Priya Sharma', phone: '+91 98765 43211', zone: 'Zone B', availability: 'Busy', activeTasks: 4, issuesResolved: 62, avgResolutionTime: '1.8 days' },
  { id: 'WK-003', name: 'Amit Patel', phone: '+91 98765 43212', zone: 'Zone A', availability: 'Available', activeTasks: 1, issuesResolved: 38, avgResolutionTime: '3.1 days' },
  { id: 'WK-004', name: 'Sunita Verma', phone: '+91 98765 43213', zone: 'Zone C', availability: 'Busy', activeTasks: 3, issuesResolved: 55, avgResolutionTime: '2.2 days' }
];

export default function Workers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Available': return { background: '#dcfce7', color: '#15803d', borderColor: '#bbf7d0' };
      case 'Busy': return { background: '#fef9c3', color: '#854d0e', borderColor: '#fef08a' };
      default: return { background: '#f1f5f9', color: '#475569', borderColor: '#e2e8f0' };
    }
  };

  return (
    <div className="workers-page">
      {workersStyles}
      
      <div className="header-flex">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="header-icon-box"><Users color="white" /></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px' }}>Worker Management</h1>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Field staff performance & tracking</p>
          </div>
        </div>
        <button className="add-worker-btn" onClick={() => setShowAddModal(true)}>
          <UserPlus size={18} /> Add New Worker
        </button>
      </div>

      <div className="workers-grid">
        {mockWorkers.map((worker) => (
          <div key={worker.id} className="worker-card">
            <div className="card-top">
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="avatar-box">{worker.name.charAt(0)}</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px' }}>{worker.name}</h3>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{worker.id}</span>
                </div>
              </div>
              <span className="status-badge" style={getStatusStyle(worker.availability)}>
                {worker.availability}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569' }}>
                <MapPin size={14} /> <b>{worker.zone}</b>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569' }}>
                <Phone size={14} /> {worker.phone}
              </div>
            </div>

            <div className="worker-stats-row">
              <div className="stat-pill" style={{ background: '#eff6ff' }}>
                <div className="stat-label" style={{ color: '#2563eb' }}>Tasks</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                  <Briefcase size={14} color="#3b82f6" /> {worker.activeTasks}
                </div>
              </div>
              <div className="stat-pill" style={{ background: '#f0fdf4' }}>
                <div className="stat-label" style={{ color: '#16a34a' }}>Resolved</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                  <CheckCircle size={14} color="#22c55e" /> {worker.issuesResolved}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setSelectedWorker(worker)}
                style={{ flex: 1, padding: '10px', borderRadius: '10px', background: '#0f172a', color: 'white', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
              >
                View Analytics
              </button>
              <button style={{ padding: '10px', borderRadius: '10px', background: 'white', color: '#475569', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Modal */}
      {selectedWorker && (
        <div className="modal-overlay" onClick={() => setSelectedWorker(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedWorker(null)}><X size={24} /></button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
              <div style={{ background: '#dbeafe', padding: '10px', borderRadius: '12px' }}><Award color="#2563eb" /></div>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Performance Report</h2>
                <p style={{ margin: 0, color: '#64748b' }}>{selectedWorker.name}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <CheckCircle size={20} color="#2563eb" style={{ marginBottom: '10px' }} />
                <div style={{ fontSize: '28px', fontWeight: '800' }}>{selectedWorker.issuesResolved}</div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Total Resolved</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                <Award size={20} color="#0d9488" style={{ marginBottom: '10px' }} />
                <div style={{ fontSize: '28px', fontWeight: '800' }}>{selectedWorker.avgResolutionTime}</div>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Avg Response</div>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedWorker(null)}
              style={{ width: '100%', marginTop: '2rem', padding: '12px', borderRadius: '12px', border: 'none', background: '#f1f5f9', color: '#475569', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Close Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}