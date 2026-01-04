import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/authority.css';

// Import YOUR Landing Page
import LandingPage from './pages/LandingPage'; 
import RoleSelection from './pages/RoleSelection'; 
import CitizenLogin from './pages/CitizenLogin';
import CitizenPortal from './pages/CitizenPortal';
import UploadImage from './pages/UploadImage'; // Added this import
import AnalysisResult from './pages/AnalysisResult';


// Your Friend's Components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Your Friend's Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import IssueList from './pages/IssueList';
import IssueDetails from './pages/IssueDetails';
import Workers from './pages/Workers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const AuthorityApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // If not logged in, show the Login page
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // If logged in, show the dashboard layout
  return (
    <div className="authority-app">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Topbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="issues" element={<IssueList />} />
            <Route path="issues/:id" element={<IssueDetails />} />
            <Route path="workers" element={<Workers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
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
        {/* 1. PUBLIC LANDING PAGE (The new front door) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<RoleSelection />} />
        
        {/* Citizen Routes */}
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/citizen-portal" element={<CitizenPortal />} />
        <Route path="/upload-image" element={<UploadImage />} /> {/* Added this route */}
        <Route path="/analysis-result" element={<AnalysisResult />} />

        {/* 2. AUTHORITY SECTION (Your friend's logic) */}
        {/* The * means it will handle all sub-routes like /authority/dashboard */}
        <Route path="/authority/*" element={<AuthorityApp />} />
      </Routes>
    </Router>
  );
};

export default App;