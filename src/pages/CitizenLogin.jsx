import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { User, Mail, Lock, LogIn, ShieldCheck } from 'lucide-react';
import '../styles/authority.css';

const CitizenLogin = () => {
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    // Since this is a dummy login, we don't check credentials yet.
    navigate('/citizen-portal'); 
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <User size={32} />
            <span>Citizen Portal</span>
          </div>
          <p className="login-subtitle">Sign in to report issues and track progress</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input type="email" className="login-input" placeholder="yourname@example.com" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input type="password" className="login-input" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" className="login-button">
            Login to CivicAI <LogIn size={18} style={{marginLeft: '8px'}} />
          </button>

          {/* New User Section Added Below the Button */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            New user? <a href="#signup" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Create a citizen account</a>
          </div>

          {/* Professional Footer Added */}
          <div className="login-footer" style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#64748b', fontSize: '12px', marginBottom: '4px' }}>
              <ShieldCheck size={14} /> Secure access for verified citizens
            </p>
            <p className="version" style={{ fontSize: '11px', color: '#94a3b8' }}>v2.1.4 • Official Release</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CitizenLogin;