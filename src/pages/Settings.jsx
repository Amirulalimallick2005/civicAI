import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Building, Mail, CheckCircle, XCircle } from 'lucide-react';

const departmentMappings = [
  { issueType: 'Pothole', department: 'Roads & Infrastructure', priority: 'High' },
  { issueType: 'Streetlight', department: 'Electrical', priority: 'Medium' },
  { issueType: 'Garbage', department: 'Solid Waste', priority: 'Medium' },
  { issueType: 'Water Leak', department: 'Water Supply', priority: 'High' }
];

export default function Settings() {
  const [notifyNewIssue, setNotifyNewIssue] = useState(true);
  const [notifyEscalation, setNotifyEscalation] = useState(true);
  const [notifySLABreach, setNotifySLABreach] = useState(true);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-blue-600" />
          <h1 className="text-slate-900">Department Settings</h1>
        </div>
        <p className="text-slate-600">Configure issue routing and notifications</p>
      </div>

      {/* Issue → Department Mapping */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-slate-900 mb-4">Issue → Department Mapping</h3>
        <p className="text-sm text-slate-600 mb-6">
          Define which department handles each issue type for correct routing from AI detection
        </p>

        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Issue Type</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Assigned Department</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Priority</th>
              <th className="px-4 py-3 text-left text-xs text-slate-600 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {departmentMappings.map((mapping, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-4 py-4 text-sm text-slate-900">{mapping.issueType}</td>
                <td className="px-4 py-4">
                  <select 
                    defaultValue={mapping.department}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
                  >
                    <option>Roads & Infrastructure</option>
                    <option>Solid Waste</option>
                    <option>Electrical</option>
                    <option>Water Supply</option>
                  </select>
                </td>
                <td className="px-4 py-4">
                  <select 
                    defaultValue={mapping.priority}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </td>
                <td className="px-4 py-4">
                  <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition border border-blue-200">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact Settings */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-slate-900 mb-4">Contact & Communication</h3>
        
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-blue-600" />
              <h4 className="text-slate-900">Department Contact</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 mb-2">Official Email</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="email"
                    defaultValue="department@municipal.gov"
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-2">Phone Number</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="tel"
                    defaultValue="+91 98765 00001"
                    className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm"
                  />
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Rules */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
        <h3 className="text-slate-900 mb-4">Notification Rules</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="text-slate-900">New Issue Assigned</p>
              <p className="text-xs text-slate-600">Notify when new issue assigned to department</p>
            </div>
            <button
              onClick={() => setNotifyNewIssue(!notifyNewIssue)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                notifyNewIssue ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                notifyNewIssue ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="text-slate-900">Escalation Triggered</p>
              <p className="text-xs text-slate-600">Notify when issue escalated to supervisor</p>
            </div>
            <button
              onClick={() => setNotifyEscalation(!notifyEscalation)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                notifyEscalation ? 'bg-orange-600' : 'bg-slate-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                notifyEscalation ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="text-slate-900">SLA Breach</p>
              <p className="text-xs text-slate-600">Notify when resolution time exceeds SLA</p>
            </div>
            <button
              onClick={() => setNotifySLABreach(!notifySLABreach)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                notifySLABreach ? 'bg-red-600' : 'bg-slate-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                notifySLABreach ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>

      {/* System Note */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>System Integrity:</strong> These settings directly affect issue routing and authority notifications. Changes take effect immediately and apply to all new incoming issues.
        </p>
      </div>
    </div>
  );
}
