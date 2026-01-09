import React, { useState } from 'react';
import { FileText, Filter, ChevronDown } from 'lucide-react';
import IssueTable from './IssueTable';

// --- INJECTED STYLES (DOES NOT ALTER ORIGINAL CODE) ---
const css = `
  .p-6 { padding: 1.5rem; }
  .lg\\:p-8 { padding: 2rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mt-4 { margin-top: 1rem; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .gap-3 { gap: 0.75rem; }
  .gap-2 { gap: 0.5rem; }
  .gap-4 { gap: 1rem; }
  .bg-white { background-color: #ffffff; }
  .bg-slate-50 { background-color: #f8fafc; }
  .rounded-xl { border-radius: 0.75rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .border { border: 1px solid #e2e8f0; }
  .border-slate-200 { border-color: #e2e8f0; }
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .grid { display: grid; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .text-sm { font-size: 0.875rem; }
  .text-xs { font-size: 0.75rem; }
  .font-bold { font-weight: 700; }
  .font-semibold { font-weight: 600; }
  .font-medium { font-weight: 500; }
  .text-slate-900 { color: #0f172a; }
  .text-slate-600 { color: #475569; }
  .text-slate-500 { color: #64748b; }
  .text-blue-600 { color: #2563eb; }
  .w-full { width: 100%; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2\\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
  .relative { position: relative; }
  .absolute { position: absolute; }
  .right-3 { right: 0.75rem; }
  .top-10 { top: 2.5rem; }
  .appearance-none { appearance: none; }
  .focus\\:ring-2:focus { outline: none; box-shadow: 0 0 0 2px #3b82f6; }
  @media (min-width: 640px) { .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  select, button { cursor: pointer; border: 1px solid #cbd5e1; }
  button { background: transparent; border: none; }
`;

// Mock issues data - Removed TypeScript type annotations
const mockIssues = [
  {
    id: 'CVC-2026-00234',
    type: 'Pothole',
    location: 'MG Road, Near City Mall, Zone A',
    priority: 'Critical',
    status: 'Pending',
    slaStatus: 'Breached',
    reportedDate: 'Jan 5, 2026'
  },
  {
    id: 'CVC-2026-00235',
    type: 'Streetlight Not Working',
    location: 'Park Street, Zone B',
    priority: 'High',
    status: 'Assigned',
    slaStatus: 'At Risk',
    assignedWorker: 'Rajesh Kumar',
    reportedDate: 'Jan 5, 2026'
  },
  {
    id: 'CVC-2026-00236',
    type: 'Garbage Collection',
    location: 'Main Market, Zone A',
    priority: 'Medium',
    status: 'In Progress',
    slaStatus: 'On Track',
    assignedWorker: 'Priya Sharma',
    reportedDate: 'Jan 4, 2026'
  },
  {
    id: 'CVC-2026-00237',
    type: 'Water Leak',
    location: 'Residential Area, Zone C',
    priority: 'High',
    status: 'Pending',
    slaStatus: 'On Track',
    reportedDate: 'Jan 5, 2026'
  },
  {
    id: 'CVC-2026-00238',
    type: 'Road Damage',
    location: 'Highway Junction, Zone D',
    priority: 'Medium',
    status: 'Resolved',
    slaStatus: 'On Track',
    assignedWorker: 'Amit Patel',
    reportedDate: 'Jan 3, 2026'
  },
  {
    id: 'CVC-2026-00239',
    type: 'Drainage Block',
    location: 'Colony Road, Zone A',
    priority: 'Low',
    status: 'Assigned',
    slaStatus: 'On Track',
    assignedWorker: 'Sunita Verma',
    reportedDate: 'Jan 4, 2026'
  }
];

const wards = ['All Zones', 'Zone A', 'Zone B', 'Zone C', 'Zone D'];
const severities = ['All Priorities', 'Critical', 'High', 'Medium', 'Low'];
const statuses = ['All Statuses', 'Pending', 'Assigned', 'In Progress', 'Resolved'];
const slaFilters = ['All SLA', 'On Track', 'At Risk', 'Breached'];

export default function IssueList({ department, onIssueClick }) {
  const [selectedWard, setSelectedWard] = useState('All Zones');
  const [selectedSeverity, setSelectedSeverity] = useState('All Priorities');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedSLA, setSelectedSLA] = useState('All SLA');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesWard = selectedWard === 'All Zones' || issue.location.includes(selectedWard);
    const matchesSeverity = selectedSeverity === 'All Priorities' || issue.priority === selectedSeverity;
    const matchesStatus = selectedStatus === 'All Statuses' || issue.status === selectedStatus;
    const matchesSLA = selectedSLA === 'All SLA' || issue.slaStatus === selectedSLA;
    
    return matchesWard && matchesSeverity && matchesStatus && matchesSLA;
  });

  const handleAssign = (issueId) => {
    console.log('Assigning issue:', issueId);
  };

  const handleReject = (issueId) => {
    console.log('Rejecting issue:', issueId);
  };

  const handleEscalate = (issueId) => {
    console.log('Escalating issue:', issueId);
  };

  return (
    <div className="p-6 lg:p-8">
      <style>{css}</style>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-slate-900 font-bold text-2xl">Issue List</h1>
        </div>
        <p className="text-slate-600">Work allocation and triage for {department}</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl p-6 mb-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-slate-600" />
          <h3 className="text-slate-900 font-semibold">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Ward Filter */}
          <div className="relative">
            <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Zone / Ward</label>
            <select 
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm"
            >
              {wards.map(ward => (
                <option key={ward} value={ward}>{ward}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-10 pointer-events-none" />
          </div>

          {/* Severity Filter */}
          <div className="relative">
            <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Priority</label>
            <select 
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm"
            >
              {severities.map(severity => (
                <option key={severity} value={severity}>{severity}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-10 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Status</label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-10 pointer-events-none" />
          </div>

          {/* SLA Filter */}
          <div className="relative">
            <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">SLA Status</label>
            <select 
              value={selectedSLA}
              onChange={(e) => setSelectedSLA(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm"
            >
              {slaFilters.map(sla => (
                <option key={sla} value={sla}>{sla}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-10 pointer-events-none" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filteredIssues.length}</span> of {mockIssues.length} issues
          </p>
          <button 
            onClick={() => {
              setSelectedWard('All Zones');
              setSelectedSeverity('All Priorities');
              setSelectedStatus('All Statuses');
              setSelectedSLA('All SLA');
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Issue Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <IssueTable 
          issues={filteredIssues}
          onIssueClick={onIssueClick}
          onAssign={handleAssign}
          onReject={handleReject}
          onEscalate={handleEscalate}
        />
      </div>
    </div>
  );
}