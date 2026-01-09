import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Search, Mail } from 'lucide-react';

const SubmissionSuccess = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#f8fafc',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ 
        maxWidth: '500px', 
        width: '100%', 
        background: 'white', 
        padding: '40px', 
        borderRadius: '24px', 
        textAlign: 'center',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ color: '#10b981', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <CheckCircle size={80} />
        </div>
        
        <h1 style={{ color: '#1e293b', fontSize: '28px', marginBottom: '10px' }}>Report Submitted!</h1>
        <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '30px' }}>
          Your complaint has been successfully sent to the authority. 
          A confirmation email has been dispatched to your registered address.
        </p>

        <div style={{ 
          background: '#f1f5f9', 
          padding: '15px', 
          borderRadius: '12px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <Mail size={20} color="#3b82f6" />
          <span style={{ fontSize: '14px', color: '#475569' }}>Check your <b>Inbox</b> for the reference ID.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => navigate('/citizen-portal')}
            style={{ 
              width: '100%', 
              background: '#3b82f6', 
              color: 'white', 
              padding: '14px', 
              borderRadius: '12px', 
              border: 'none', 
              fontWeight: '700', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Home size={18} /> Return to Home
          </button>
          
          <button 
            onClick={() => navigate('/track-complaint')}
            style={{ 
              width: '100%', 
              background: 'white', 
              color: '#3b82f6', 
              padding: '14px', 
              borderRadius: '12px', 
              border: '2px solid #3b82f6', 
              fontWeight: '700', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Search size={18} /> Track My Complaint
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionSuccess;