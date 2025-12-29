import React from 'react';
import { 
  AlertTriangle, 
  Users, 
  Clock, 
  CheckCircle,
  TrendingUp,
  MapPin,
  MessageSquare
} from 'lucide-react';
import MapView from '../components/MapView';
import StatsCard from '../components/StatsCard';
import IssueTable from '../components/IssueTable';

const Dashboard = () => {
  const statsData = [
    {
      title: 'Active Issues',
      value: '1,247',
      change: '+12.5%',
      icon: <AlertTriangle size={24} />,
      color: '#F59E0B',
      trend: 'up'
    },
    {
      title: 'Workforce Online',
      value: '342',
      change: '+5.2%',
      icon: <Users size={24} />,
      color: '#3B82F6',
      trend: 'up'
    },
    {
      title: 'Avg Resolution Time',
      value: '2.3 days',
      change: '-8.7%',
      icon: <Clock size={24} />,
      color: '#10B981',
      trend: 'down'
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: '+3.1%',
      icon: <CheckCircle size={24} />,
      color: '#8B5CF6',
      trend: 'up'
    }
  ];

  const recentIssues = [
    {
      id: 'ISSUE-4821',
      title: 'Road Repair Needed',
      description: 'Major pothole on Main Street',
      category: 'Infrastructure',
      priority: 'high',
      status: 'in-progress',
      assignedTo: 'John Smith',
      createdDate: '2024-01-15'
    },
    {
      id: 'ISSUE-4820',
      title: 'Garbage Collection',
      description: 'Overflowing bins in downtown',
      category: 'Sanitation',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
      createdDate: '2024-01-15'
    },
    {
      id: 'ISSUE-4819',
      title: 'Street Light Outage',
      description: 'Multiple lights not working',
      category: 'Utilities',
      priority: 'critical',
      status: 'in-progress',
      assignedTo: 'Mike Wilson',
      createdDate: '2024-01-14'
    }
  ];

  const mapIssues = [
    { id: 1, title: 'Road Repair', coordinates: { x: 30, y: 40 }, status: 'in-progress', priority: 'high' },
    { id: 2, title: 'Garbage Issue', coordinates: { x: 60, y: 30 }, status: 'pending', priority: 'medium' },
    { id: 3, title: 'Water Leak', coordinates: { x: 45, y: 60 }, status: 'resolved', priority: 'low' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Authority Dashboard</h1>
          <p>Welcome back! Here's what's happening in your city today.</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <MessageSquare size={16} />
            New Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Map and Recent Activity */}
      <div className="dashboard-content">
        <div className="content-left">
          <MapView issues={mapIssues} />
        </div>
        <div className="content-right">
          <div className="recent-activity">
            <div className="activity-header">
              <h3>Recent Activity</h3>
              <button className="text-btn">View All</button>
            </div>
            <div className="activity-list">
              {[
                { time: '10:30 AM', action: 'New issue reported', user: 'Citizen App', status: 'pending' },
                { time: '09:45 AM', action: 'Issue resolved', user: 'Field Worker #42', status: 'resolved' },
                { time: '08:20 AM', action: 'Worker assigned', user: 'Admin User', status: 'in-progress' },
                { time: 'Yesterday', action: 'Monthly report generated', user: 'System', status: 'completed' },
              ].map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-time">{activity.time}</div>
                  <div className="activity-details">
                    <div className="activity-text">{activity.action}</div>
                    <div className="activity-user">{activity.user}</div>
                  </div>
                  <span className={`activity-status ${activity.status}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Issues Table */}
      <div className="recent-issues">
        <div className="section-header">
          <h3>Recent Issues</h3>
          <button className="btn-secondary">View All Issues</button>
        </div>
        <IssueTable issues={recentIssues} />
      </div>
    </div>
  );
};

export default Dashboard;