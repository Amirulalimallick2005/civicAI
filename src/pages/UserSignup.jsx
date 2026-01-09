import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, UserPlus, ShieldCheck } from 'lucide-react';
import '../styles/authority.css';

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    phone_number: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/signup/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Citizen Account Created Successfully!");
        navigate('/citizen-login');
      } else {
        alert("Signup Failed: " + (data.detail || "Check your details"));
      }
    } catch (error) {
      alert("Backend server is not reachable.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <UserPlus size={32} />
            <span>Citizen Signup</span>
          </div>
          <p className="login-subtitle">Join CivicAI to improve your community</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-with-icon">
              <User size={18} />
              <input 
                type="text" 
                placeholder="Enter your full name" 
                className="login-input"
                onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="login-input"
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="input-with-icon">
              <Phone size={18} />
              <input 
                type="text" 
                placeholder="+91 00000 00000" 
                className="login-input"
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})} 
                required 
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Create Password</label>
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

          <button type="submit" className="login-button" style={{ marginTop: '10px' }}>
            Create Citizen Account
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            Already registered? <Link to="/citizen-login" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Sign in here</Link>
          </div>

          <div className="login-footer" style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#64748b', fontSize: '12px' }}>
              <ShieldCheck size={14} /> Verified community access
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;