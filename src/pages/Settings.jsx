import React, { useState } from 'react';
import { 
  Building, Mail, Phone, Cpu, Clock, ShieldCheck, 
  Save, LogOut, ChevronRight, Activity, Bell 
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // This would come from your Auth context/localStorage
  const activeDept = "Electricity"; 

  // Function to redirect to landing page
  const handleExit = () => {
    window.location.href = "/"; // Redirects to your landing page
  };

  // Inline styles to guarantee it doesn't look broken across different environments
  const styles = {
    container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' },
    sidebar: { width: '280px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '24px', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' },
    main: { flex: 1, padding: '40px', overflowY: 'auto' },
    card: { backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '24px' },
    tabBtn: (isActive) => ({
      display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '14px 16px', borderRadius: '12px',
      fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: '0.2s',
      backgroundColor: isActive ? '#2563eb' : 'transparent',
      color: isActive ? '#ffffff' : '#64748b',
      boxShadow: isActive ? '0 10px 15px -3px rgba(37, 99, 235, 0.2)' : 'none',
      marginBottom: '8px'
    }),
    input: { width: '100%', padding: '12px 16px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '14px', outline: 'none' },
    label: { display: 'block', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' },
    exitBtn: {
      display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '16px', 
      borderRadius: '12px', fontSize: '14px', fontWeight: '700', border: 'none', cursor: 'pointer',
      color: '#ef4444', backgroundColor: 'transparent', marginTop: 'auto', borderTop: '1px solid #f1f5f9',
      transition: '0.2s'
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. Sidebar specific to the Department */}
      <div style={styles.sidebar}>
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '10px', fontWeight: '900', color: '#2563eb', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>Authority Control</p>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{activeDept} Branch</h2>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => setActiveTab('profile')} style={styles.tabBtn(activeTab === 'profile')}><Building size={18} /> Dept Profile</button>
          <button onClick={() => setActiveTab('dispatch')} style={styles.tabBtn(activeTab === 'dispatch')}><Cpu size={18} /> AI Dispatch</button>
          <button onClick={() => setActiveTab('sla')} style={styles.tabBtn(activeTab === 'sla')}><Clock size={18} /> Service Deadlines</button>
          <button onClick={() => setActiveTab('security')} style={styles.tabBtn(activeTab === 'security')}><ShieldCheck size={18} /> Access & Logs</button>
        </nav>

        {/* Exit Button Redirecting to Landing Page */}
        <button 
          onClick={handleExit} 
          style={styles.exitBtn}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={18} /> Exit System
        </button>
      </div>

      {/* 2. Main Content Area */}
      <div style={styles.main}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', letterSpacing: '-1px', margin: 0 }}>Settings</h1>
            <p style={{ color: '#64748b', fontWeight: '500', marginTop: '4px', margin稳定: 0 }}>Configuration for {activeDept} operational protocols.</p>
          </div>
          <button style={{ backgroundColor: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Save size={18} /> Save Changes
          </button>
        </div>

        {/* PROFILE SECTION */}
        {activeTab === 'profile' && (
          <div style={styles.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <Activity color="#2563eb" size={24} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Communication Channels</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <label style={styles.label}>Division Response Email</label>
                <input style={styles.input} type="email" defaultValue="power.ops@city.gov" />
              </div>
              <div>
                <label style={styles.label}>Emergency Line</label>
                <input style={styles.input} type="tel" defaultValue="+91 88000 11111" />
              </div>
            </div>
          </div>
        )}

        {/* DISPATCH SECTION */}
        {activeTab === 'dispatch' && (
          <div style={styles.card}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px', margin稳定: 0 }}>AI Dispatch Sensitivity</h3>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '32px', margin稳定: 0 }}>Adjust the minimum confidence score for auto-routing issues.</p>
            
            <div style={{ padding: '32px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#475569' }}>CONFIDENCE THRESHOLD</span>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#2563eb' }}>85%</span>
              </div>
              <input type="range" style={{ width: '100%', cursor: 'pointer' }} defaultValue="85" />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8' }}>LOW</span>
                <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8' }}>HIGH</span>
              </div>
            </div>
          </div>
        )}

        {/* SLA SECTION */}
        {activeTab === 'sla' && (
          <div style={styles.card}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', margin稳定: 0 }}>Service Level Deadlines</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Critical', 'High', 'Standard'].map((level) => (
                <div key={level} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                  <span style={{ fontWeight: '700', color: '#334155' }}>{level} Priority</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="number" defaultValue={level === 'Critical' ? 4 : 24} style={{ ...styles.input, width: '80px', textAlign: 'center' }} />
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8' }}>HRS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECURITY PLACEHOLDER */}
        {activeTab === 'security' && (
          <div style={styles.card}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px', margin稳定: 0 }}>Access Control</h3>
            <p style={{ fontSize: '14px', color: '#64748b' }}>Security logs and permission management for {activeDept} personnel.</p>
          </div>
        )}
      </div>
    </div>
  );
}