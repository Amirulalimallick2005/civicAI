import React, { useState } from 'react';
import { Filter, Download, Plus, Search } from 'lucide-react';
import IssueTable from '../components/IssueTable';

const IssueList = () => {
  const [issues] = useState([
    // Add your issues data here
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Issue Management</h1>
          <p>Manage and track all reported issues</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Report New Issue
        </button>
      </div>
      
      <div className="page-content">
        <IssueTable issues={issues} />
      </div>
    </div>
  );
};

export default IssueList;