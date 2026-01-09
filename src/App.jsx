import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './styles/authority.css';
import './styles/index.css'; 
// Note: If your styles folder is inside src, use './styles/index.css'
// If it's outside src, adjust the path accordingly.
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
// Change this line in App.jsx
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
// Add this line with your other authority imports
import SLA from './pages/SLA';


// --- COMPONENTS ---
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';


const AuthorityApp = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthorityAuth") === "true");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation(); // Need this to detect current page from URL

  // 1. Determine current page for the Sidebar highlighting
  // If URL is /authority/analytics, currentPage becomes "analytics"
  const currentPage = location.pathname.split('/').pop() || 'dashboard';
  
  // 2. Get department name from storage
  const currentDept = localStorage.getItem("authDept") || "General Admin";

  const handleLoginSuccess = () => {
    localStorage.setItem("isAuthorityAuth", "true");
    setIsAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthorityAuth");
    localStorage.removeItem("authEmail");
    localStorage.removeItem("authDept");
    setIsAuth(false);
  };

  if (!isAuth) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  return (
    <div className="authority-app flex">
      <Sidebar 
        currentPage={currentPage}
        department={currentDept}
        onNavigate={(pageId) => navigate(`/authority/${pageId}`)} // This is the missing function!
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
      />
      <div className={`main-content flex-1 ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Topbar onLogout={handleLogout} /> 
        <div className="content-wrapper p-4">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
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
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<RoleSelection />} />
        
        {/* CITIZEN ROUTES */}
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/signup-user" element={<UserSignup />} />
        <Route path="/citizen-portal" element={<CitizenPortal />} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/analysis-result" element={<AnalysisResult />} />
        <Route path="/report-details" element={<ReportDetails />} />
        <Route path="/final-report" element={<FinalReport />} />
        <Route path="/submission-success" element={<SubmissionSuccess />} />
        <Route path="/track-complaint" element={<TrackComplaint />} />
        {/* AUTHORITY ROUTES */}
        <Route path="/authority-signup" element={<AuthoritySignup />} />
        
        {/* The * handles all sub-routes inside AuthorityApp (Dashboard, Issues, etc.) */}
        <Route path="/authority/*" element={<AuthorityApp />} />
      </Routes>
    </Router>
  );
};

export default App;