import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Clock, CheckCircle2, 
  CircleDot, AlertCircle, ChevronLeft, Building2, ExternalLink
} from 'lucide-react';

const TrackComplaint = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data representing what would come from your PostgreSQL database
  const [complaints] = useState([
    {
      id: "CVC-2026-BLR-84291",
      date: "06 Jan 2026",
      type: "Garbage Overflow",
      status: "In Progress",
      address: "MG Road, Sector 14, Bangalore",
      department: "Solid Waste Management",
      updates: [
        { status: "Resolved", date: "Pending", desc: "Issue will be closed after inspection.", completed: false },
        { status: "In Progress", date: "07 Jan", desc: "Clean-up crew dispatched to location.", completed: true },
        { status: "In Review", date: "06 Jan", desc: "Report assigned to department head.", completed: true },
        { status: "Submitted", date: "06 Jan", desc: "Report received via CivicAI platform.", completed: true },
      ]
    }
  ]);

  const colors = {
    primary: '#0086C9',
    success: '#10b981',
    warning: '#f59e0b',
    textMain: '#101828',
    textSecondary: '#667085',
    border: '#EAECF0',
    bgLight: '#F9FAFB'
  };

  return (
    <div style={{ background: colors.bgLight, minHeight: '100vh', padding: '40px 20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <button 
              onClick={() => navigate('/citizen-portal')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: colors.textSecondary, cursor: 'pointer', marginBottom: '12px', fontWeight: '500' }}
            >
              <ChevronLeft size={18} /> Back to Dashboard
            </button>
            <h1 style={{ fontSize: '30px', fontWeight: '700', color: colors.textMain, margin: 0 }}>Track Your Complaints</h1>
          </div>
          <Building2 size={40} color={colors.primary} style={{ opacity: 0.2 }} />
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '40px' }}>
          <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: colors.textSecondary }} size={20} />
          <input 
            type="text"
            placeholder="Search by Reference ID or Issue Type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '16px 16px 16px 50px', borderRadius: '14px', border: `1px solid ${colors.border}`, fontSize: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', outline: 'none' }}
          />
        </div>

        {/* Complaints List */}
        {complaints.map((complaint) => (
          <div key={complaint.id} style={{ background: 'white', borderRadius: '20px', border: `1px solid ${colors.border}`, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
            
            {/* Top Info Bar */}
            <div style={{ padding: '24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '700', fontSize: '18px', color: colors.textMain }}>{complaint.type}</span>
                  <span style={{ background: '#EFF8FF', color: colors.primary, fontSize: '12px', padding: '4px 12px', borderRadius: '16px', fontWeight: '600' }}>{complaint.status}</span>
                </div>
                <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: colors.textSecondary }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Hash size={14} /> {complaint.id}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> {complaint.date}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: '14px', color: colors.textSecondary }}>
                <div style={{ fontWeight: '600', color: colors.textMain }}>{complaint.department}</div>
                <div>Assigned Department</div>
              </div>
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', padding: '24px' }}>
              
              {/* Timeline Section */}
              <div>
                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: colors.textSecondary, marginBottom: '20px' }}>Resolution Timeline</h3>
                <div style={{ paddingLeft: '8px' }}>
                  {complaint.updates.map((step, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '24px', position: 'relative' }}>
                      {/* Vertical Line */}
                      {index !== complaint.updates.length - 1 && (
                        <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-24px', width: '2px', background: step.completed ? colors.success : colors.border }} />
                      )}
                      
                      <div style={{ zIndex: 1, background: 'white', color: step.completed ? colors.success : colors.textSecondary }}>
                        {step.completed ? <CheckCircle2 size={24} /> : <CircleDot size={24} style={{ opacity: 0.5 }} />}
                      </div>
                      
                      <div>
                        <div style={{ fontWeight: '700', color: colors.textMain, fontSize: '15px' }}>{step.status}</div>
                        <div style={{ fontSize: '13px', color: colors.textSecondary }}>{step.desc}</div>
                        <div style={{ fontSize: '12px', color: colors.primary, marginTop: '4px', fontWeight: '600' }}>{step.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Detail Section */}
              <div style={{ background: colors.bgLight, borderRadius: '16px', padding: '20px', border: `1px solid ${colors.border}` }}>
                <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: colors.textSecondary, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} /> Location Details
                </h3>
                <p style={{ fontSize: '15px', color: colors.textMain, fontWeight: '500', marginBottom: '12px', lineHeight: '1.4' }}>{complaint.address}</p>
                
                <div style={{ background: '#e2e8f0', height: '120px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '13px', border: '1px solid #cbd5e1' }}>
                  <MapPin size={24} style={{ marginRight: '8px' }} /> Map Preview Available in Portal
                </div>

                <button style={{ width: '100%', marginTop: '16px', padding: '12px', borderRadius: '10px', border: 'none', background: 'white', border: `1px solid ${colors.border}`, color: colors.textMain, fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                  View Full Evidence <ExternalLink size={16} />
                </button>
              </div>

            </div>

            {/* Footer Alert */}
            <div style={{ padding: '16px 24px', background: '#FFFAEB', borderTop: '1px solid #FEDF89', display: 'flex', alignItems: 'center', gap: '12px', color: '#B54708', fontSize: '14px' }}>
              <AlertCircle size={18} />
              <span>Response time for this department is usually 24-48 hours.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Hash component as Lucide icon sometimes varies
const Hash = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
);

export default TrackComplaint;