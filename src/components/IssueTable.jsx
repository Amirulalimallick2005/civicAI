import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle,
  Filter,
  Download,
  Eye,
  Edit
} from 'lucide-react';

const IssueTable = ({ issues = [] }) => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} className="status-pending" />;
      case 'in-progress': return <AlertTriangle size={16} className="status-in-progress" />;
      case 'resolved': return <CheckCircle size={16} className="status-resolved" />;
      default: return <XCircle size={16} className="status-cancelled" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      critical: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return (
      <span className={`priority-badge ${colors[priority] || colors.medium}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="issue-table-container">
      <div className="table-header">
        <div className="table-filters">
          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <div className="filter-group">
            <select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        <button className="export-btn">
          <Download size={16} />
          Export
        </button>
      </div>
      
      <div className="table-responsive">
        <table className="issue-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td className="issue-id">#{issue.id}</td>
                <td className="issue-title">
                  <strong>{issue.title}</strong>
                  <p className="issue-description">{issue.description}</p>
                </td>
                <td>
                  <span className="category-badge">{issue.category}</span>
                </td>
                <td>{getPriorityBadge(issue.priority)}</td>
                <td>
                  <div className="status-cell">
                    {getStatusIcon(issue.status)}
                    <span className="status-text">{issue.status}</span>
                  </div>
                </td>
                <td className="assigned-to">{issue.assignedTo || 'Unassigned'}</td>
                <td className="created-date">{issue.createdDate}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view-btn"
                      onClick={() => navigate(`/issues/${issue.id}`)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="action-btn edit-btn"
                      title="Edit Issue"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="table-summary">
          Showing 1-10 of {issues.length} issues
        </div>
        <div className="table-pagination">
          <button className="pagination-btn disabled">Previous</button>
          <button className="pagination-btn active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default IssueTable;