import React, { useState } from 'react';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Shield,
  CheckCircle,
  User,
  Clock,
  AlertTriangle,
  ZoomIn,
  ChevronDown
} from 'lucide-react';

// --- INJECTED STYLES (DOES NOT ALTER ORIGINAL CODE) ---
const css = `
  .p-6 { padding: 1.5rem; }
  .lg\\:p-8 { padding: 2rem; }
  .space-y-6 > * + * { margin-top: 1.5rem; }
  .space-y-4 > * + * { margin-top: 1rem; }
  .space-y-3 > * + * { margin-top: 0.75rem; }
  .grid { display: grid; gap: 1.5rem; }
  .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .items-start { align-items: flex-start; }
  .justify-between { justify-content: space-between; }
  .justify-center { justify-content: center; }
  .gap-2 { gap: 0.5rem; }
  .gap-3 { gap: 0.75rem; }
  .gap-4 { gap: 1rem; }
  .bg-white { background-color: #ffffff; }
  .bg-blue-50 { background-color: #eff6ff; }
  .bg-slate-50 { background-color: #f8fafc; }
  .bg-green-500 { background-color: #22c55e; }
  .bg-slate-300 { background-color: #cbd5e1; }
  .rounded-xl { border-radius: 0.75rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .rounded-full { border-radius: 9999px; }
  .border { border: 1px solid #e2e8f0; }
  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
  .text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .text-lg { font-size: 1.125rem; }
  .text-sm { font-size: 0.875rem; }
  .text-xs { font-size: 0.75rem; }
  .font-bold { font-weight: 700; }
  .font-semibold { font-weight: 600; }
  .font-medium { font-weight: 500; }
  .text-slate-900 { color: #0f172a; }
  .text-slate-700 { color: #334155; }
  .text-slate-600 { color: #475569; }
  .text-slate-500 { color: #64748b; }
  .text-blue-600 { color: #2563eb; }
  .text-white { color: #ffffff; }
  .w-full { width: 100%; }
  .h-96 { height: 24rem; }
  .w-10 { width: 2.5rem; }
  .h-10 { height: 2.5rem; }
  .w-0\\.5 { width: 0.125rem; }
  .h-12 { height: 3rem; }
  .object-cover { object-fit: cover; }
  .relative { position: relative; }
  .fixed { position: fixed; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .z-50 { z-index: 50; }
  .bg-black\\/90 { background-color: rgba(0,0,0,0.9); }
  .bg-black\\/40 { background-color: rgba(0,0,0,0.4); }
  .opacity-0 { opacity: 0; }
  .group:hover .opacity-100 { opacity: 1; }
  .transition { transition: all 0.2s; }
  .cursor-pointer { cursor: pointer; }
  @media (min-width: 1024px) { 
    .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .lg\\:col-span-2 { grid-column: span 2 / span 2; }
  }
  .bg-red-100 { background-color: #fee2e2; color: #b91c1c; }
  .bg-orange-100 { background-color: #ffedd5; color: #c2410c; }
  .bg-teal-600 { background-color: #0d9488; color: white; }
  .bg-orange-600 { background-color: #ea580c; color: white; }
  button { border: none; background: transparent; cursor: pointer; }
  select { appearance: none; border: 1px solid #cbd5e1; }
`;

export default function IssueDetail({ issue, onBack }) {
  const [selectedWorker, setSelectedWorker] = useState('');
  const [newStatus, setNewStatus] = useState(issue.status);
  const [showImageModal, setShowImageModal] = useState(false);

  const workers = [
    'Rajesh Kumar',
    'Priya Sharma',
    'Amit Patel',
    'Sunita Verma',
    'Mohammed Ali'
  ];

  const timeline = [
    {
      stage: 'Reported',
      date: 'Jan 5, 2026, 10:30 AM',
      note: 'Issue reported by citizen via mobile app',
      completed: true
    },
    {
      stage: 'AI Verified',
      date: 'Jan 5, 2026, 10:31 AM',
      note: 'Issue type and location verified by AI system',
      completed: true
    },
    {
      stage: 'Assigned',
      date: issue.assignedWorker ? 'Jan 5, 2026, 11:00 AM' : null,
      note: issue.assignedWorker ? `Assigned to ${issue.assignedWorker}` : 'Pending assignment',
      completed: !!issue.assignedWorker
    },
    {
      stage: 'In Progress',
      date: issue.status === 'In Progress' || issue.status === 'Resolved' ? 'Jan 5, 2026, 2:00 PM' : null,
      note: 'Field worker started work',
      completed: issue.status === 'In Progress' || issue.status === 'Resolved'
    },
    {
      stage: 'Resolved',
      date: issue.status === 'Resolved' ? 'Jan 6, 2026, 4:00 PM' : null,
      note: 'Issue resolved and verified',
      completed: issue.status === 'Resolved'
    }
  ];

  const handleAssignWorker = () => {
    console.log('Assigning to:', selectedWorker);
  };

  const handleChangeStatus = () => {
    console.log('Changing status to:', newStatus);
  };

  const handleEscalate = () => {
    console.log('Escalating issue');
  };

  return (
    <div className="p-6 lg:p-8">
      <style>{css}</style>
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Issue List</span>
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-slate-900 mb-2 font-bold text-2xl">Issue Detail</h1>
        <p className="text-slate-600">Review and take action on reported issue</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Summary */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-slate-900 mb-2 font-semibold text-lg">{issue.type}</h3>
                <p className="text-sm text-slate-600">Issue ID: {issue.id}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                issue.priority === 'Critical' ? 'bg-red-100 text-red-700 border border-red-300' :
                issue.priority === 'High' ? 'bg-orange-100 text-orange-700 border border-orange-300' :
                issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' :
                'bg-blue-100 text-blue-700 border border-blue-300'
              }`}>
                {issue.priority} Priority
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{issue.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>Reported on {issue.reportedDate}</span>
              </div>
            </div>
          </div>

          {/* Uploaded Image */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-900 mb-4 font-semibold">Uploaded Evidence</h3>
            <div 
              className="relative group cursor-pointer"
              onClick={() => setShowImageModal(true)}
            >
              <img 
                src="https://images.unsplash.com/photo-1625935222312-186b47d6f19e?w=800&q=80"
                alt="Issue evidence"
                className="w-full h-96 object-cover rounded-lg border border-slate-200"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-900">
                    <strong>AI Detected:</strong> {issue.type}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Confidence: 94% • Location verified via GPS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-900 mb-6 font-semibold">Issue Timeline</h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-green-500' : 'bg-slate-300'
                    }`}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`w-0.5 h-12 my-1 ${
                        item.completed ? 'bg-green-500' : 'bg-slate-300'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <p className="text-slate-900 font-medium mb-1">{item.stage}</p>
                    {item.date && (
                      <p className="text-sm text-slate-500 mb-1">{item.date}</p>
                    )}
                    <p className="text-sm text-slate-600">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Panel - Right Side */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-900 mb-4 font-semibold">Assign Worker</h3>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm text-slate-700 mb-2 font-medium">
                  Select Worker
                </label>
                <select 
                  value={selectedWorker}
                  onChange={(e) => setSelectedWorker(e.target.value)}
                  className="w-full px-4 py-2 pr-10 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">Choose worker...</option>
                  {workers.map(worker => (
                    <option key={worker} value={worker}>{worker}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 bottom-3 pointer-events-none" />
              </div>
              <button 
                onClick={handleAssignWorker}
                disabled={!selectedWorker}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
              >
                Assign to Worker
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-slate-900 mb-4 font-semibold">Change Status</h3>
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm text-slate-700 mb-2 font-medium">
                  New Status
                </label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 pr-10 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 bottom-3 pointer-events-none" />
              </div>
              <button 
                onClick={handleChangeStatus}
                className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
              >
                Update Status
              </button>
            </div>
          </div>

          {issue.slaStatus === 'Breached' && (
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="text-slate-900 font-semibold">SLA Breach</h3>
              </div>
              <p className="text-sm text-slate-700 mb-4">
                This issue has exceeded the SLA time limit and requires immediate attention.
              </p>
              <button 
                onClick={handleEscalate}
                className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
              >
                Escalate to Supervisor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setShowImageModal(false)}
        >
          <img 
            src="https://images.unsplash.com/photo-1625935222312-186b47d6f19e?w=1200&q=80"
            alt="Issue evidence full"
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}