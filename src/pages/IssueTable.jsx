import React from 'react';
import { MapPin, Clock, AlertTriangle, FileText } from 'lucide-react';

// --- INJECTED STYLES (DOES NOT ALTER ORIGINAL CODE) ---
const css = `
  .bg-white { background-color: #ffffff; }
  .rounded-xl { border-radius: 0.75rem; }
  .border { border: 1px solid #e2e8f0; }
  .border-slate-200 { border-color: #e2e8f0; }
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .overflow-hidden { overflow: hidden; }
  .overflow-x-auto { overflow-x: auto; }
  .w-full { width: 100%; }
  .bg-slate-50 { background-color: #f8fafc; }
  .border-b { border-bottom: 1px solid #e2e8f0; }
  .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .text-left { text-align: left; }
  .text-center { text-align: center; }
  .text-xs { font-size: 0.75rem; }
  .text-sm { font-size: 0.875rem; }
  .font-semibold { font-weight: 600; }
  .font-medium { font-weight: 500; }
  .font-bold { font-weight: 700; }
  .text-slate-600 { color: #475569; }
  .text-slate-900 { color: #0f172a; }
  .text-slate-700 { color: #334155; }
  .text-slate-400 { color: #94a3b8; }
  .text-slate-500 { color: #64748b; }
  .text-blue-600 { color: #2563eb; }
  .uppercase { text-transform: uppercase; }
  .tracking-wider { letter-spacing: 0.05em; }
  .divide-y > * + * { border-top: 1px solid #e2e8f0; }
  .hover\\:bg-slate-50:hover { background-color: #f8fafc; }
  .transition { transition: all 0.2s; }
  .cursor-pointer { cursor: pointer; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .gap-1 { gap: 0.25rem; }
  .gap-2 { gap: 0.5rem; }
  .rounded-full { border-radius: 9999px; }
  .rounded-lg { border-radius: 0.5rem; }
  .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .max-w-\\[150px\\] { max-w: 150px; }
  .mx-auto { margin-left: auto; margin-right: auto; }
  .mb-3 { margin-bottom: 0.75rem; }
  .w-4 { width: 1rem; }
  .h-4 { height: 1rem; }
  .w-12 { width: 3rem; }
  .h-12 { height: 3rem; }
  
  /* Priority/Status Colors */
  .bg-red-100 { background-color: #fee2e2; }
  .text-red-700 { color: #b91c1c; }
  .border-red-300 { border-color: #fca5a5; }
  .bg-orange-100 { background-color: #ffedd5; }
  .text-orange-700 { color: #c2410c; }
  .border-orange-300 { border-color: #fdba74; }
  .bg-yellow-100 { background-color: #fef9c3; }
  .text-yellow-700 { color: #a16207; }
  .border-yellow-300 { border-color: #fde047; }
  .bg-blue-100 { background-color: #dbeafe; }
  .text-blue-700 { color: #1d4ed8; }
  .border-blue-300 { border-color: #93c5fd; }
  .bg-green-100 { background-color: #dcfce7; }
  .text-green-700 { color: #15803d; }
  .text-red-600 { color: #dc2626; }
  .text-orange-600 { color: #ea580c; }
  .text-green-600 { color: #16a34a; }
  
  /* Buttons */
  button { border: 1px solid transparent; cursor: pointer; }
  .bg-blue-50 { background-color: #eff6ff; }
  .border-blue-200 { border-color: #bfdbfe; }
  .bg-red-50 { background-color: #fef2f2; }
  .border-red-200 { border-color: #fecaca; }

  @media (min-width: 1024px) {
    .lg\\:max-w-xs { max-width: 20rem; }
  }
  table { border-collapse: collapse; }
`;

export default function IssueTable({ 
  issues = [], // Default to empty array to prevent map errors
  onIssueClick,
  onAssign,
  onReject,
  onEscalate 
}) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Assigned': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getSLAColor = (slaStatus) => {
    switch (slaStatus) {
      case 'Breached': return 'text-red-600';
      case 'At Risk': return 'text-orange-600';
      case 'On Track': return 'text-green-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <style>{css}</style>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Issue ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                SLA Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Assigned Worker
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {issues.length > 0 ? (
              issues.map((issue) => (
                <tr 
                  key={issue.id} 
                  className="hover:bg-slate-50 transition cursor-pointer"
                  onClick={() => onIssueClick && onIssueClick(issue)}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-blue-600">{issue.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {issue.type}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="truncate max-w-[150px] lg:max-w-xs">{issue.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getPriorityColor(issue.priority)}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1 text-sm font-medium ${getSLAColor(issue.slaStatus)}`}>
                      {issue.slaStatus === 'Breached' && <AlertTriangle className="w-4 h-4" />}
                      {issue.slaStatus === 'At Risk' && <Clock className="w-4 h-4" />}
                      <span>{issue.slaStatus}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {issue.assignedWorker || <span className="text-slate-400">Not assigned</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {issue.status === 'Pending' && onAssign && (
                        <button
                          onClick={() => onAssign(issue.id)}
                          className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition border border-blue-200"
                        >
                          Assign
                        </button>
                      )}
                      {onReject && (
                        <button
                          onClick={() => onReject(issue.id)}
                          className="px-3 py-1 text-xs font-semibold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition border border-red-200"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 font-medium">No issues found matching your filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}