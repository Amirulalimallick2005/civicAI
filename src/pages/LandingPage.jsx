import React from 'react';
import { Bot, Shield, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Updated Navigation: Removed Services and Authority Portal */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 50px', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
        <h2 style={{ color: '#22d3ee', margin: 0, letterSpacing: '-1px' }}>CIVIC AI</h2>
        {/* Empty div or a different link could go here if needed later */}
        <div></div> 
      </nav>

      {/* Hero */}
      <header style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '20px', fontWeight: '800' }}>
          Empowering Cities <br/> with <span style={{ color: '#0ea5e9' }}>AI</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px' }}>
          A seamless bridge between citizens and local authorities for smarter community management.
        </p>
        
        {/* Hero Button - This remains as your main entry point */}
        <button 
          onClick={() => navigate('/get-started')}
          style={{ 
            backgroundColor: '#0ea5e9', 
            color: 'white', 
            padding: '16px 32px', 
            borderRadius: '50px', 
            fontWeight: 'bold', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1rem', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px' 
          }}
        >
          Get Started Now <ArrowRight size={20} />
        </button>
      </header>

      {/* Services Section */}
      <section id="services" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', padding: '0 50px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: '#0f172a', padding: '40px', borderRadius: '16px', border: '1px solid #1e293b' }}>
          <Bot color="#0ea5e9" size={40} />
          <h3 style={{ marginTop: '20px', color: 'white' }}>AI Incident Routing</h3>
          <p style={{ color: '#64748b', lineHeight: '1.6' }}>Automatically sends reports to the right department using smart NLP analysis.</p>
        </div>
        
        <div style={{ background: '#0f172a', padding: '40px', borderRadius: '16px', border: '1px solid #1e293b' }}>
          <Shield color="#0ea5e9" size={40} />
          <h3 style={{ marginTop: '20px', color: 'white' }}>Secure Verification</h3>
          <p style={{ color: '#64748b', lineHeight: '1.6' }}>Ensures all reports are authentic and verified through citizen identity checks.</p>
        </div>

        <div style={{ background: '#0f172a', padding: '40px', borderRadius: '16px', border: '1px solid #1e293b' }}>
          <Globe color="#0ea5e9" size={40} />
          <h3 style={{ marginTop: '20px', color: 'white' }}>Community Hub</h3>
          <p style={{ color: '#64748b', lineHeight: '1.6' }}>Track progress of city improvements and local government responses in real-time.</p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;