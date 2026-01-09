import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, User, BadgeCheck, Building2 } from 'lucide-react';
import '../styles/authority.css';

const AuthoritySignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    badge_number: '',
    department: ''
  });

  const departments = ["Garbage", "Roads", "Fallen Tree", "Electricity", "Anti-Graffiti Taskforce"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signup/authority", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Authority Account Created Successfully!");
        navigate('/authority'); // Redirect to login
      } else {
        alert("Registration Failed: " + data.detail);
      }
    } catch (error) {
      alert("Error: Connection to backend failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Shield size={32} />
            <span>Authority Registration</span>
          </div>
          <p className="login-subtitle">Create an official administrator account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <User size={18} />
              <input 
                type="text" 
                placeholder="John Doe" 
                className="login-input"
                onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Official Email</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="admin@authority.gov" 
                className="login-input"
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="login-input"
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Badge Number */}
          <div className="form-group">
            <label className="form-label">Badge Number</label>
            <div className="input-with-icon">
              <BadgeCheck size={18} />
              <input 
                type="text" 
                placeholder="XYZ-12345" 
                className="login-input"
                onChange={(e) => setFormData({...formData, badge_number: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Department Selection */}
          <div className="form-group">
            <label className="form-label">Assigned Department</label>
            <div className="input-with-icon">
              <Building2 size={18} />
              <select 
                className="login-input"
                style={{ appearance: 'none' }}
                onChange={(e) => setFormData({...formData, department: e.target.value})} 
                required
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept} Department</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="login-button" style={{ marginTop: '10px' }}>
            Register Official Account
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            Already have an account? <Link to="/authority" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
          </div>

          <div className="login-footer">
            <p>Registration requires official verification</p>
            <p className="version">v2.1.4 • Official Release</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthoritySignup;