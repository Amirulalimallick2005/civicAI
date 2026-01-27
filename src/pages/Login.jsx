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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Updated URL to match your backend router prefix (/auth) and route (/login/authority)
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
  localStorage.setItem("isAuthorityAuth", "true");
  localStorage.setItem("authEmail", data.email);
  
  // Normalize the department name: Trim spaces and ensure it exists
  const deptName = data.department ? data.department.trim() : "General";
  localStorage.setItem("authDept", deptName);
        // Optional: If your backend adds JWT later, it would go here
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
        }

        // 3. Trigger instant state change in App.jsx
        if (onLogin) {
          onLogin();
        }

        // 4. Navigate to dashboard
        navigate('/authority/dashboard');
      } else {
        // Handles 401 Unauthorized or 404 Not Found from backend
        setError(data.detail || "Invalid official credentials. Please try again.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Connection refused. Make sure your FastAPI server is running on port 8000 and CORS is enabled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={styles.container}>
      <style>{`
        .login-card {
          background: white;
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          border: 1px solid #e2e8f0;
        }
        .login-header { text-align: center; margin-bottom: 2rem; }
        .login-logo { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          gap: 10px; 
          color: #2563eb; 
          font-weight: 800; 
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .login-subtitle { color: #64748b; font-size: 0.875rem; }
        .form-group { margin-bottom: 1.25rem; }
        .form-label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #1e293b; font-size: 0.9rem; }
        .input-with-icon { 
          position: relative; 
          display: flex; 
          align-items: center; 
        }
        .input-with-icon svg { 
          position: absolute; 
          left: 12px; 
          color: #94a3b8; 
        }
        .login-input { 
          width: 100%; 
          padding: 12px 12px 12px 40px; 
          border: 1px solid #e2e8f0; 
          border-radius: 8px; 
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .login-input:focus { 
          outline: none; 
          border-color: #2563eb; 
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); 
        }
        .login-button { 
          width: 100%; 
          padding: 12px; 
          background: #2563eb; 
          color: white; 
          border: none; 
          border-radius: 8px; 
          font-weight: 600; 
          cursor: pointer; 
          transition: background 0.2s;
          margin-top: 1rem;
        }
        .login-button:hover { background: #1d4ed8; }
        .login-button:disabled { background: #94a3b8; cursor: not-allowed; }
        .form-options { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          font-size: 0.85rem; 
          margin-bottom: 1rem;
        }
        .checkbox-label { display: flex; align-items: center; gap: 6px; cursor: pointer; color: #64748b; }
        .forgot-link { color: #2563eb; text-decoration: none; font-weight: 500; }
        .login-footer { text-align: center; margin-top: 2rem; border-top: 1px solid #f1f5f9; padding-top: 1.5rem; }
        .login-footer p { margin: 0; font-size: 0.75rem; color: #94a3b8; }
        .version { margin-top: 4px !important; font-weight: 600; color: #cbd5e1 !important; }
      `}</style>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Shield size={32} />
            <span>CivicAI Authority</span>
          </div>
          <p className="login-subtitle">Municipal Administration System</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message" style={styles.errorBox}>
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
              <span>Keep me logged in</span>
            </label>
            <a href="#forgot" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            New official? <Link to="/authority-signup" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Register Department</Link>
          </div>

          <div className="login-footer">
            <p>Authorized Personnel Only</p>
            <p className="version">v2.4.0 • Secure Session</p>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '20px'
  },
  errorBox: {
    color: '#dc2626',
    backgroundColor: '#fee2e2',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    border: '1px solid #fecaca'
  }
};

export default Login;