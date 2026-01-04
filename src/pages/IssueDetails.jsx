import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, User, AlertTriangle } from 'lucide-react';

const IssueDetails = () => {
  const { id } = useParams();

  return (
    <div className="page-container">
      <div className="page-header">
        <button className="btn-secondary">
          <ArrowLeft size={16} />
          Back to Issues
        </button>
        <h1>Issue Details #{id}</h1>
      </div>
      
      <div className="issue-details-container">
        <div className="issue-header">
          <div className="issue-title-section">
            <h2>Road Repair Needed - Main Street</h2>
            <div className="issue-meta">
              <span className="badge critical">Critical</span>
              <span className="badge in-progress">In Progress</span>
            </div>
          </div>
        </div>
        
        <div className="issue-content">
          {/* Add issue details here */}
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;