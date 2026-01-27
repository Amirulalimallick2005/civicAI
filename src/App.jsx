import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// --- STYLES ---
import './styles/authority.css';
import './styles/index.css'; 

// --- CITIZEN PAGES ---
import LandingPage from './pages/LandingPage'; 
import RoleSelection from './pages/RoleSelection'; 
import CitizenLogin from './pages/CitizenLogin';
import UserSignup from './pages/UserSignup'; 
import CitizenPortal from './pages/CitizenPortal';
import UploadImage from './pages/UploadImage'; 
import AnalysisResult from './pages/AnalysisResult';
import ReportDetails from './pages/ReportDetails';
import FinalReport from './pages/FinalReport';
import SubmissionSuccess from './pages/SubmissionSuccess';
import TrackComplaint from './pages/TrackComplaint';

// --- AUTHORITY PAGES ---
import Login from './pages/Login'; 
import AuthoritySignup from './pages/AuthoritySignup'; 
import Dashboard from './pages/Dashboard';
import IssueList from './pages/IssueList';
import IssueDetails from './pages/IssueDetails';
import Workers from './pages/Workers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import SLA from './pages/SLA';

// --- COMPONENTS ---
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const AuthorityApp = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthorityAuth") === "true");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthorityAuth") === "true";
    if (authStatus !== isAuth) {
      setIsAuth(authStatus);
    }
  }, [location, isAuth]);

  const currentPage = location.pathname.split('/').pop() || 'dashboard';
  const currentDept = localStorage.getItem("authDept") || "General Admin";

  const handleLoginSuccess = () => {
    localStorage.setItem("isAuthorityAuth", "true");
    setIsAuth(true);
    navigate('/authority/dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    navigate('/citizen-login');
  };

  if (!isAuth) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <div 
      className="authority-app" 
      style={{ 
        display: 'flex', 
        width: '100%', 
        height: '100vh', 
        overflow: 'hidden', 
        background: '#f8fafc' 
      }}
    >
      <Sidebar 
        currentPage={currentPage}
        department={currentDept}
        onNavigate={(pageId) => navigate(`/authority/${pageId}`)} 
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* CRITICAL FIX: 
        We use marginLeft: 0 to override the 260px margin in your CSS.
        flex: 1 and minWidth: 0 ensure the content fills the rest of the screen without overflow.
      */}
      <div 
        className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          minWidth: 0, 
          marginLeft: 0, // This kills the gap
          height: '100vh',
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        <Topbar onLogout={handleLogout} department={currentDept} /> 
        
        <div 
          className="content-wrapper" 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            width: '100%',
            padding: '24px' // Standard dashboard padding
          }}
        >
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="issues" element={<IssueList />} />
            <Route path="issues/:id" element={<IssueDetails />} />
            <Route path="workers" element={<Workers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="sla" element={<SLA />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<RoleSelection />} />
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/signup-user" element={<UserSignup />} />
        <Route path="/citizen-portal" element={<CitizenPortal />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/analysis-result" element={<AnalysisResult />} />
        <Route path="/report-details" element={<ReportDetails />} />
        <Route path="/final-report" element={<FinalReport />} />
        <Route path="/submission-success" element={<SubmissionSuccess />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        <Route path="/authority-signup" element={<AuthoritySignup />} />
        <Route path="/authority/*" element={<AuthorityApp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;