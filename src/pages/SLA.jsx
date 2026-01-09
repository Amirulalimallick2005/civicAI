import React, { useState } from 'react';
import { AlertCircle, Clock, Save } from 'lucide-react';

// --- INJECTED STYLES ---
const css = `
  .p-6 { padding: 1.5rem; }
  .lg\\:p-8 { padding: 2rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mt-6 { margin-top: 1.5rem; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .justify-end { justify-content: flex-end; }
  .gap-3 { gap: 0.75rem; }
  .gap-2 { gap: 0.5rem; }
  .space-y-4 > * + * { margin-top: 1rem; }
  
  .bg-white { background-color: #ffffff; }
  .bg-slate-50 { background-color: #f8fafc; }
  .bg-blue-600 { background-color: #2563eb; }
  .bg-blue-50 { background-color: #eff6ff; }
  .bg-red-100 { background-color: #fee2e2; }
  .bg-slate-300 { background-color: #cbd5e1; }
  
  .rounded-xl { border-radius: 0.75rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .rounded { border-radius: 0.25rem; }
  .rounded-full { border-radius: 9999px; }
  
  .border { border: 1px solid #e2e8f0; }
  .border-slate-200 { border-color: #e2e8f0; }
  .border-slate-300 { border-color: #cbd5e1; }
  .border-blue-200 { border-color: #bfdbfe; }
  .border-b { border-bottom: 1px solid #e2e8f0; }
  
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  
  .text-slate-900 { color: #0f172a; font-weight: 600; }
  .text-slate-600 { color: #475569; }
  .text-slate-700 { color: #334155; }
  .text-blue-600 { color: #2563eb; }
  .text-red-700 { color: #b91c1c; }
  .text-white { color: #ffffff; }
  
  .text-xs { font-size: 0.75rem; }
  .text-sm { font-size: 0.875rem; }
  .uppercase { text-transform: uppercase; }
  .font-bold { font-weight: 700; }
  
  .w-full { width: 100%; }
  .w-8 { width: 2rem; }
  .h-8 { height: 2rem; }
  .w-4 { width: 1rem; }
  .h-4 { height: 1rem; }
  .w-16 { width: 4rem; }
  .w-11 { width: 2.75rem; }
  .h-6 { height: 1.5rem; }
  
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .p-4 { padding: 1rem; }
  
  .divide-y > * + * { border-top: 1px solid #e2e8f0; }
  .transition { transition: all 0.2s ease-in-out; }
  .hover\\:bg-slate-50:hover { background-color: #f8fafc; }
  .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
  .relative { position: relative; }
  .inline-flex { display: inline-flex; }
  .transform { transform: translateX(0); }
  .translate-x-6 { transform: translateX(1.5rem); }
  .translate-x-1 { transform: translateX(0.25rem); }
  
  table { border-collapse: collapse; }
  input, select, button { outline: none; border: 1px solid #cbd5e1; }
  button { cursor: pointer; border: none; }
`;

const slaRules = [
  { category: 'Pothole', maxTime: 5, severity: 'High' },
  { category: 'Streetlight', maxTime: 3, severity: 'Medium' },
  { category: 'Garbage', maxTime: 2, severity: 'Medium' },
  { category: 'Water Supply', maxTime: 4, severity: 'High' }
];

const escalationHistory = [
  {
    issueId: 'CVC-2026-00789',
    category: 'Pothole',
    timeExceeded: '7 days',
    currentOwner: 'Dept. Head',
    date: 'Jan 4, 2026'
  },
  {
    issueId: 'CVC-2026-00654',
    category: 'Streetlight',
    timeExceeded: '4 days',
    currentOwner: 'Supervisor',
    date: 'Jan 3, 2026'
  }
];

export default function SLA() {
  const [autoEscalation, setAutoEscalation] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="p-6 lg:p-8">
      <style>{css}</style>
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="w-8 h-8 text-orange-600" />
          <h1 className="text-slate-900" style={{fontSize: '1.5rem'}}>Escalation & SLA Management</h1>
        </div>
        <p className="text-slate-600">Prevent negligence and enforce accountability</p>
      </div>

      {/* SLA Rules Table */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-slate-900 mb-4">Service Level Agreement Rules</h3>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Max Resolution (days)</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Severity Level</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {slaRules.map((rule, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-4 py-4 text-sm text-slate-900">{rule.category}</td>
                <td className="px-4 py-4">
                  <input 
                    type="number"
                    defaultValue={rule.maxTime}
                    className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
                  />
                </td>
                <td className="px-4 py-4">
                  <select 
                    defaultValue={rule.severity}
                    className="px-3 py-1 border border-slate-300 rounded text-sm bg-white"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </td>
                <td className="px-4 py-4">
                  <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition border border-blue-200">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium">
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </div>
      </div>

      {/* Auto-Escalation Toggle Section */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-slate-900 mb-4">Automation Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="text-slate-900">Enable Auto-Escalation</p>
              <p className="text-xs text-slate-600">Automatically reassign overdue tickets to department heads</p>
            </div>
            <button
              onClick={() => setAutoEscalation(!autoEscalation)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                autoEscalation ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                autoEscalation ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="text-slate-900">Email Alerts</p>
              <p className="text-xs text-slate-600">Notify supervisors via email when a breach is imminent</p>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                emailAlerts ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                emailAlerts ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Escalation History Table */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <h3 className="text-slate-900 mb-4">Recent Escalation History</h3>
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Issue ID</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Category</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Breach Duration</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">New Assignee</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Escalated On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {escalationHistory.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-4 py-4 text-sm text-blue-600 font-medium">{item.issueId}</td>
                <td className="px-4 py-4 text-sm text-slate-700">{item.category}</td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">
                    {item.timeExceeded}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-slate-700">{item.currentOwner}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}