import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { 
  Camera, Brain, MapPin, FileText, Send, CheckCircle, 
  AlertCircle, Trash2, Droplets, Lightbulb, 
  ArrowRight, Globe, Info, Upload, Users 
} from 'lucide-react';
import '../styles/authority.css';

const CitizenPortal = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate hook

  // Function to handle smooth scroll
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#0f172a' }}>
      <style>
        {`
          .max-container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 0 24px; 
          }
          
          .nav-item { 
            color: #475569; 
            font-weight: 500; 
            text-decoration: none; 
            transition: 0.2s; 
            font-size: 15px; 
            cursor: pointer;
          }
          .nav-item:hover { color: #2563eb; }
          
          .btn-hover-effect { transition: all 0.3s ease; cursor: pointer; }
          .btn-hover-effect:hover { 
            transform: translateY(-2px); 
            filter: brightness(1.1); 
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2); 
          }

          .action-card {
            padding: 32px;
            border-radius: 20px;
            color: white;
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .action-card:hover { 
            transform: translateY(-10px); 
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); 
          }

          .issue-card-grid {
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 32px;
            text-align: center;
            background: #fff;
            transition: all 0.3s ease;
          }
          .issue-card-grid:hover {
            transform: translateY(-8px);
            border-color: #2563eb;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }

          .footer-link { transition: 0.2s; cursor: pointer; }
          .footer-link:hover { color: #fff !important; text-decoration: underline; }
        `}
      </style>

      {/* Navigation */}
      <nav style={{ background: 'white', borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="max-container" style={{ height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#2563eb', color: 'white', padding: '8px 12px', borderRadius: '10px', fontWeight: '800' }}>CA</div>
            <span style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px' }}>CivicAI</span>
          </div>
          
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#" className="nav-item">Home</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="nav-item">How It Works</a>
            <a href="#" className="nav-item">Track Complaint</a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '14px', borderRight: '1px solid #e2e8f0', paddingRight: '20px' }}>
              <Globe size={16} /> EN / HI
            </div>
            {/* Added navigation to Report Issue button in nav */}
            <button 
              onClick={() => navigate('/upload-image')}
              className="btn-primary btn-hover-effect" 
              style={{ padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' }}
            >
              Report Issue
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="max-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '3.8rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.05', marginBottom: '24px' }}>
              Fix Civic Problems <br /> <span style={{ color: '#2563eb' }}>Faster with AI</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '40px', lineHeight: '1.6', maxWidth: '540px' }}>
              Just click a photo. AI detects the issue, generates a report, and sends it to the right authority instantly.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '48px' }}>
              {/* UPDATED: Report Now button navigation */}
              <button 
                onClick={() => navigate('/upload-image')}
                className="btn-primary btn-hover-effect" 
                style={{ padding: '16px 36px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', fontWeight: '700' }}
              >
                Report Now <ArrowRight size={20} />
              </button>
             <button 
                onClick={() => navigate('/track-complaint')}
                className="btn-secondary btn-hover-effect" 
                style={{ padding: '16px 36px', borderRadius: '12px', fontWeight: '700', fontSize: '16px' }}
              >
                Track Status
              </button>
            </div>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['AI-Powered', '100% Free', 'Real-time Tracking'].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: '600', fontSize: '14px' }}>
                  <CheckCircle size={18} /> {text}
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>
              <img 
                src="https://tse4.mm.bing.net/th/id/OIP.Uqw5_j96c16LZBM-qv2QNQHaHa?w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3" 
                alt="Civic Application Interface" 
                style={{ width: '100%', borderRadius: '40px', boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)', border: '12px solid #1e293b' }} 
              />
              <div style={{ position: 'absolute', top: '20%', right: '-30px', background: 'white', padding: '16px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', gap: '12px', alignItems: 'center', minWidth: '200px' }}>
                <div style={{ background: '#fef2f2', padding: '8px', borderRadius: '10px' }}><Trash2 color="#ef4444" size={20}/></div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>AI DETECTION</div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>Garbage Detected</div>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '15%', left: '-30px', background: 'white', padding: '16px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ background: '#eff6ff', padding: '8px', borderRadius: '10px' }}><MapPin color="#2563eb" size={20}/></div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>LOCATION</div>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>GPS Tagged</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section style={{ padding: '40px 0' }}>
        <div className="max-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {/* UPDATED: Take Photo card navigation */}
          <div 
            className="action-card" 
            onClick={() => navigate('/upload-image')}
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}
          >
            <Camera size={32} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Take Photo</h3>
              <p style={{ fontSize: '14px', opacity: '0.8' }}>Click a picture of the issue</p>
            </div>
          </div>

          <div 
            className="action-card" 
            onClick={() => navigate('/upload-image')}
            style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
          >
            <Upload size={32} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>Upload Image</h3>
              <p style={{ fontSize: '14px', opacity: '0.8' }}>Upload from gallery</p>
            </div>
          </div>

          <div className="action-card" style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' }}>
            <MapPin size={32} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>View Nearby</h3>
              <p style={{ fontSize: '14px', opacity: '0.8' }}>See problems in your area</p>
            </div>
          </div>

          <div className="action-card" style={{ background: 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)' }}>
            <FileText size={32} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>My Complaints</h3>
              <p style={{ fontSize: '14px', opacity: '0.8' }}>Track your reports</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Banner */}
      <section style={{ background: '#f8fafc', padding: '60px 0', borderY: '1px solid #e2e8f0' }}>
        <div className="max-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
          {[
            { label: "Issues Resolved", val: "12,482+" },
            { label: "Partner Cities", val: "45+" },
            { label: "Accuracy Rate", val: "98.2%" },
            { label: "Response Time", val: "< 24h" }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#2563eb', marginBottom: '4px' }}>{stat.val}</div>
              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '100px 0' }}>
        <div className="max-container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>How It Works</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Our AI-driven process ensures your concerns reach the right desk immediately.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {[
              { icon: <Camera />, title: "Click a Photo", desc: "Open the app and snap a picture of the civic issue." },
              { icon: <Brain />, title: "AI Categorization", desc: "AI automatically identifies the issue and department." },
              { icon: <MapPin />, title: "Auto Location", desc: "Precise GPS tagging ensures authorities find the spot." },
              { icon: <FileText />, title: "Smart Report", desc: "A detailed report is generated with all technical data." },
              { icon: <Send />, title: "Direct Dispatch", desc: "Report is sent to the specific local officer in charge." },
              { icon: <CheckCircle />, title: "Resolution", desc: "Track progress until the issue is officially resolved." }
            ].map((step, i) => (
              <div key={i} className="issue-card-grid">
                <div style={{ width: '64px', height: '64px', background: '#eff6ff', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#2563eb' }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '80px 0 40px' }}>
        <div className="max-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '80px', marginBottom: '64px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: '#2563eb', color: 'white', padding: '6px 10px', borderRadius: '8px', fontWeight: '800' }}>CA</div>
                <span style={{ fontSize: '22px', fontWeight: '700' }}>CivicAI</span>
              </div>
              <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px' }}>
                Revolutionizing urban management through artificial intelligence. Empowering citizens to build better cities together.
              </p>
            </div>
            {[
              { title: "Platform", links: ["About Us", "How it Works", "Partner Cities"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Data Security"] },
              { title: "Contact", links: ["Help Center", "support@civicai.gov", "1800-CIVIC-AI"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '24px' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map((link, j) => (
                    <li key={j} className="footer-link" style={{ color: '#94a3b8', marginBottom: '12px', fontSize: '14px' }}>{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '40px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
            © 2025 CivicAI. A Digital India Initiative. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CitizenPortal;