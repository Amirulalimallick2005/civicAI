import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCircle, Eye } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      
      <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center' }}>How would you like to <span style={{ color: '#0ea5e9' }}>Proceed?</span></h2>
      <p style={{ color: '#94a3b8', marginBottom: '40px', textAlign: 'center' }}>Select your account type to continue to the Civic AI platform.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '1000px', width: '100%' }}>
        
        {/* Card 1: Authority */}
        <div onClick={() => navigate('/authority')} style={cardStyle}>
          <ShieldCheck size={48} color="#0ea5e9" />
          <h3 style={{ margin: '15px 0 10px' }}>Authority Portal</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>For government officials and municipal workers to manage and resolve issues.</p>
          <button style={btnStyle}>Login as Authority</button>
        </div>

        {/* Card 2: Citizen/User - CONNECTED TO YOUR NEW LOGIN */}
        <div onClick={() => navigate('/citizen-login')} style={cardStyle}>
          <UserCircle size={48} color="#0ea5e9" />
          <h3 style={{ margin: '15px 0 10px' }}>Citizen Report</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Report local issues like potholes or streetlights and track their status.</p>
          <button style={btnStyle}>Login / Sign Up</button>
        </div>

        {/* Card 3: Guest/Viewer */}
        <div onClick={() => navigate('/feed')} style={cardStyle}>
          <Eye size={48} color="#0ea5e9" />
          <h3 style={{ margin: '15px 0 10px' }}>Public Feed</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>View ongoing improvements in your city without creating an account.</p>
          <button style={{ ...btnStyle, background: 'transparent', border: '1px solid #1e293b' }}>Skip to Feed</button>
        </div>

      </div>
    </div>
  );
};

// Styles for the cards
const cardStyle = {
  background: '#0f172a',
  padding: '30px',
  borderRadius: '20px',
  border: '1px solid #1e293b',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const btnStyle = {
  marginTop: '20px',
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#0ea5e9',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default RoleSelection;