import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Note: Ensure your FastAPI route matches this URL exactly
      const response = await fetch("http://127.0.0.1:8000/auth/login/authority", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Save authentication data to browser storage
        // Changed to 'isAuthorityAuth' to match the updated App.jsx gatekeeper
        localStorage.setItem("isAuthorityAuth", "true");
        localStorage.setItem("authEmail", data.email);
        localStorage.setItem("authDept", data.department);

        // 2. Trigger instant state change in App.jsx
        if (onLogin) {
          onLogin();
        }

        // 3. Navigate to dashboard
        navigate('/authority/dashboard');
      } else {
        setError(data.detail || "Invalid official credentials");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Cannot connect to the security server. Check if the backend is running.");
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
            <div className="error-message" style={{
              color: '#dc2626',
              backgroundColor: '#fee2e2',
              padding: '10px',
              borderRadius: '6px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}>
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">
            Login to Dashboard
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            New user? <Link to="/authority-signup" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Sign up for an account</Link>
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

// CRITICAL: This was the missing part causing your compilation error!
export default Login;