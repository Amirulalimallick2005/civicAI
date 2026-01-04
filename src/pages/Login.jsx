import React, { useState } from 'react';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    if (formData.email && formData.password) {
      onLogin();
    } else {
      setError('Please enter valid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Shield size={32} />
            <span>Authority Portal</span>
          </div>
          <p className="login-subtitle">Official Government Administration System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label">Official Email</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input
                type="email"
                placeholder="admin@authority.gov"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="login-input"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="login-input"
                required
              />
            </div>
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => setFormData({...formData, remember: e.target.checked})}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>
          
          {/* Main button changed to Login */}
          <button type="submit" className="login-button">
            Login to Dashboard
          </button>

          {/* New User Section Added Below the Button */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            New user? <a href="#signup" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Sign up for an account</a>
          </div>
          
          <div className="login-footer">
            <p>Secure access to authorized personnel only</p>
            <p className="version">v2.1.4 • Official Release</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;